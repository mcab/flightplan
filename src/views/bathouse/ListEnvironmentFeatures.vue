<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Environment Features</ion-title>
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
        @click="goTo({ location: 'new-environment' })"
        >Add New Environmental Survey</ion-button
      >
      <ion-card v-for="environment in environments" :key="environment.id">
        <ion-card-header>
          <ion-card-subtitle>
            Performed:
            {{ environment.surveyed | toReadableDate() }}
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-list-header no-padding>Surrounding Features</ion-list-header>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Habitat type</h2>
                <h3 v-for="habitat in environment.habitat_type" :key="habitat">
                  {{ habitat }}
                </h3>
              </ion-label>
            </ion-item>
            <ion-item v-if="environment.other_habitat_type">
              <ion-label>
                <h2 text-wrap>Other habitat type</h2>
                <h3>{{ environment.other_habitat_type }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Habitat degradation</h2>
                <h3
                  v-for="degradation in environment.habitat_degradation"
                  :key="degradation"
                >
                  {{ degradation }}
                </h3>
              </ion-label>
            </ion-item>
            <ion-item v-if="environment.other_habitat_degradation">
              <ion-label>
                <h2 text-wrap>Other form(s) of habitat degradation</h2>
                <h3>{{ environment.other_habitat_degradation }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Man-made structures</h2>
                <h3
                  v-for="structure in environment.man_made_structure"
                  :key="structure"
                >
                  {{ structure }}
                </h3>
              </ion-label>
            </ion-item>
            <ion-item v-if="environment.other_man_made_structure">
              <ion-label>
                <h2 text-wrap>Other man-made structure(s)</h2>
                <h3>{{ environment.other_man_made_structure }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Nearby geography</h2>
                <h3
                  v-for="geography in environment.nearby_geography"
                  :key="geography"
                >
                  {{ geography }}
                </h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Slope</h2>
                <h3>{{ environment.slope }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Surrounding tree types</h2>
                <h3>{{ environment.tree_type }}</h3>
              </ion-label>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header no-padding>Noise information</ion-list-header>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Amount of day noise</h2>
                <h3>{{ environment.day_noise }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Amount of night noise</h2>
                <h3>{{ environment.night_noise }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Possible noise disturbance(s) from</h2>
                <h3
                  v-for="disturbance in environment.noise_disturbance"
                  :key="disturbance"
                >
                  {{ disturbance }}
                </h3>
              </ion-label>
            </ion-item>
            <ion-item v-if="environment.other_noise_disturbance">
              <ion-label>
                <h2 text-wrap>Other noise disturbance(s)</h2>
                <h3>{{ environment.other_noise_disturbance }}</h3>
              </ion-label>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header no-padding>Light information</ion-list-header>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Amount of light pollution at night</h2>
                <h3>{{ environment.night_light_pollution_amount }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Consistency of light pollution at night</h2>
                <h3>{{ environment.night_light_pollution_consistency }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Hours of morning sunlight received</h2>
                <h3>{{ environment.night_light_pollution_consistency }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Hours of afternoon sunlight received</h2>
                <h3>{{ environment.night_light_pollution_consistency }}</h3>
              </ion-label>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header no-padding
              >Surrounding water information</ion-list-header
            >
            <ion-item>
              <ion-label>
                <h2 text-wrap>Nearest water resource to the bat house</h2>
                <h3>{{ environment.nearest_water_resources }}</h3>
              </ion-label>
            </ion-item>
            <ion-item v-if="environment.nearest_water_resources">
              <ion-label>
                <h2 text-wrap>Other water resource</h2>
                <h3>{{ environment.other_nearest_water_resource }}</h3>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <h2 text-wrap>Distance to the nearest water resource</h2>
                <h3>
                  {{ environment.water_resource_distance }}
                  {{ environment.water_resource_units }}
                </h3>
              </ion-label>
            </ion-item>
          </ion-list>
          <ion-list>
            <ion-list-header no-padding
              >Other additional features</ion-list-header
            >
            <ion-item v-if="environment.other_features">
              <ion-label>
                <h2 text-wrap>Other information and notes</h2>
                <p text-wrap>{{ environment.other_features }}</p>
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
    return {
      house_id: this.$route.params.id
    };
  },
  computed: {
    ...mapGetters(["errors", "toastInfo", "environments"])
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(event) {
      this.$store
        .dispatch("getEnvironmentData", { id: this.house_id })
        .then(() => {
          if (event) {
            event.target.complete();
          }
        });
    },
    goTo({ location }) {
      switch (location) {
        case "new-environment":
          this.$router.push({
            name: "house-environment-create",
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
