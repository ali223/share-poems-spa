import Vue from 'vue';
import Vuex from 'vuex';
import poem from './modules/poem';
import auth from './modules/auth';

Vue.use(Vuex);

let nextNotificationId = 1;

export default new Vuex.Store({
  modules: {
    poem,
    auth
  },

  state: {
    loading: false,
    notifications: []
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
    }
  }
});
