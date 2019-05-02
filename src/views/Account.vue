<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Account</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div padding class="about-info">
        <p v-if="isAuthenticated">You're logged in!</p>
        <p v-if="$store.state.token">{{ $store.state.token }}</p>
      </div>
    </ion-content>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isAuthenticated", "toastInfo"])
  },
  methods: {
    navigate(url) {
      this.$router.push(url);
    },
  }
};
</script>
