const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  SET_BAR_IMAGE(state, payload) {
    state.barImage = payload
  },
  SET_DRAWER(state, payload) {
    state.drawer = payload
  },
  SET_RIGHT_DRAWER(state, payload) {
    state.rightDrawer = payload
  },
  SET_CLIPPED(state, payload) {
    state.clipped = payload
  },
  SET_MINI_VARIANT(state, payload) {
    state.miniVariant = payload
  },
  SET_SCRIM(state, payload) {
    state.barColor = payload
  },
  SET_ACTIVE(state, payload) {
    state.activeColor = payload
  },
  SET_DARKER(state, payload) {
    state.darker = payload
  },
  SET_RTL(state, payload) {
    state.rtl = payload
  },
  SHOW_HIDE_SNACKBAR(state, payload) {
    state.showSnack = payload
  },
  SET_SNACKBAR(state, payload) {
    state.snackBar = {
      color: payload.color || 'error',
      title: payload.title || '¡Error!',
      message:
        payload.message ||
        'Algo salió mal, estamos trabajando para resolver el inconveniente.',
      icon: payload.icon || 'mdi-bell-plus',
      position: payload.position || 'bottom',
    }
  },
  UNSET_SNACKBAR(state) {
    state.snackBar = {
      color: 'error',
      title: '¡Error!',
      message:
        'Algo salió mal, estamos trabajando para resolver el inconveniente.',
      icon: 'mdi-bell-plus',
      position: 'bottom',
    }
  },
}

export default mutations
