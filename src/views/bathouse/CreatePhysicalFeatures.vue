<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>
          Physical Features Survey
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
        </ion-title>
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
        <ion-item-divider sticky="true">
          <ion-label text-wrap>Bat house information</ion-label>
        </ion-item-divider>

        <ion-item>
          <ion-label position="stacked">Size of bat house</ion-label>
          <ion-select
            multiple="false"
            @ionChange="payload.house_size = $event.target.value"
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
          <ion-label position="stacked">The bat house is mounted on</ion-label>
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
          <ion-label position="stacked"
            >Height above the ground (in feet) that the bat house is
            mounted</ion-label
          >
          <ion-input
            type="number"
            :value="payload.ground_height"
            @ionChange="payload.ground_height = $event.target.value"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked"
            >Direction that the face of the bat house is pointing in</ion-label
          >
          <ion-select @ionChange="payload.direction = $event.target.value">
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

      <ion-button expand="block" @click="submitPayload">Submit Form</ion-button>
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
        house_size: "",
        chambers: 1,
        mounted_on: "",
        other_mounted_on: "",
        ground_height: 0,
        direction: "",
        color: "",
        other_color: "",
        installed: ""
      },
      validate: {
        localMessages: {
          required: "The {attribute} field must be filled in!"
        },
        attributes: {
          house_size: "Bat house size",
          chambers: "Chambers",
          mounted_on: "Bat house mount",
          other_mounted_on: "Other bat house mount",
          ground_height: "Ground height",
          direction: "Direction",
          color: "Color",
          other_color: "Other color",
          installed: "Installation date"
        }
      }
    };
  },
  computed: {
    ...mapGetters(["toastInfo"])
  },
  validations: {
    payload: {
      house_size: { required },
      chambers: { required, numeric },
      mounted_on: { required },
      other_mounted_on: {
        required: requiredIf(model => {
          return Array.isArray(model.mounted_on) &&
            model.mounted_on.length !== 0
            ? model.mounted_on.includes("OT")
            : false;
        })
      },
      ground_height: { required, numeric },
      direction: { required },
      color: { required },
      other_color: {
        required: requiredIf(model => {
          return Array.isArray(model.color) && model.color.length !== 0
            ? model.color.includes("OT")
            : false;
        })
      },
      installed: { required }
    }
  },
  methods: {
    submitPayload() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.payload.installed = `${
        new Date(this.payload.installed).toISOString().split("T")[0]
      }`;
      this.$store
        .dispatch("createPhysicalData", {
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
