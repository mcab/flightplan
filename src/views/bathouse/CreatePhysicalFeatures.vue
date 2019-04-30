<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>
          Add Physical House Survey for Bat House ID
          {{ $route.params.id }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <template>
        <ion-item-group>
          <ion-item-divider sticky="true">
            <ion-label text-wrap>Bat house information</ion-label>
          </ion-item-divider>

          <ion-item>
            <ion-label position="stacked">Size of bat house</ion-label>
            <ion-select
              multiple="false"
              @ionChange="payload.bat_house_size = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.batHouseSize"
                :key="value"
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="stacked"
              >Number of chambers in bat house</ion-label
            >
            <ion-input
              type="number"
              :value="payload.chambers"
              @ionChange="payload.chambers = $event.target.value"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked"
              >The bat house is mounted on</ion-label
            >
            <ion-select
              multiple="false"
              @ionChange="payload.mounted_on = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.mountedOn"
                :key="value"
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item v-if="payload.mounted_on.includes('OT')">
            <ion-label position="stacked">
              The bat house is
              <strong>actually</strong> mounted on
            </ion-label>
            <ion-input
              type="text"
              :value="payload.other_mounted_on"
              @ionChange="payload.other_mounted_on = $event.target.value"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">
              Height above the ground (in feet) that the bat house is mounted
            </ion-label>
            <ion-input
              type="number"
              :value="payload.ground_height"
              @ionChange="payload.ground_height = $event.target.value"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">
              Direction that the face of the bat house is pointing in
            </ion-label>
            <ion-select
              @ionChange="payload.direction_facing = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in choices.directions"
                :key="value"
                text-wrap
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Color of the bat house</ion-label>
            <ion-select @ionChange="payload.color = $event.target.value">
              <ion-select-option
                v-for="(label, value) in choices.color"
                :key="value"
                text-wrap
                :value="value"
                >{{ label }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <ion-item v-if="payload.color.includes('OT')">
            <ion-label position="stacked">
              The bat house is
              <strong>actually</strong> colored
            </ion-label>
            <ion-input
              type="text"
              :value="payload.other_color"
              @ionChange="payload.other_color = $event.target.value"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Bat house was installed on</ion-label>
            <ion-datetime
              display-format="MMMM DD, YYYY"
              :max="todayDate"
              :value="payload.installed"
              @ionChange="payload.installed = $event.target.value"
            ></ion-datetime>
          </ion-item>
        </ion-item-group>

        <ion-button expand="block" @click="submitPayload"
          >Submit Form</ion-button
        >
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
        batHouseSize: {
          S: "Small (<1 foot long)",
          M: "Medium (1-3 feet long)",
          L: "Large (>3 feet long)"
        },
        color: {
          BL: "Black",
          DB: "Dark brown",
          MB: "Medium brown",
          LB: "Light brown",
          TB: "Tan/Beige",
          NW: "Natural wood",
          WH: "White",
          OT: "Other"
        },
        directions: {
          NO: "North",
          NE: "Northeast",
          EA: "East",
          SE: "Southeast",
          SO: "South",
          SW: "Southwest",
          WE: "West",
          NW: "Northwest"
        },
        mountedOn: {
          BD: "Building",
          PI: "On a pole by itself",
          PB: "On a pole with another bat house, back to back",
          TR: "Tree",
          OT: "Other"
        }
      },
      payload: {
        bat_house_size: "",
        chambers: 1,
        mounted_on: "",
        other_mounted_on: "",
        ground_height: 0,
        direction_facing: "",
        color: "",
        other_color: "",
        installed: ""
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
