import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    poems: [],
    poem: {}
  },

  getters: {
    getPoemById: state => id => {
      return state.poems.find(poem => poem.id === id);
    }
  },

  mutations: {
    setPoems(state, poems) {
      state.poems = poems;
    },

    setPoem(state, poem) {
      state.poem = poem;
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
    },

    fetchPoem({ commit, getters, state }, id) {
      return new Promise((resolve, reject) => {
        if (id === state.poem.id) {
          return resolve(state.poem);
        }

        let poem = getters.getPoemById(id);

        if (poem) {
          commit('setPoem', poem);
          return resolve(poem);
        }

        axios
          .get(`${process.env.VUE_APP_BASE_API_URL}/poems/${id}`)
          .then(response => {
            let poem = response.data.data;
            commit('setPoem', poem);
            resolve(poem);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },

  modules: {}
});
