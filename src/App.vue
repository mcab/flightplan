<template>
  <ion-app id="app">
    <ion-split-pane>
      <Menu />
      <ion-vue-router id="menu-content" main :animated="false" />
    </ion-split-pane>
  </ion-app>
</template>

<script>
import { sharedMixin } from "@/mixins/shared";
import { mapGetters } from "vuex";
import Menu from "@/components/Menu.vue";

export default {
  components: {
    Menu
  },
  mixins: [sharedMixin],
  computed: {
    ...mapGetters(["toastInfo"])
  },
  created() {
    this.$store.dispatch("autoLogin").finally(() => {
      if (this.toastInfo.message) {
        this.toast(this.toastInfo);
        this.$store.dispatch("clearToast");
      }
    });
  }
};
</script>
