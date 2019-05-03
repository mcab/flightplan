<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Observations</ion-title>
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
        @click="goTo({ location: 'new-observation' })"
        >Add A New Observation</ion-button
      >
      <ion-card v-for="observation in observations" :key="observation.id">
        <ion-card-header>
          <ion-card-subtitle>
            Checked:
            {{ observation.checked | toReadableDate() }}
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-list-header no-padding>Notes</ion-list-header>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Are bats present?</h2>
                <h3>{{ observation.present | booleanInterpretor() }}</h3>
              </ion-label>
            </ion-item>
            <ion-item v-if="observation.present">
              <ion-label>
                <h2 text-wrap>How many bats?</h2>
                <h3>{{ observation.occupants }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>
                  Have you gone through acoustic monitoring already?
                </h2>
                <h3>
                  {{ observation.acoustic_monitor }}
                </h3>
              </ion-label>
            </ion-item>
            <ion-item v-if="observation.notes">
              <ion-label>
                <h2 text-wrap>Additional notes</h2>
                <p text-wrap>{{ observation.notes }}</p>
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
    booleanInterpretor(value) {
      return typeof value === "boolean" ? "Yes" : "No";
    }
  },
  data() {
    return {
      house_id: this.$route.params.id
    };
  },
  computed: {
    ...mapGetters(["errors", "toastInfo", "observations"])
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(event) {
      this.$store
        .dispatch("getObservationData", { id: this.house_id })
        .then(() => {
          if (event) {
            event.target.complete();
          }
        });
    },
    goTo({ location }) {
      switch (location) {
        case "new-observation":
          this.$router.push({
            name: "house-observation-create",
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
