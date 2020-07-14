import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    poems: []
  },

  getters: {
    getPoemById: state => id => {
      return state.poems.find(poem => poem.id === id);
    }
  },

  mutations: {
    setPoems(state, poems) {
      state.poems = poems;
    }
  },

  actions: {
    fetchPoems({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_API_URL}/poems`)
          .then(response => {
            let poems = response.data.data;
            commit('setPoems', poems);
            resolve(poems);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },

  modules: {}
});
