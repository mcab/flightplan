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
          <ion-label>GPS Information</ion-label>
        </ion-item-divider>
        <template v-if="autoGeolocation">
          <ion-item>
            <ion-button @click="getLocation">Get Location</ion-button>
          </ion-item>
        </template>
        <ion-item>
          <ion-label position="stacked" required>Longitude</ion-label>
          <ion-input
            type="number"
            :value="payload.location.longitude"
            @ionChange="payload.location.longitude = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked" required>Latitude</ion-label>
          <ion-input
            type="number"
            :value="payload.location.latitude"
            @ionChange="payload.location.latitude = $event.target.value"
          ></ion-input>
        </ion-item>
      </ion-item-group>
      <ion-list>
        <ion-item-divider>
          <ion-label>Location Information</ion-label>
        </ion-item-divider>
        <ion-item>
          <ion-label position="stacked" required>Town Name</ion-label>
          <ion-input
            type="text"
            :value="payload.town_name"
            @ionChange="payload.town_name = $event.target.value"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked" required>Property Type</ion-label>
          <ion-select
            placeholder="Select One"
            :value="payload.property_type"
            @ionChange="payload.property_type = $event.target.value"
          >
            <ion-select-option
              v-for="(label, value) in propertyType"
              :key="value"
              :value="value"
              >{{ label }}</ion-select-option
            >
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
      </ion-list>
      <ion-text color="danger">
        <template v-if="errors">
          <p v-if="errors.status" padding-left>
            {{ errors.status }}: {{ errors.statusText }}
          </p>
          <template v-for="(error_array, error_key) in errors.data">
            <p v-for="(error, index) in error_array" :key="index" padding-left>
              {{ error_key }}: {{ error }}
            </p>
          </template>
        </template>
      </ion-text>
      <ion-button expand="block" @click="submitPayload">Submit Form</ion-button>
    </ion-content>
  </div>
</template>

<script>
import { required, requiredIf } from "vuelidate/lib/validators";
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
        property_type: "",
        other_property_type: ""
      },
      submitted: false,
      validate: {
        localMessages: {
          required: "The {attribute} field must be filled in!"
        },
        attributes: {
          "location.longitude": "Longitude",
          "location.latitude": "Latitude",
          town_name: "Town name",
          property_type: "Property type",
          other_property_type: "Other property type"
        }
      }
    };
  },
  computed: {
    ...mapGetters(["errors", "toastInfo"]),
    autoGeolocation() {
      return this.useAutoGeolocation;
    }
  },
  validations: {
    payload: {
      location: {
        longitude: {
          required
        },
        latitude: {
          required
        }
      },
      town_name: {
        required
      },
      property_type: {
        required
      },
      other_property_type: {
        required: requiredIf(model => {
          return model.property_type
            ? model.property_type.includes("OT")
            : false;
        })
      }
    }
  },
  mounted() {
    this.$store.dispatch("clearErrors");
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
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store.dispatch("clearErrors");
      this.$store.dispatch("createHouse", this.payload).finally(() => {
        if (this.toastInfo.message) {
          this.toast(this.toastInfo);
          this.$store.dispatch("clearToast");
        }
      });
    }
  }
};
</script>
