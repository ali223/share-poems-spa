<template>
  <v-app>
    <the-navbar />
    <the-notifications />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/TheNavbar';
import TheNotifications from '@/components/TheNotifications';
import axios from 'axios';

export default {
  name: 'App',

  components: {
    TheNavbar,
    TheNotifications
  },

  created() {
    const authUserString = localStorage.getItem('authUser');

    if (authUserString) {
      const authUser = JSON.parse(authUserString);
      this.$store.commit('setAuthUser', authUser);
    }

    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logoutUser').then(() => {
            if (this.$router.currentRoute.name !== 'UserLogin') {
              this.$router.push({ name: 'UserLogin' });
            }
          });
        }
        return Promise.reject(error);
      }
    );
  }
};
</script>
