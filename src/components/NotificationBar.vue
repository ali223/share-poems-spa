<template>
  <v-snackbar
    app
    top
    v-model="snackbar"
    :timeout="timeout"
    :color="notification.color"
  >
    {{ notification.message }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      timeout: 6000,
      snackbar: true
    };
  },

  created() {
    setTimeout(() => this.removeNotification(this.notification), this.timeout);
  },

  methods: {
    ...mapMutations('notification', ['removeNotification'])
  }
};
</script>
