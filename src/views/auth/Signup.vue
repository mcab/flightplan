<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Signup</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content padding>
      <form @submit.prevent="onSubmit">
        <ion-list>
          <ion-item>
            <ion-label position="stacked" color="primary">Username</ion-label>
            <ion-input
              :value="payload.username"
              name="username"
              type="text"
              spellcheck="false"
              autocapitalize="off"
              required
              @ionChange="payload.username = $event.target.value"
            ></ion-input>
          </ion-item>
          <ion-text
            v-if="submitted && $v.payload.username.$error"
            color="danger"
          >
            <p v-if="!$v.payload.username.required" padding-left>
              Username is required
            </p>
          </ion-text>

          <ion-item>
            <ion-label position="stacked" color="primary">Email</ion-label>
            <ion-input
              :value="payload.email"
              name="email"
              type="email"
              spellcheck="false"
              autocapitalize="off"
              required
              @ionChange="payload.email = $event.target.value"
            ></ion-input>
          </ion-item>
          <ion-text v-if="submitted && $v.payload.email.$error" color="danger">
            <p v-if="!$v.payload.email.required" padding-left>
              Email is required
            </p>
            <p v-if="!$v.payload.email.email" padding-left>Not a valid email</p>
          </ion-text>

          <ion-item>
            <ion-label position="stacked" color="primary">Password</ion-label>
            <ion-input
              :value="payload.password"
              name="password"
              type="password"
              required
              @ionChange="payload.password = $event.target.value"
            ></ion-input>
          </ion-item>
          <ion-text
            v-if="submitted && $v.payload.password.$error"
            color="danger"
          >
            <p v-if="!$v.payload.password.required" padding-left>
              Password is required
            </p>
            <p v-if="!$v.payload.password.minLength" padding-left>
              Password must be at least eight characters long
            </p>
          </ion-text>

          <ion-item>
            <ion-label position="stacked" color="primary"
              >Confirm Password</ion-label
            >
            <ion-input
              :value="payload.confirmPassword"
              name="confirmPassword"
              type="password"
              required
              @ionChange="payload.confirmPassword = $event.target.value"
            ></ion-input>
          </ion-item>
          <ion-text
            v-if="submitted && $v.payload.confirmPassword.$error"
            color="danger"
          >
            <p v-if="!$v.payload.confirmPassword.required" padding-left>
              Must confirm the password
            </p>
            <p v-if="!$v.payload.confirmPassword.sameAsPassword" padding-left>
              Passwords are not matching
            </p>
          </ion-text>
        </ion-list>

        <ion-text v-if="errors" color="danger">
          <p v-if="errors.status" padding-left>
            {{ errors.status }}: {{ errors.statusText }}
          </p>
          <template v-for="(error_array, error_key) in errors.data">
            <p v-for="(error, index) in error_array" :key="index" padding-left>
              {{ error_key }}: {{ error }}
            </p>
          </template>
        </ion-text>
        <div padding>
          <ion-button type="submit" expand="block">Sign up!</ion-button>
        </div>
      </form>
    </ion-content>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { sharedMixin } from "@/mixins/shared";

export default {
  mixins: [sharedMixin],
  data() {
    return {
      payload: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      submitted: false
    };
  },
  computed: {
    ...mapGetters(["errors", "toastInfo"])
  },
  validations: {
    payload: {
      username: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  mounted() {
    this.$store.dispatch("clearErrors");
  },
  methods: {
    onSubmit() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store.dispatch("clearErrors");
      this.$store.dispatch("signup", this.payload).finally(() => {
        this.toast(this.toastInfo);
        this.$store.dispatch("clearToast");
      });
    }
  }
};
</script>
