<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" lg="3" v-for="poem in poems" :key="poem.id">
      <poems-list-item :poem="poem" />
    </v-col>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="96"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import PoemsListItem from './PoemsListItem';

export default {
  components: {
    PoemsListItem
  },

  data() {
    return {
      overlay: false
    };
  },

  created() {
    this.overlay = true;

    this.$store.dispatch('fetchPoems').then(() => {
      this.overlay = false;
    });
  },

  computed: {
    ...mapState(['poems'])
  }
};
</script>
