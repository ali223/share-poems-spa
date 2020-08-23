import axios from 'axios';
import AuthService from '@/services/AuthService';

export default {
  namespaced: true,

  state: () => ({
    authUser: null,
    authUserProfile: null
  }),

  getters: {
    isUserLoggedIn: state => {
      return !!state.authUser;
    }
  },

  mutations: {
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
        commit('setLoading', true, { root: true });
        AuthService.getMyProfile()
          .then(response => {
            let userProfile = response.data.data;
            commit('setAuthUserProfile', userProfile);
            commit('setLoading', false, { root: true });
            resolve(userProfile);
          })
          .catch(error => {
            commit('setLoading', false, { root: true });
            reject(error);
          });
      });
    },

    registerUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true, { root: true });
        AuthService.registerUser(user)
          .then(response => {
            let user = response.data.user;
            commit('setAuthUser', user);
            commit('setLoading', false, { root: true });
            commit(
              'notification/addNotification',
              {
                message: 'User account created and logged in!',
                color: 'success'
              },
              { root: true }
            );
            resolve(user);
          })
          .catch(error => {
            commit('setLoading', false, { root: true });
            reject(error);
          });
      });
    },

    loginUser({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true, { root: true });
        AuthService.loginUser(credentials)
          .then(response => {
            let user = response.data.user;
            commit('setAuthUser', user);
            commit('setLoading', false, { root: true });
            commit(
              'notification/addNotification',
              {
                message: 'You have logged in!',
                color: 'success'
              },
              { root: true }
            );
            resolve(user);
          })
          .catch(error => {
            commit('setLoading', false, { root: true });
            reject(error);
          });
      });
    },

    logoutUser({ commit }) {
      return new Promise(resolve => {
        commit('removeAuthUser');
        commit(
          'notification/addNotification',
          {
            message: 'You have logged out!',
            color: 'success'
          },
          { root: true }
        );
        resolve();
      });
    }
  }
};
