<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Environment Survey</ion-title>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-card v-if="$v.$error">
        <ion-card-header
          >There were errors with your submission!</ion-card-header
        >
        <ion-card-content>
          <ion-list v-if="$v.$error">
            <base-multi-error-extractor
              :validator="$v.payload"
              :attributes="validate.attributes"
            >
              <p slot-scope="{ errorMessage }">
                <ion-text color="danger">{{ errorMessage }}</ion-text>
              </p>
            </base-multi-error-extractor>
          </ion-list>
        </ion-card-content>
      </ion-card>
      <ion-item-group>
        <ion-item-divider>
          <ion-label>Prelude</ion-label>
        </ion-item-divider>
        <ion-item>
          <ion-label text-wrap position="stacked">
            Have you completed an environmental assessment of this bat house
            this year?
          </ion-label>
          <ion-select
            placeholder="Select One"
            :value="doneThisYear"
            @ionChange="doneThisYear = $event.target.value"
          >
            <ion-select-option
              v-for="(label, value) in choices.doneThisYearOptions"
              :key="value"
              :value="value"
              >{{ label }}</ion-select-option
            >
          </ion-select>
        </ion-item>
      </ion-item-group>

      <template v-if="doneThisYear === 'N' || doneThisYear === 'U'">
        <ion-item-group>
          <ion-item-divider sticky="true">
            <ion-label text-wrap>
              Stand underneath the bathouse, and select those that apply.
            </ion-label>
          </ion-item-divider>

          <ion-item>
            <ion-label position="stacked">Habitat type</ion-label>
            <ion-select
              multiple="true"
              @ionChange="payload.habitat_type = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.habitatType"
                :key="value"
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item v-if="payload.habitat_type.includes('OT')">
            <ion-label position="stacked">Other Habitat Type</ion-label>
            <ion-input
              type="text"
              :value="payload.other_habitat_type"
              @ionChange="payload.other_habitat_type = $event.target.value"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Habitat degradation</ion-label>
            <ion-select
              multiple="true"
              @ionChange="payload.habitat_degradation = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.habitatDegradation"
                :key="value"
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item v-if="payload.habitat_degradation.includes('OT')">
            <ion-label position="stacked"
              >Other forms of habitat degradation</ion-label
            >
            <ion-input
              type="text"
              :value="payload.other_habitat_degradation"
              @ionChange="
                payload.other_habitat_degradation = $event.target.value
              "
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Man-made structures</ion-label>
            <ion-select
              multiple="true"
              @ionChange="payload.man_made_structure = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.manMadeStructures"
                :key="value"
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item v-if="payload.man_made_structure.includes('OT')">
            <ion-label position="stacked"
              >Other man-made structure(s)</ion-label
            >
            <ion-input
              type="text"
              :value="payload.other_man_made_structure"
              @ionChange="
                payload.other_man_made_structure = $event.target.value
              "
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Nearby geography</ion-label>
            <ion-select
              multiple="true"
              @ionChange="payload.nearby_geography = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.nearbyGeography"
                :key="value"
                text-wrap
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Slope</ion-label>
            <ion-select @ionChange="payload.slope = $event.target.value">
              <ion-select-option
                v-for="(label, value) in choices.slope"
                :key="value"
                text-wrap
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Tree type</ion-label>
            <ion-select @ionChange="payload.tree_type = $event.target.value">
              <ion-select-option
                v-for="(label, value) in choices.treeType"
                :key="value"
                text-wrap
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>
        </ion-item-group>

        <ion-item-group>
          <ion-item-divider sticky="true">
            <ion-label text-wrap>Information about noise</ion-label>
          </ion-item-divider>

          <ion-item>
            <ion-label position="stacked"
              >Amount of noise during the day</ion-label
            >
            <ion-select
              multiple="false"
              @ionChange="payload.day_noise = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.noise"
                :key="value"
                text-wrap
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
            <ion-icon slot="end" name="sunny"></ion-icon>
          </ion-item>

          <ion-item>
            <ion-label position="stacked"
              >Amount of noise during the night</ion-label
            >
            <ion-select
              multiple="false"
              @ionChange="payload.night_noise = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.noise"
                :key="value"
                text-wrap
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
            <ion-icon slot="end" name="moon"></ion-icon>
          </ion-item>

          <ion-item>
            <ion-label position="stacked"
              >Possible noise disturbances</ion-label
            >
            <ion-select
              multiple="true"
              @ionChange="payload.noise_disturbance = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.noiseDisturbances"
                :key="value"
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item v-if="payload.noise_disturbance.includes('OT')">
            <ion-label position="stacked">Other noise disturbances</ion-label>
            <ion-input
              type="text"
              :value="payload.other_noise_disturbance"
              @ionChange="payload.other_noise_disturbance = $event.target.value"
            ></ion-input>
          </ion-item>
        </ion-item-group>

        <ion-item-group>
          <ion-item-divider sticky="true">
            <ion-label text-wrap>Information about light</ion-label>
          </ion-item-divider>

          <ion-item>
            <ion-label position="stacked"
              >Amount of light pollution at night</ion-label
            >
            <ion-select
              multiple="false"
              @ionChange="
                payload.night_light_pollution_amount = $event.target.value
              "
            >
              <ion-select-option
                v-for="(label, value) in choices.nightLightPollutionAmount"
                :key="value"
                text-wrap
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
            <ion-icon slot="end" name="flashlight"></ion-icon>
          </ion-item>

          <ion-item>
            <ion-label position="stacked"
              >Consistency of light pollution at night</ion-label
            >
            <ion-select
              multiple="false"
              @ionChange="
                payload.night_light_pollution_consistency = $event.target.value
              "
            >
              <ion-select-option
                v-for="(label, value) in choices.nightLightPollutionConsistency"
                :key="value"
                text-wrap
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="stacked"
              >Hours of morning sunlight received</ion-label
            >
            <ion-input
              type="number"
              :value="payload.morning_sunlight"
              @ionChange="payload.morning_sunlight = $event.target.value"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked"
              >Hours of afternoon sunlight received</ion-label
            >
            <ion-input
              type="number"
              :value="payload.afternoon_sunlight"
              @ionChange="payload.afternoon_sunlight = $event.target.value"
            ></ion-input>
          </ion-item>
        </ion-item-group>

        <ion-item-group>
          <ion-item-divider sticky="true">
            <ion-label text-wrap>Information about surrounding water</ion-label>
          </ion-item-divider>

          <ion-item>
            <ion-label position="stacked"
              >Nearest water resource to the bat house</ion-label
            >
            <ion-select
              multiple="false"
              @ionChange="payload.nearest_water_resources = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.nearestWaterResource"
                :key="value"
                text-wrap
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item v-if="payload.nearest_water_resources.includes('OT')">
            <ion-label position="stacked">Other water resource</ion-label>
            <ion-input
              type="text"
              :value="payload.other_nearest_water_resources"
              @ionChange="
                payload.other_nearest_water_resources = $event.target.value
              "
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked"
              >Distance to the nearest water resource</ion-label
            >
            <ion-input
              type="number"
              :value="payload.water_resource_distance"
              @ionChange="payload.water_resource_distance = $event.target.value"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked"
              >Units of distance to the nearest water resource</ion-label
            >
            <ion-select
              multiple="false"
              @ionChange="payload.water_resource_units = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.waterResourceUnits"
                :key="value"
                text-wrap
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>
        </ion-item-group>

        <ion-item-group>
          <ion-item-divider sticky="true">
            <ion-label text-wrap>Other additional features</ion-label>
          </ion-item-divider>

          <ion-item>
            <ion-label position="stacked">Surveyed on</ion-label>
            <ion-datetime
              display-format="MMMM DD, YYYY"
              :value="payload.surveyed"
              @ionChange="payload.surveyed = $event.target.value"
            ></ion-datetime>
          </ion-item>

          <ion-item>
            <ion-textarea
              placeholder="Add additional information about the bat house here"
              @ionChange="payload.other_features = $event.target.value"
            ></ion-textarea>
          </ion-item>
        </ion-item-group>

        <ion-button expand="block" @click="submitPayload"
          >Submit Form</ion-button
        >
      </template>
      <template v-if="doneThisYear === 'Y'">
        <ion-item-group>
          <ion-item>
            <ion-text>
              You don't need to submit another form for the rest of this year.
              Thank you!
            </ion-text>
          </ion-item>
        </ion-item-group>
      </template>
    </ion-content>
  </div>
