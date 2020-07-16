<template>
  <nav>
    <v-app-bar flat color="teal darken-4" dark app>
      <v-toolbar-title>
        <span class="site-title">
          <router-link :to="{ name: 'Home' }">
            Share Poems
          </router-link>
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text :to="{ name: 'UserRegister' }">
        Register
      </v-btn>

      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="yellow accent-4"
      ></v-progress-linear>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['loading'])
  }
};
</script>

<style scoped>
span.site-title a {
  font-family: 'Courgette', cursive;
  font-size: 1.8em;
  color: white;
  text-decoration: none;
}
</style>
