<script setup lang="ts">
import { services } from '~/data/landing'

// The enquiry form, shared by the contact section and the contact modal.
const props = defineProps<{
  // Service id to pre-select, e.g. when opened from "Discuss this service"
  service?: string
}>()

const serviceOptions = [
  ...services.map(s => ({ label: s.name, value: s.id })),
  { label: 'Not sure yet', value: 'unsure' }
]

const emptyForm = { name: '', organisation: '', email: '', phone: '', service: '', message: '' }
const form = reactive({ ...emptyForm })
// Spam trap (Web3Forms "botcheck"): hidden from people, bots fill it in and Web3Forms drops the submission
const botcheck = ref(false)

watch(() => props.service, (id) => {
  if (id) form.service = id
}, { immediate: true })

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const errorMessage = ref('')

// Submissions go to Web3Forms, which emails them to the inbox the access key was created with (info@uniqtech.om).
// Web3Forms' free plan only accepts submissions from the browser, so this posts from here, not from a server route.
const { web3formsKey } = useRuntimeConfig().public

async function submit() {
  status.value = 'sending'
  errorMessage.value = ''
  const serviceName = serviceOptions.find(s => s.value === form.service)?.label || 'Not specified'
  try {
    const result = await $fetch<{ success: boolean, message?: string }>('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        access_key: web3formsKey,
        subject: `Website enquiry: ${serviceName} - ${form.name}`,
        from_name: 'UniqTech website',
        replyto: form.email, // "Reply" in the inbox goes to the person who sent the form
        botcheck: botcheck.value,
        'Name': form.name,
        'Organisation': form.organisation || '-',
        'Email': form.email,
        'Phone': form.phone || '-',
        'Service': serviceName,
        'Project details': form.message
      }
    })
    if (!result.success) throw new Error(result.message)
    status.value = 'sent'
    Object.assign(form, emptyForm)
  } catch {
    errorMessage.value = 'Your enquiry could not be sent. Check your connection and try again, or email us directly.'
    status.value = 'error'
  }
}
</script>

<template>
  <div
    v-if="status === 'sent'"
    class="py-10 text-center"
    role="status"
  >
    <UIcon
      name="i-lucide-circle-check"
      class="size-12 text-uq-500"
    />
    <h3 class="mt-4 heading-panel text-navy-900">
      Enquiry sent
    </h3>
    <p class="mt-2 text-navy-800/80">
      Thank you. We will reply within one working day.
    </p>
    <UButton
      class="mt-6 rounded-full"
      variant="outline"
      @click="status = 'idle'"
    >
      Send another enquiry
    </UButton>
  </div>

  <form
    v-else
    class="grid gap-5 sm:grid-cols-2"
    @submit.prevent="submit"
  >
    <UFormField
      label="Full name"
      name="name"
      required
    >
      <UInput
        v-model="form.name"
        autocomplete="name"
        required
        size="xl"
        class="w-full"
      />
    </UFormField>
    <UFormField
      label="Organisation"
      name="organisation"
    >
      <UInput
        v-model="form.organisation"
        autocomplete="organization"
        size="xl"
        class="w-full"
      />
    </UFormField>
    <UFormField
      label="Work email"
      name="email"
      required
    >
      <UInput
        v-model="form.email"
        type="email"
        autocomplete="email"
        required
        size="xl"
        class="w-full"
      />
    </UFormField>
    <UFormField
      label="Phone"
      name="phone"
      hint="Optional"
    >
      <UInput
        v-model="form.phone"
        type="tel"
        autocomplete="tel"
        size="xl"
        class="w-full"
      />
    </UFormField>
    <UFormField
      label="Service"
      name="service"
      class="sm:col-span-2"
    >
      <USelect
        v-model="form.service"
        :items="serviceOptions"
        placeholder="Choose a service"
        size="xl"
        class="w-full"
      />
    </UFormField>
    <UFormField
      label="Project details"
      name="message"
      required
      class="sm:col-span-2"
    >
      <UTextarea
        v-model="form.message"
        :rows="5"
        required
        size="xl"
        placeholder="Location, scale and timeline, if you know them"
        class="w-full"
      />
    </UFormField>

    <input
      v-model="botcheck"
      type="checkbox"
      name="botcheck"
      class="hidden"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    >

    <p
      v-if="status === 'error'"
      role="alert"
      class="text-sm text-error sm:col-span-2"
    >
      {{ errorMessage }}
    </p>

    <div class="sm:col-span-2">
      <UButton
        type="submit"
        size="xl"
        class="rounded-full"
        :loading="status === 'sending'"
      >
        Send enquiry
      </UButton>
    </div>
  </form>
</template>
