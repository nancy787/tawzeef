export const state = () => ({
  profile: {},
})

export const mutations = {
  SET_PROFILE(state, payload) {
    state.profile = payload
  },
}
export const actions = {
  async setUserProfile({ commit }, payload) {
    try {
      let res

      if (this.$auth.user.type === 'COMPANY') {
        // if (payload) {
        res = await this.$axios.get(`/company/employee/${payload.employee}`)
        // }
      } else {
        res = await this.$axios.get(`/user/profile`)
      }
      const { data } = res.data
      commit('SET_PROFILE', data)
    } catch (error) {
      console.log(error)
    }
  },
}

export const getters = {
  getProfile(state) {
    return state.profile
  },
}
