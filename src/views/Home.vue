<template>
  <div class="home">
    <v-container class="my-5">
      <poems-list />
    </v-container>
  </div>
</template>

<script>
import PoemsList from '@/components/PoemsList';

export default {
  components: {
    PoemsList
  }
};
</script>
