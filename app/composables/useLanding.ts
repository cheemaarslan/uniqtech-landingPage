import { services } from '~/data/landing'

// The service selected in the services panel (shared with the hero quick links).
export const useActiveService = () => useState<string>('active-service', () => services[0]!.id)

// The contact modal. Every "Request a consultation", "Discuss this service" and similar button
// opens it; passing a service id pre-selects that service in the form.
export function useContactModal() {
  const open = useState('contact-modal-open', () => false)
  const service = useState('contact-modal-service', () => '')

  function openContact(serviceId = '') {
    service.value = serviceId
    open.value = true
  }

  return { open, service, openContact }
}

export function goToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' })
}
