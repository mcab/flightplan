<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Physical Features</ion-title>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
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
        @click="goTo({ location: 'new-physical' })"
        >Add New Physical Features Survey</ion-button
      >
      <ion-card v-for="physical in physicals" :key="physical.id">
        <ion-card-header>
          <ion-card-subtitle>
            Installed:
            {{ physical.installed | toReadableDate() }}
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-list-header no-padding>House Attributes</ion-list-header>
            <ion-item>
              <ion-label>
                <h2 text-wrap>House size</h2>
                <h3>{{ physical.house_size }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Number of chambers in the bat house</h2>
                <h3>{{ physical.chambers }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Mounted on</h2>
                <h3>
                  {{ physical.mounted_on }}
                  <span v-if="physical.other_mounted_on"
                    >: {{ physical.other_mounted_on }}</span
                  >
                </h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Height above the ground (in feet)</h2>
                <h3>{{ physical.ground_height }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Direction bat house is facing</h2>
                <h3>{{ physical.direction }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Color of the bat house</h2>
                <h3>
                  {{ physical.color | trimRight() }}
                  <span v-if="physical.other_color"
                    >: {{ physical.other_color }}</span
                  >
                </h3>
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
      return d instanceof Date && !isNaN(d) ? d.toLocaleDateString() : value;
    },
    trimRight(value) {
      return typeof value === "string" ? value.trimEnd() : value;
    }
  },
  data() {
    return {
      house_id: this.$route.params.id
    };
  },
  computed: {
    ...mapGetters(["errors", "toastInfo", "physicals"])
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(event) {
      this.$store
        .dispatch("getPhysicalData", { id: this.house_id })
        .then(() => {
          if (event) {
            event.target.complete();
          }
        });
    },
    goTo({ location }) {
      switch (location) {
        case "new-physical":
          this.$router.push({
            name: "house-physical-create",
            params: { id: this.house_id }
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>
