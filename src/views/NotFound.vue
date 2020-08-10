<template>
  <div class="not-found">
    <v-container class="my-5">
      <h1>Not Found</h1>
      <p>
        Oops we could not find that page. Try going
        <router-link :to="{ name: 'Home' }">
          home
        </router-link>
      </p>
    </v-container>
  </div>
</template>
