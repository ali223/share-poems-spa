import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import PoemService from '@/services/PoemService';
import AuthService from '@/services/AuthService';

Vue.use(Vuex);

let nextNotificationId = 1;

export default new Vuex.Store({
  state: {
    poems: [],
    poem: {},
    loading: false,
    notifications: [],
    authUser: null,
    authUserProfile: null
  },

  getters: {
    getPoemById: state => id => {
      return state.poems.find(poem => poem.id === id);
    },

    isUserLoggedIn: state => {
      return !!state.authUser;
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
    },

    setAuthUser(state, user) {
      localStorage.setItem('authUser', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      state.authUser = user;
    },

    removeAuthUser(state) {
      localStorage.removeItem('authUser');
      axios.defaults.headers.common['Authorization'] = '';
      state.authUser = null;
    },

    setAuthUserProfile(state, authUserProfile) {
      state.authUserProfile = authUserProfile;
    }
  },

  actions: {
    fetchPoems({ commit }) {
      return new Promise((resolve, reject) => {
        PoemService.getPoems()
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

        PoemService.getPoem(id)
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

    fetchAuthUserProfile({ commit }) {
      return new Promise((resolve, reject) => {
        AuthService.getMyProfile()
          .then(response => {
            let userProfile = response.data.data;
            commit('setAuthUserProfile', userProfile);
            resolve(userProfile);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    registerUser(context, user) {
      return new Promise((resolve, reject) => {
        AuthService.registerUser(user)
          .then(response => {
            let user = response.data.data;
            resolve(user);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    loginUser({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        AuthService.loginUser(credentials)
          .then(response => {
            let user = response.data.user;
            commit('setAuthUser', user);
            resolve(user);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    logoutUser({ commit }) {
      return new Promise(resolve => {
        commit('removeAuthUser');
        resolve();
      });
    }
  }
});
