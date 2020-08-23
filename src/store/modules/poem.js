import PoemService from '@/services/PoemService';

export default {
  namespaced: true,

  state: () => ({
    poems: [],
    poem: {}
  }),

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
        commit('loading/setLoading', true, { root: true });
        PoemService.getPoems()
          .then(response => {
            let poems = response.data.data;
            commit('setPoems', poems);
            commit('loading/setLoading', false, { root: true });
            resolve(poems);
          })
          .catch(error => {
            commit('loading/setLoading', false, { root: true });
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

        commit('loading/setLoading', true, { root: true });

        PoemService.getPoem(id)
          .then(response => {
            let poem = response.data.data;
            commit('setPoem', poem);
            commit('loading/setLoading', false, { root: true });
            resolve(poem);
          })
          .catch(error => {
            commit('loading/setLoading', false, { root: true });
            reject(error);
          });
      });
    }
  }
};