</template>

<script>
import { required, requiredIf, numeric } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { sharedMixin } from "@/mixins/shared";
import { templates } from "vuelidate-error-extractor";

export default {
  components: {
    baseMultiErrorExtractor:
      templates.multiErrorExtractor.baseMultiErrorExtractor
  },
  mixins: [sharedMixin],
  data() {
    return {
      doneThisYear: "",
      choices: {
        doneThisYearOptions: {
          Y: "Yes",
          N: "No",
          U: "Unsure"
        },
        habitatDegradation: {
          DU: "Dumping",
          ER: "Erosion",
          TR: "Trash",
          NO: "None",
          OT: "Other"
        },
        habitatType: {
          DE: "Development",
          FE: "Forest Edge",
          FG: "Forest Gap",
          FI: "Field",
          SR: "Stream / River",
          WP: "Wetland / Pond",
          OT: "Other"
        },
        manMadeStructures: {
          BU: "Building",
          BR: "Bridge",
          DA: "Dam",
          DR: "Dirt Road",
          FE: "Fence",
          PR: "Paved Roads",
          TR: "Trail",
          NO: "None",
          OT: "Other"
        },
        nearbyGeography: {
          VB: "Valley / Bottomland Hillside",
          RI: "Ridgetop",
          PL: "Plane (Flat Area)"
        },
        nearestWaterResource: {
          CW: "Coastal Wetland",
          IW: "Inland Wetland",
          LA: "Lake",
          PO: "Pond",
          RI: "River",
          ST: "Stream",
          VP: "Vernal Pool",
          NO: "None",
          OT: "Other"
        },
        nightLightPollutionAmount: {
          A: "A lot",
          M: "Medium",
          L: "Low",
          N: "None"
        },
        nightLightPollutionConsistency: {
          T: "Throughout",
          I: "Inconsistent"
        },
        noise: {
          Q: "Quiet",
          M: "Medium",
          L: "Loud"
        },
        noiseDisturbances: {
          BI: "Businesses/Industry",
          CA: "Cars",
          PR: "People/Residential",
          NO: "None",
          OT: "Other"
        },
        slope: { F: "Flat", G: "Gentle", U: "Undulating", S: "Steep" },
        treeType: {
          0: "No trees nearby",
          1: "All deciduous trees",
          2: "Many deciduous trees",
          3: "Split of deciduous and evergreen trees",
          4: "Many evergreen trees",
          5: "All evergreen trees"
        },
        waterResourceUnits: {
          FT: "Feet (ft)",
          KM: "Kilometers (km)",
          ME: "Meters (m)",
          MI: "Miles (mi)"
        }
      },
      payload: {
        surveyed: new Date(),
        habitat_type: [],
        other_habitat_type: "",
        habitat_degradation: [],
        other_habitat_degradation: "",
        man_made_structure: [],
        other_man_made_structure: "",
        nearby_geography: [],
        slope: "",
        tree_type: 0,
        day_noise: "",
        night_noise: "",
        noise_disturbance: [],
        other_noise_disturbance: "",
        night_light_pollution_amount: "",
        night_light_pollution_consistency: "",
        nearest_water_resources: "",
        other_nearest_water_resources: "",
        water_resource_distance: 0,
        water_resource_units: "",
        morning_sunlight: 0,
        afternoon_sunlight: 0,
        other_features: ""
      },
      validate: {
        localMessages: {
          required: "The {attribute} field must be filled in!"
        },
        attributes: {
          surveyed: "Survey Date",
          habitat_type: "Habitat type",
          other_habitat_type: "Other habitat type",
          habitat_degradation: "Habitat degradation",
          other_habitat_degradation: "Other habitat degradation",
          man_made_structure: "Man-made structure",
          other_man_made_structure: "Other man-made structure",
          nearby_geography: "Nearby geography",
          slope: "Slope",
          tree_type: "Tree type",
          day_noise: "Day noise",
          night_noise: "Night noise",
          noise_disturbance: "Noise disturbances",
          other_noise_disturbance: "Other noise disturbances",
          night_light_pollution_amount: "Amount of night light pollution",
          night_light_pollution_consistency:
            "Consistency of night light pollution",
          nearest_water_resources: "Nearest water resource",
          other_nearest_water_resources: "Other nearest water resource",
          water_resource_distance: "Water resource distance",
          water_resource_units: "Water resource units",
          morning_sunlight: "Morning sunlight",
          afternoon_sunlight: "Afternoon sunlight"
        }
      }
    };
  },
  computed: {
    ...mapGetters(["toastInfo"])
  },
  validations: {
    payload: {
      habitat_type: { required },
      other_habitat_type: {
        required: requiredIf(model => {
          return Array.isArray(model.habitat_type) &&
            model.habitat_type.length !== 0
            ? model.habitat_type.includes("OT")
            : false;
        })
      },
      habitat_degradation: { required },
      other_habitat_degradation: {
        required: requiredIf(model => {
          return Array.isArray(model.habitat_degradation) &&
            model.habitat_degradation.length !== 0
            ? model.habitat_degradation.includes("OT")
            : false;
        })
      },
      man_made_structure: { required },
      other_man_made_structure: {
        required: requiredIf(model => {
          return Array.isArray(model.man_made_structure) &&
            model.man_made_structure.length !== 0
            ? model.man_made_structure.includes("OT")
            : false;
        })
      },
      nearby_geography: { required },
      slope: { required },
      tree_type: { required, numeric },
      day_noise: { required },
      night_noise: { required },
      noise_disturbance: { required },
      other_noise_disturbance: {
        required: requiredIf(model => {
          return Array.isArray(model.noise_disturbance) &&
            model.noise_disturbance.length !== 0
            ? model.noise_disturbance.includes("OT")
            : false;
        })
      },
      night_light_pollution_amount: { required },
      night_light_pollution_consistency: { required },
      nearest_water_resources: { required },
      other_nearest_water_resources: {
        required: requiredIf(model => {
          return Array.isArray(model.nearest_water_resources) &&
            model.nearest_water_resources.length !== 0
            ? model.nearest_water_resources.includes("OT")
            : false;
        })
      },
      water_resource_distance: { required, numeric },
      water_resource_units: { required },
      morning_sunlight: { required, numeric },
      afternoon_sunlight: { required, numeric },
      surveyed: { required }
    }
  },
  methods: {
    submitPayload() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store
        .dispatch("createEnvironmentData", {
          payload: this.payload,
          id: this.$route.params.id
        })
        .finally(() => {
          if (this.toastInfo.message) {
            this.toast(this.toastInfo);
            this.$store.dispatch("clearToast");
          }
        });
    }
  }
};
</script>
