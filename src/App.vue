<template>
  <v-app>
    <the-navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/TheNavbar';

export default {
  name: 'App',

  components: {
    TheNavbar
  },

  data: () => ({
    //
  })
};
</script>
