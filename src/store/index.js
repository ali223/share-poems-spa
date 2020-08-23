import Vue from 'vue';
import Vuex from 'vuex';
import poem from './modules/poem';
import auth from './modules/auth';
import notification from './modules/notification';
import loading from './modules/loading';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    poem,
    auth,
    notification,
    loading
  }
});
