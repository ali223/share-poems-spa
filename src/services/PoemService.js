import ApiClient from './ApiClient';

export default {
  getPoems() {
    return ApiClient.get('/poems');
  },

  getPoem(id) {
    return ApiClient.get(`/poems/${id}`);
  }
};
