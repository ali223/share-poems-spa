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
    </v-app-bar>
  </nav>
</template>

<style scoped>
span.site-title a {
  font-family: 'Courgette', cursive;
  font-size: 1.8em;
  color: white;
  text-decoration: none;
}
</style>
