export default ({
  namespaced: true,
  state: {
      user: null
  },
  getters: {
      getUser: state => {
          return state.user;
      }
  },
  mutations: {
      SET_USER(state, payload){
          state.user = payload;
          localStorage.setItem('user', JSON.stringify(state.user))
      }
  },
})
