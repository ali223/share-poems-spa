<template>
  <div class="home">
    <v-container class="my-5">
      <v-card
        class="text-xs-center ma-3 rounded d-flex justify-space-between flex-column"
      >
        <v-img
          class="white--text align-end"
          height="300px"
          :src="poem.imageUrl"
        >
          <v-card-title>
            <h1 class="text-h3">{{ poem.title }}</h1>
          </v-card-title>
        </v-img>
        <v-card-text>
          <div>Poet: {{ poem.poetName }}</div>
          <p class="poem-content mt-4 font-weight-medium">{{ poem.content }}</p>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapGetters(['getPoemById']),

    poem() {
      return this.getPoemById(this.id);
    }
  }
};
</script>
