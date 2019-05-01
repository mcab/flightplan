<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Login</ion-title>
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
          <ion-button type="submit" expand="block">Login</ion-button>
        </div>
      </form>
    </ion-content>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { sharedMixin } from "@/mixins/shared";

export default {
  mixins: [sharedMixin],
  data() {
    return {
      payload: {
        username: "",
        password: ""
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
      password: {
        required
      }
    }
  },
  methods: {
    onSubmit() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store.dispatch("clearErrors");
      this.$store.dispatch("login", this.payload).finally(() => {
        this.toast(this.toastInfo);
        this.$store.dispatch("clearToast");
      });
    }
  }
};
</script>
