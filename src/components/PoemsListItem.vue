<template>
  <v-card
    class="text-xs-center ma-3 rounded d-flex justify-space-between flex-column"
    min-height="300"
  >
    <v-img class="white--text align-end" height="200px" :src="poem.imageUrl">
      <v-card-title>{{ poem.title }}</v-card-title>
    </v-img>
    <v-card-text>
      <div>{{ poem.poetName }}</div>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn
        block
        dark
        outlined
        class="light-blue"
        :to="{
          name: 'PoemShow',
          params: { id: poem.id }
        }"
      >
        <v-icon left>read_more</v-icon>
        <span>Read</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    poem: {
      type: Object,
      required: true
    }
  }
};
</script>
