import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let nextNotificationId = 1;

export default new Vuex.Store({
  state: {
    poems: [],
    poem: {},
    loading: false,
    notifications: []
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
    },

    setLoading(state, loading) {
      state.loading = loading;
    },

    addNotification(state, notification) {
      state.notifications.push({
        ...notification,
        id: nextNotificationId++
      });
    },

    removeNotification(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationToRemove.id
      );
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
    },

    registerUser(context, user) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_API_URL}/user-registrations`, user)
          .then(response => {
            let user = response.data.data;
            resolve(user);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },

  modules: {}
});
