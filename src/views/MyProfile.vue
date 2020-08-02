<template>
  <div class="home">
    <v-container class="my-5">
      <v-card
        class="text-xs-center ma-3 rounded mx-auto"
        max-width="450"
        v-if="authUserProfile"
      >
        <v-card-title>
          <h1 class="text-h4">My Profile</h1>
        </v-card-title>
        <v-card-text>
          <p class="text-subtitle-1">Name: {{ authUserProfile.name }}</p>
          <p class="text-subtitle-1">Email: {{ authUserProfile.email }}</p>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['authUserProfile'])
  },

  created() {
    this.setLoading(true);

    this.fetchAuthUserProfile()
      .then(() => {
        this.setLoading(false);
      })
      .catch(() => {
        this.setLoading(false);
      });
  },

  methods: {
    ...mapActions(['fetchAuthUserProfile']),
    ...mapMutations(['setLoading'])
  }
};
</script>
