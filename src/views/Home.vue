<template>
  <div class="home">
    <v-container class="my-5">
      <poems-list :poems="poems" />
    </v-container>
  </div>
</template>

<script>
import PoemsList from '@/components/PoemsList';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    PoemsList
  },

  created() {
    this.fetchPoems();
  },

  computed: {
    ...mapState('poem', ['poems'])
  },

  methods: {
    ...mapActions('poem', ['fetchPoems'])
  }
};
</script>
