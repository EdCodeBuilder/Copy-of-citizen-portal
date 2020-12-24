const actions = {
  setBarImage: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_BAR_IMAGE', payload)
      resolve()
    })
  },
  toggleClipped: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_CLIPPED', payload)
      resolve()
    })
  },
  toggleMiniVariant: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_MINI_VARIANT', payload)
      resolve()
    })
  },
  toggleDrawer: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_DRAWER', payload)
      resolve()
    })
  },
  toggleRTL: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_RTL', payload)
      resolve()
    })
  },
  toggleRightDrawer: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_RIGHT_DRAWER', payload)
      resolve()
    })
  },
  toggleDarker: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_DARKER', payload)
      commit('SET_SCRIM', 'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)')
      resolve()
    })
  },
  setBarColor: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_SCRIM', payload)
      resolve()
    })
  },
  setActiveColor: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_ACTIVE', payload)
      resolve()
    })
  },
  setLocale: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_LANG', payload)
      resolve()
    })
  },
  toggleSnackBar: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SHOW_HIDE_SNACKBAR', payload)
      resolve()
    })
  },
  setSnackBar: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_SNACKBAR', payload)
      resolve()
    })
  },
  unsetSnackBar: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('UNSET_SNACKBAR')
      resolve()
    })
  },
}

export default actions
