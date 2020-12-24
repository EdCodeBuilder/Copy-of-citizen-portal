export default ({ app }) => {
  const redirect = app.$auth.$storage.options.redirect
  for (const key in redirect) {
    redirect[key] = '/' + app.i18n.locale + redirect[key]
  }
  app.$auth.$storage.options.redirect = redirect
}
