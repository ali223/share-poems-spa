let nextNotificationId = 1;

export default {
  namespaced: true,

  state: () => ({
    notifications: []
  }),

  mutations: {
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
};
