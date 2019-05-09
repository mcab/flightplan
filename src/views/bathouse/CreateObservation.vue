<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>
          Observation
        </ion-title>
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
            Has a bat biologist set up acoustic monitoring around the bat house?
          </ion-label>
          <ion-select
            multiple="false"
            @ionChange="payload.acoustic_monitor = $event.target.value"
          >
            <ion-select-option
              v-for="(label, value) in choices.acousticMonitor"
              :key="value"
              :value="value"
              >{{ label }}</ion-select-option
            >
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
    </ion-content>
  </div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
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
      },
      validate: {
        localMessages: {
          required: "The {attribute} field must be filled in!"
        },
        attributes: {
          checked: { required },
          present: { required },
          occupants: { required, numeric }
        }
      }
    };
  },
  computed: {
    ...mapGetters(["toastInfo"]),
    currentlyPresent() {
      return this.payload.present;
    }
  },
  validations: {
    payload: {
      checked: { required },
      present: { required },
      occupants: { required, numeric }
    }
  },
  methods: {
    submitPayload() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store
        .dispatch("createObservationData", {
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
