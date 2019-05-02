<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Bat Houses</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="getData($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-button
        expand="full"
        color="tertiary"
        style="margin: 0"
        @click="goTo({ location: 'new-house' })"
        >Add New Bat House</ion-button
      >
      <ion-card v-for="house in houses" :key="house.id">
        <ion-card-header>
          <ion-card-title>Bat House #{{ house.id }}</ion-card-title>
          <ion-card-subtitle
            >Created: {{ house.created | toReadableDate() }}</ion-card-subtitle
          >
          <ion-card-subtitle>Watcher: {{ house.watcher }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-button
                expand="block"
                fill="outline"
                @click="goTo({ location: 'environmental', id: house.id })"
                >Environmental Features</ion-button
              >
            </ion-row>
            <ion-row>
              <ion-button
                expand="block"
                fill="outline"
                @click="goTo({ location: 'physical', id: house.id })"
                >Physical Features</ion-button
              >
            </ion-row>
            <ion-row>
              <ion-button
                expand="block"
                fill="outline"
                @click="goTo({ location: 'observation', id: house.id })"
                >Observation Data</ion-button
              >
            </ion-row>
          </ion-grid>
          <ion-list>
            <ion-list-header no-padding>Location</ion-list-header>
            <ion-item>
              <ion-label>
                <h2>Longitude</h2>
                <h3>{{ house.location.longitude }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2>Latitude</h2>
                <h3>{{ house.location.latitude }}</h3>
              </ion-label>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header no-padding>Physical Information</ion-list-header>
            <ion-item>
              <ion-label>
                <h2>Property Type</h2>
                <h3>{{ house.property_type }}</h3>
              </ion-label>
            </ion-item>
            <ion-item v-if="house.other_property_type">
              <ion-label>
                <h2>Other Property Type</h2>
                <h3>{{ house.other_property_type }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2>Town Name</h2>
                <h3>{{ house.town_name }}</h3>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  filters: {
    toReadableDate(value) {
      const d = new Date(value);
      return d instanceof Date && !isNaN(d) ? d.toLocaleString() : value;
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["errors", "toastInfo", "houses"])
  },
  mounted() {
    if (this.houses.length === 0) {
      this.getData();
    }
  },
  methods: {
    getData(event) {
      this.$store.dispatch("getHouseData").then(() => {
        if (event) {
          event.target.complete();
        }
      });
    },
    goTo({ location, id }) {
      switch (location) {
        case "environmental":
          this.$router.push({ name: "house-environment-list", params: { id } });
          break;
        case "physical":
          this.$router.push({ name: "house-physical-list", params: { id } });
          break;
        case "observation":
          this.$router.push({ name: "house-observation-list", params: { id } });
          break;
        case "new-house":
          this.$router.push({ name: "house-create" });
          break;
        default:
          break;
      }
    }
  }
};
</script>
