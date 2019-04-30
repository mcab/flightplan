<template>
  <ion-app id="app">
    <ion-split-pane>
      <Menu />
      <ion-vue-router id="menu-content" main :animated="false" />
    </ion-split-pane>
  </ion-app>
</template>

<script>
import Menu from "./components/Menu.vue";

export default {
  components: {
    Menu
  }
};
</script>
