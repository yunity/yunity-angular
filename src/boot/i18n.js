import i18n from '@/base/i18n'

export default ({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
}

export { i18n }
