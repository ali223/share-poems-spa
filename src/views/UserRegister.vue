<template>
  <div class="user-register">
    <v-container class="my-5">
      <v-row>
        <v-col cols="6" offset="3">
          <v-card class="ma-3 rounded d-flex justify-space-between flex-column">
            <v-card-title class="text-center">
              <h1 class="text-h4">User Registration</h1>
            </v-card-title>

            <v-card-text>
              <ValidationObserver ref="observer">
                <v-form class="px-5" ref="form" @submit.prevent="register">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Name"
                    rules="required|min:5"
                    vid="name"
                  >
                    <v-text-field
                      v-model="user.name"
                      label="Name"
                      prepend-icon="person"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                    vid="email"
                  >
                    <v-text-field
                      v-model="user.email"
                      label="Email"
                      prepend-icon="email"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Password"
                    rules="required|min:8|confirmed:passwordConfirmation"
                    vid="password"
                  >
                    <v-text-field
                      v-model="user.password"
                      type="password"
                      label="Password"
                      prepend-icon="vpn_key"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Password confirmation"
                    rules="required|min:8"
                    vid="passwordConfirmation"
                  >
                    <v-text-field
                      v-model="user.passwordConfirmation"
                      type="password"
                      label="Confirm Password"
                      prepend-icon="vpn_key"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>

                  <v-spacer></v-spacer>

                  <v-btn
                    text
                    class="success mx-0 mt-3"
                    :loading="loading"
                    type="submit"
                  >
                    Register
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
import { required, min, email, confirmed } from 'vee-validate/dist/rules';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
});

extend('email', {
  ...email,
  message: 'Email must be valid'
});

extend('min', {
  ...min,
  message: '{_field_} must have at least {length} characters'
});

extend('confirmed', {
  ...confirmed,
  message: '{_field_} and confirmed {_field_} must match'
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },

  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    };
  },

  computed: {
    ...mapState('loading', ['loading'])
  },

  methods: {
    ...mapActions('auth', ['registerUser']),

    register() {
      this.$refs.observer.validate().then(result => {
        if (!result) {
          return;
        }

        this.registerUser(this.user)
          .then(() => {
            this.$router.push({ name: 'Home' });
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
