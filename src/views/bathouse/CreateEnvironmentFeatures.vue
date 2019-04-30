<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title
          >Add Environment Survey for Bat House ID
          {{ $route.params.id }}</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-item-group>
        <ion-item-divider>
          <ion-label>Prelude</ion-label>
        </ion-item-divider>
        <ion-item>
          <ion-label text-wrap position="stacked"
            >Have you completed an environmental assessment of this bat house
            this year?</ion-label
          >
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
            <ion-label text-wrap
              >Stand underneath the bathouse, and select those that
              apply.</ion-label
            >
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
            <ion-range
              min="0"
              max="5"
              step="1"
              snaps="true"
              ticks="true"
              @ionChange="payload.tree_type = $event.target.value"
            >
              <ion-icon slot="start" name="leaf" size="small"></ion-icon>
              <ion-icon slot="end" name="leaf"></ion-icon>
            </ion-range>
            <ion-note
              >0 is no trees, 1 is all deciduous, 5 is all
              evergreen/coniferous</ion-note
            >
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
              @ionChange="payload.noise_disturbances = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.noiseDisturbances"
                :key="value"
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item v-if="payload.noise_disturbances.includes('OT')">
            <ion-label position="stacked">Other noise disturbances</ion-label>
            <ion-input
              type="text"
              :value="payload.other_noise_disturbances"
              @ionChange="
                payload.other_noise_disturbances = $event.target.value
              "
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
              @ionChange="payload.nearest_water_resource = $event.target.value"
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
          <ion-item v-if="payload.nearest_water_resource.includes('OT')">
            <ion-label position="stacked">Other water resource</ion-label>
            <ion-input
              type="text"
              :value="payload.other_nearest_water_resource"
              @ionChange="
                payload.other_nearest_water_resource = $event.target.value
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
            <ion-text
              >You don't need to submit another form for the rest of this year.
              Thank you!</ion-text
            >
          </ion-item>
        </ion-item-group>
      </template>
    </ion-content>
  </div>
</template>

<script>
export default {
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
        waterResourceUnits: {
          FT: "Feet (ft)",
          KM: "Kilometers (km)",
          ME: "Meters (m)",
          MI: "Miles (mi)"
        }
      },
      payload: {
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
        noise_disturbances: [],
        other_noise_disturbances: "",
        night_light_pollution_amount: "",
        night_light_pollution_consistency: "",
        nearest_water_resource: "",
        other_nearest_water_resource: "",
        water_resource_distance: 0,
        water_resource_units: "",
        morning_sunlight: 0,
        afternoon_sunlight: 0,
        other_features: ""
      }
    };
  },
  methods: {
    submitPayload() {
      console.log(this.payload); // eslint-disable-line no-console
    }
  }
};
</script>
