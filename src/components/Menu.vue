<template>
  <ion-menu content-id="menu-content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>Navigate</ion-list-header>
        <ion-menu-toggle v-for="p in appPages" :key="p.title" auto-hide="false">
          <ion-item button @click="navigate(p.url)">
            <ion-icon slot="start" :name="p.icon"></ion-icon>
            <ion-label>{{ p.title }}</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
      <ion-list v-if="loggedIn">
        <ion-list-header>Account</ion-list-header>

        <ion-menu-toggle auto-hide="false">
          <ion-item button @click="navigate('/account')">
            <ion-icon slot="start" name="person"></ion-icon>
            <ion-label>Account</ion-label>
          </ion-item>
        </ion-menu-toggle>

        <ion-menu-toggle auto-hide="false">
          <ion-item button @click="logout()">
            <ion-icon slot="start" name="log-out"></ion-icon>
            <ion-label>Logout</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>

      <ion-list v-if="!loggedIn">
        <ion-list-header>Account</ion-list-header>

        <ion-menu-toggle auto-hide="false">
          <ion-item button @click="navigate('/login')">
            <ion-icon slot="start" name="log-in"></ion-icon>
            <ion-label>Login</ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle auto-hide="false">
          <ion-item button @click="navigate('/signup')">
            <ion-icon slot="start" name="person-add"></ion-icon>
            <ion-label>Signup</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
export default {
  data() {
    return {
      appPages: [
        {
          title: "Home",
          url: "/",
          name: "home",
          icon: "home"
        },
        {
          title: "About",
          url: "/about",
          icon: "information-circle"
        }
      ]
    };
  },
  computed: {
    loggedIn() {
      return !this.$store.state.user
        ? false
        : this.$store.state.user.isAuthenticated;
    }
  },
  methods: {
    navigate(url) {
      this.$router.push(url);
    }
  }
};
</script>
