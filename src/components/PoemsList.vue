<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" lg="3" v-for="poem in poems" :key="poem.id">
      <poems-list-item :poem="poem" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PoemsListItem from './PoemsListItem';

export default {
  components: {
    PoemsListItem
  },

  computed: {
    ...mapState(['poems'])
  },

  created() {
    this.fetchPoems();
  },

  methods: {
    ...mapActions(['fetchPoems'])
  }
};
</script>
