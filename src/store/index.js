import Vue from 'vue';
import Vuex from 'vuex';
import poem from './modules/poem';
import auth from './modules/auth';
import notification from './modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    poem,
    auth,
    notification
  },

  state: {
    loading: false
  },

  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    }
  }
});
