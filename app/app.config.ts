export default defineAppConfig({
  ui: {
    colors: {
      // "uq" is the UniqTech teal scale defined in assets/css/main.css
      primary: 'uq',
      neutral: 'slate'
    },
    button: {
      slots: {
        base: 'font-semibold transition-colors duration-200'
      }
    }
  }
})
