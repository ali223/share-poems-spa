import axios from 'axios';

export default {
  getMyProfile() {
    return axios.get('/my-profile');
  },

  registerUser(user) {
    return axios.post('/user-registrations', user);
  },

  loginUser(credentials) {
    return axios.post('/auth/login', credentials);
  }
};
