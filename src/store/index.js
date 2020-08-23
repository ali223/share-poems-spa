import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import AuthService from '@/services/AuthService';
import poem from './modules/poem';

Vue.use(Vuex);

let nextNotificationId = 1;

export default new Vuex.Store({
  modules: {
    poem
  },

  state: {
    loading: false,
    notifications: [],
    authUser: null,
    authUserProfile: null
  },

  getters: {
    isUserLoggedIn: state => {
      return !!state.authUser;
    }
  },

  mutations: {
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
    fetchAuthUserProfile({ commit }) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true);
        AuthService.getMyProfile()
          .then(response => {
            let userProfile = response.data.data;
            commit('setAuthUserProfile', userProfile);
            commit('setLoading', false);
            resolve(userProfile);
          })
          .catch(error => {
            commit('setLoading', false);
            reject(error);
          });
      });
    },

    registerUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true);
        AuthService.registerUser(user)
          .then(response => {
            let user = response.data.user;
            commit('setAuthUser', user);
            commit('setLoading', false);
            commit('addNotification', {
              message: 'User account created and logged in!',
              color: 'success'
            });
            resolve(user);
          })
          .catch(error => {
            commit('setLoading', false);
            reject(error);
          });
      });
    },

    loginUser({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true);
        AuthService.loginUser(credentials)
          .then(response => {
            let user = response.data.user;
            commit('setAuthUser', user);
            commit('setLoading', false);
            commit('addNotification', {
              message: 'You have logged in!',
              color: 'success'
            });
            resolve(user);
          })
          .catch(error => {
            commit('setLoading', false);
            reject(error);
          });
      });
    },

    logoutUser({ commit }) {
      return new Promise(resolve => {
        commit('removeAuthUser');
        commit('addNotification', {
          message: 'You have logged out!',
          color: 'success'
        });
        resolve();
      });
    }
  }
});
