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

      <template v-if="isUserLoggedIn">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-on="on" v-bind="attrs">
              <v-icon left>person</v-icon>
              <span>{{ authUser.name }}</span>
            </v-btn>
          </template>
          <v-list flat>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title @click="logout">Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-else>
        <v-btn text :to="{ name: 'UserRegister' }">
          Register
        </v-btn>

        <v-btn text :to="{ name: 'UserLogin' }">
          Login
        </v-btn>
      </template>

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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['loading', 'authUser']),
    ...mapGetters(['isUserLoggedIn'])
  },

  methods: {
    ...mapActions(['logoutUser']),
    ...mapMutations(['addNotification']),

    logout() {
      this.logoutUser().then(() => {
        if (this.$router.currentRoute.name !== 'Home') {
          this.$router.push({ name: 'Home' });
        }

        this.addNotification({
          message: 'You have logged out!',
          color: 'success'
        });
      });
    }
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
