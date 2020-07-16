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

export default {
  name: 'App',

  components: {
    TheNavbar,
    TheNotifications
  },

  data: () => ({
    //
  })
};
</script>
