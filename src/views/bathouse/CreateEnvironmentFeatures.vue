<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Add Environment Survey for Bat House ID {{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-item-group>
        <ion-item-divider>
          <ion-label>Prelude</ion-label>
        </ion-item-divider>
        <ion-item>
          <ion-label
            text-wrap
            position="stacked"
          >Have you completed an environmental assessment of this bat house this year?</ion-label>
          <ion-select
            placeholder="Select One"
            :value="doneThisYear"
            @ionChange="doneThisYear = $event.target.value"
          >
            <ion-select-option
              v-for="(label, value) in choices.doneThisYearOptions"
              :key="value"
              :value="value"
            >{{ label }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-item-group>

      <template v-if="doneThisYear === 'N' || doneThisYear === 'U'">
        <ion-item-group>
          <ion-item-divider>
            <ion-label text-wrap>Stand underneath the bathouse, and select those that apply.</ion-label>
          </ion-item-divider>

          <ion-item>
            <ion-label position="stacked">Habitat Type</ion-label>
            <ion-select multiple="true" @ionChange="payload.habitat_type = $event.target.value">
              <ion-select-option
                v-for="(label, value) in choices.habitatType"
                :key="value"
                :value="value"
              >{{ label }}</ion-select-option>
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
            <ion-label position="stacked">Habitat Degradation</ion-label>
            <ion-select
              multiple="true"
              @ionChange="payload.habitat_degradation = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.habitatDegradation"
                :key="value"
                :value="value"
              >{{ label }}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item v-if="payload.habitat_degradation.includes('OT')">
            <ion-label position="stacked">Other Forms of Habitat Degradation</ion-label>
            <ion-input
              type="text"
              :value="payload.other_habitat_degradation"
              @ionChange="payload.other_habitat_degradation = $event.target.value"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Man Made Structures</ion-label>
            <ion-select
              multiple="true"
              @ionChange="payload.man_made_structure = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.manMadeStructures"
                :key="value"
                :value="value"
              >{{ label }}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item v-if="payload.man_made_structure.includes('OT')">
            <ion-label position="stacked">Other Man Made Structure(s)</ion-label>
            <ion-input
              type="text"
              :value="payload.other_man_made_structure"
              @ionChange="payload.other_man_made_structure = $event.target.value"
            ></ion-input>
          </ion-item>
        </ion-item-group>
        <ion-button expand="block" @click="submitPayload">Submit Form</ion-button>
      </template>
      <template v-if="doneThisYear === 'Y'">
        <ion-item-group>
          <ion-item>
            <ion-text>You don't need to submit another form for the rest of this year. Thank you!</ion-text>
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
        }
      },
      payload: {
        habitat_type: [],
        other_habitat_type: "",
        habitat_degradation: [],
        other_habitat_degradation: "",
        man_made_structure: [],
        other_man_made_structure: ""
      }
    };
  },
  methods: {
    getLocation() {
      if (!navigator.geolocation) {
        this.useAutoGeolocation = false;
      }

      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.payload.location.longitude = coords.longitude;
        this.payload.location.latitude = coords.latitude;
      });
    },
    submitPayload() {
      console.log(this.payload); // eslint-disable-line no-console
    }
  }
};
</script>
