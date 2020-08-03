import axios from 'axios';

export default {
  getPoems() {
    return axios.get('/poems');
  },

  getPoem(id) {
    return axios.get(`/poems/${id}`);
  }
};
