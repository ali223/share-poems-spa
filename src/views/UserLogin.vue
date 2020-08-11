<template>
  <div class="user-login">
    <v-container class="my-5">
      <v-row>
        <v-col cols="6" offset="3">
          <v-card class="ma-3 rounded d-flex justify-space-between flex-column">
            <v-card-title class="text-center">
              <h1 class="text-h4">User Login</h1>
            </v-card-title>

            <v-card-text>
              <ValidationObserver ref="observer">
                <v-form class="px-5" ref="form">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                    vid="email"
                  >
                    <v-text-field
                      v-model="credentials.email"
                      label="Email"
                      prepend-icon="email"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Password"
                    rules="required"
                    vid="password"
                  >
                    <v-text-field
                      v-model="credentials.password"
                      type="password"
                      label="Password"
                      prepend-icon="vpn_key"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>

                  <v-spacer></v-spacer>

                  <v-btn
                    text
                    class="success mx-0 mt-3"
                    @click="login"
                    :loading="loading"
                  >
                    Login
                  </v-btn>
                </v-form>
              </ValidationObserver>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
});

extend('email', {
  ...email,
  message: 'Email must be valid'
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },

  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    };
  },

  computed: {
    ...mapState(['loading'])
  },

  methods: {
    ...mapActions(['loginUser']),

    login() {
      this.$refs.observer.validate().then(result => {
        if (!result) {
          return;
        }

        this.loginUser(this.credentials)
          .then(() => {
            const redirectPath = this.$route.query.redirect || '/';
            this.$router.push(redirectPath);
          })
          .catch(error => {
            if (error.response && error.response.data) {
              this.$refs.observer.setErrors(error.response.data);
            }
          });
      });
    }
  }
};
</script>
