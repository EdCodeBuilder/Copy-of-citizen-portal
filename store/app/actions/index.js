const actions = {
  setBarImage: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_BAR_IMAGE', payload)
      resolve()
    })
  },
  toggleDrawer: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_DRAWER', payload)
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
  serBarColor: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_SCRIM', payload)
      resolve()
    })
  },
  serActiveColor: ({ commit }, payload) => {
    return new Promise((resolve) => {
      commit('SET_ACTIVE', payload)
      resolve()
    })
  },
}

export default actions
