<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Create Bat House</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>Location Information</ion-label>
        </ion-list-header>
        <ion-item-group>
          <ion-item-divider>
            <ion-label>GPS Information</ion-label>
            <ion-icon name="information-circle-outline" slot="end" @click="help('gps')"></ion-icon>
          </ion-item-divider>
          <ion-item>
            <ion-label>Auto Info</ion-label>
            <ion-button
              v-if="autoGeolocation"
              size="small"
              color="tertiary"
              @click="getLocation"
              slot="end"
            >Get Location</ion-button>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Longitude</ion-label>
            <ion-input
              type="number"
              :value="payload.location.longitude"
              @ionChange="payload.location.longitude = $event.target.value"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Latitude</ion-label>
            <ion-input
              type="number"
              :value="payload.location.latitude"
              @ionChange="payload.location.latitude = $event.target.value"
            ></ion-input>
          </ion-item>
        </ion-item-group>

        <ion-item-group>
          <ion-item-divider>
            <ion-label>Physical Information</ion-label>
            <ion-icon name="information-circle-outline" slot="end" @click="help('physical')"></ion-icon>
          </ion-item-divider>
          <ion-item>
            <ion-label position="stacked">Town Name</ion-label>
            <ion-input
              type="text"
              :value="payload.town_name"
              @ionChange="payload.town_name = $event.target.value"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Property Type</ion-label>
            <ion-select
              placeholder="Select One"
              :value="payload.property_type"
              @ionChange="payload.property_type = $event.target.value"
            >
              <ion-select-option
                v-for="(label, value) in propertyType"
                :key="value"
                :value="value"
              >{{ label }}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item v-if="payload.property_type === 'OT'">
            <ion-label position="stacked">Other Property Type</ion-label>
            <ion-input
              type="text"
              :value="payload.other_property_type"
              @ionChange="payload.other_property_type = $event.target.value"
            ></ion-input>
          </ion-item>
        </ion-item-group>
      </ion-list>
      <ion-button expand="full" @click="submitPayload">Submit Form</ion-button>
    </ion-content>
  </div>
</template>

<script>
import { sharedMixin } from "@/mixins/shared"
export default {
  mixins: [sharedMixin],
  data() {
    return {
      useAutoGeolocation: true,
      propertyType: {
        ST: "State",
        TO: "Town",
        SC: "School",
        LT: "Land Trust",
        PR: "Private",
        OT: "Other"
      },
      payload: {
        location: {
          longitude: null,
          latitude: null
        },
        town_name: "",
        property_type: ""
      }
    };
  },
  computed: {
    autoGeolocation() {
      return this.useAutoGeolocation;
    }
  },
  methods: {
    help(param) {
      if (param == 'gps') {
        this.alert({
          header: "Why do I need to give GPS information?",
          message: "We use this information to have the best pin-point accuracy to where the bat house is, to save us searching for it."
        })
      }
      if (param == 'physical') {
        this.alert({
          header: "Why do I need to give the town?",
          message: "This makes it easier for locating the town where the bat house is."
        })
      }
    },
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
