const mutations = {
  SET_BAR_IMAGE(state, payload) {
    state.barImage = payload
  },
  SET_DRAWER(state, payload) {
    state.drawer = payload
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
}

export default mutations
