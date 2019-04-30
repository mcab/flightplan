<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>
          Add Observation for Bat House ID
          {{ $route.params.id }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <template>
        <ion-item-group>
          <ion-item-divider sticky="true">
            <ion-label text-wrap>Observation information</ion-label>
          </ion-item-divider>

          <ion-item>
            <ion-label>Observed on</ion-label>
            <ion-datetime
              display-format="MMMM DD, YYYY"
              :max="todayDate"
              :value="payload.checked"
              @ionChange="payload.checked = $event.target.value"
            ></ion-datetime>
          </ion-item>

          <ion-item>
            <ion-label>Are there bats present?</ion-label>
            <ion-toggle
              :checked="payload.present"
              @ionChange="payload.present = $event.detail.checked"
            ></ion-toggle>
          </ion-item>

          <template v-if="currentlyPresent">
            <ion-item>
              <ion-label>Number of bats present</ion-label>
              <ion-input
                type="number"
                :value="payload.occupants"
                @ionChange="payload.occupants = $event.target.value"
              ></ion-input>
            </ion-item>
          </template>

          <ion-item>
            <ion-label position="stacked">
              Has a bat biologist set up acoustic monitoring around the bat
              house?
            </ion-label>
            <ion-select
              multiple="false"
              @ionChange="payload.acoustic_monitor = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.acousticMonitor"
                :key="value"
                :value="value"
              >{{ label }}</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Other notes</ion-label>
            <ion-textarea
              placeholder="Add additional observation information about the bat house here"
              @ionChange="payload.notes = $event.target.value"
            ></ion-textarea>
          </ion-item>
        </ion-item-group>

        <ion-button expand="block" @click="submitPayload">Submit Form</ion-button>
      </template>
    </ion-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todayDate: `${new Date().toISOString().split("T")[0]}`,
      choices: {
        acousticMonitor: {
          Y: "Yes",
          N: "No",
          U: "Unsure"
        }
      },
      payload: {
        checked: "",
        present: false,
        occupants: 0,
        notes: ""
      }
    };
  },
  computed: {
    currentlyPresent() {
      return this.payload.present;
    }
  },
  methods: {
    submitPayload() {
      console.log(this.payload); // eslint-disable-line no-console
    }
  }
};
</script>
