import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    poems: []
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
          .get('http://share-poems-api.test/poems')
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
