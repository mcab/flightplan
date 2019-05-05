import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    error: {
      status: "",
      statusText: "",
      data: ""
    },
    toast: {
      display: null,
      message: "",
      duration: 5000,
      color: "dark",
      showCloseButton: true
    },
    houses: [],
    environment: {},
    physical: {},
    observations: {}
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token;
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.token = null;
    },
    clearErrors(state) {
      state.error = {
        status: null,
        statusText: null,
        data: null
      };
    },
    errors(state, payload) {
      state.error = { ...state.error, ...payload };
    },
    displayToast(state, payload) {
      state.toast = { ...state.toast, ...payload };
    },
    clearToast(state) {
      state.toast = {
        display: null,
        message: "",
        duration: 5000,
        color: "dark",
        showCloseButton: true
      };
    },
    updateHouses(state, payload) {
      if (payload.count) {
        state.houses = payload.count > 0 ? payload.results : {};
      } else {
        state.houses.unshift(payload);
      }
    },
    updateEnvironment(state, { data, type }) {
      if (type === "request") {
        state.environment = data;
      } else if (type === "creation") {
        state.environment.unshift(data);
      }
    },
    updatePhysical(state, { data, type }) {
      if (type === "request") {
        state.physical = data;
      } else if (type === "creation") {
        state.physical.unshift(data);
      }
    },
    updateObservations(state, { data, type }) {
      if (type === "request") {
        state.observations = data;
      } else if (type === "creation") {
        state.observations.unshift(data);
      }
    }
  },
  actions: {
    clearErrors({ commit }) {
      commit("clearErrors");
    },
    clearToast({ commit }) {
      commit("clearToast");
    },
    serverError({ commit }, payload) {
      commit("errors", payload);
    },
    async signup({ commit }, payload) {
      try {
        let data = {
          username: payload.username,
          email: payload.email,
          password: payload.password
        };
        await axios.post("/auth/users/create", data);
        router.push({ name: "login" });
        commit("displayToast", {
          display: true,
          message: "You've successfully signed up!"
        });
      } catch (error) {
        commit("displayToast", {
          display: true,
          message: "An error occured while trying to register.",
          color: "danger"
        });
      }
    },
    async login({ commit }, payload) {
      try {
        let data = {
          username: payload.username,
          password: payload.password
        };
        let response = await axios.post("/auth/token/login", data);
        localStorage.setItem("token", response.data.auth_token);
        commit("authUser", { token: response.data.auth_token });
        router.push({ name: "account" });
        commit("displayToast", {
          display: true,
          message: "You've successfully logged in!"
        });
      } catch (error) {
        commit("displayToast", {
          display: true,
          message: "An error occured while trying to login.",
          color: "danger"
        });
      }
    },
    async autoLogin({ commit, dispatch }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      commit("authUser", {
        token: token
      });
      try {
        let response = await axios.get("/auth/users/me");
        if (response.status !== 200) {
          dispatch("logout");
        }
      } catch (error) {
        if (error.response.status === 401) {
          commit("displayToast", {
            display: true,
            message: "You've been automatically logged out.",
            color: "warning"
          });
        }
        dispatch("logout");
      }
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("token");
      router.push({ name: "home" });
      commit("displayToast", {
        display: true,
        message: "You've been logged out."
      });
    },
    async getHouseData({ commit }) {
      try {
        // TODO: Paginate the houses, instead of retrieving all of them.
        let page = 1;
        let houses = {};
        let results = [];
        let next = "first";
        do {
          let response = await axios.get(`/api/v1/houses?page=${page}`);
          if (response.status === 200) {
            results = results.concat(response.data.results);
          }
          next = response.data.next;
          page++;
        } while (next);
        houses.count = Object.keys(results).length;
        houses.results = results.reverse();
        commit("updateHouses", houses);
      } catch (error) {
        commit("displayToast", {
          display: true,
          message: "An unexpected error occurred."
        });
      }
      return true;
    },
    async createHouse({ commit }, payload) {
      try {
        if (payload.property_type !== "OT") {
          delete payload.other_property_type;
        }
        let response = await axios.post("/api/v1/houses", payload);
        if (response.status === 201) {
          commit("updateHouses", response.data);
          commit("displayToast", {
            display: true,
            message: "The house was successfully created!"
          });
          router.push({ name: "house-list" });
        }
      } catch (error) {
        commit("displayToast", {
          display: true,
          message: "An error occured while trying to create a house.",
          color: "danger"
        });
      }
    },
    async getEnvironmentData({ commit }, payload) {
      try {
        let response = await axios.get(
          `/api/v1/houses/${payload.id}/environment`
        );
        if (response.status === 200) {
          let results = [];
          results = response.data.results.reverse();
          commit("updateEnvironment", {
            data: results,
            type: "request"
          });
        }
      } catch (error) {
        commit("displayToast", {
          display: true,
          message: "An unexpected error occurred."
        });
      }
      return true;
    },
    async createEnvironmentData({ commit }, { payload, id }) {
      try {
        if (!payload.habitat_type.includes("OT")) {
          delete payload.other_habitat_type;
        }
        if (!payload.habitat_degradation.includes("OT")) {
          delete payload.other_habitat_degradation;
        }
        if (!payload.man_made_structure.includes("OT")) {
          delete payload.other_man_made_structure;
        }
        if (!payload.noise_disturbance.includes("OT")) {
          delete payload.other_noise_disturbance;
        }
        if (!payload.nearest_water_resources.includes("OT")) {
          delete payload.other_nearest_water_resources;
        }
        let response = await axios.post(
          `/api/v1/houses/${id}/environment`,
          payload
        );
        if (response.status === 201) {
          commit("updateEnvironment", {
            data: response.data,
            type: "creation"
          });
          commit("displayToast", {
            display: true,
            message: "The environment survey was successfully created!"
          });
          router.push({ name: "house-environment-list", params: { id } });
        }
      } catch (error) {
        commit("displayToast", {
          display: true,
          message:
            "An error occured while trying to submit the environmental survey.",
          color: "danger"
        });
      }
    },
    async getPhysicalData({ commit }, payload) {
      try {
        let response = await axios.get(`/api/v1/houses/${payload.id}/physical`);
        if (response.status === 200) {
          let results = [];
          results = response.data.results.reverse();
          commit("updatePhysical", {
            data: results,
            type: "request"
          });
        }
      } catch (error) {
        commit("displayToast", {
          display: true,
          message: "An unexpected error occurred."
        });
      }
      return true;
    },
    async createPhysicalData({ commit }, { payload, id }) {
      try {
        if (!payload.mounted_on.includes("OT")) {
          delete payload.other_mounted_on;
        }
        if (!payload.color.includes("OT")) {
          delete payload.other_color;
        }
        let response = await axios.post(
          `/api/v1/houses/${id}/physical`,
          payload
        );
        if (response.status === 201) {
          commit("updatePhysical", {
            data: response.data,
            type: "creation"
          });
          commit("displayToast", {
            display: true,
            message: "The physical survey was successfully created!"
          });
          router.push({ name: "house-physical-list", params: { id } });
        }
      } catch (error) {
        commit("displayToast", {
          display: true,
          message:
            "An error occured while trying to submit the physical survey.",
          color: "danger"
        });
      }
    },
    async getObservationData({ commit }, payload) {
      try {
        let response = await axios.get(
          `/api/v1/houses/${payload.id}/observations`
        );
        if (response.status === 200) {
          let results = [];
          results = response.data.results.reverse();
          commit("updateObservations", {
            data: results,
            type: "request"
          });
        }
      } catch (error) {
        commit("displayToast", {
          display: true,
          message: "An unexpected error occurred."
        });
      }
      return true;
    },
    async createObservationData({ commit }, { payload, id }) {
      try {
        let response = await axios.post(
          `/api/v1/houses/${id}/observations`,
          payload
        );
        if (response.status === 201) {
          commit("updateObservations", {
            data: response.data,
            type: "creation"
          });
          commit("displayToast", {
            display: true,
            message: "The observation was successfully created!"
          });
          router.push({ name: "house-observation-list", params: { id } });
        }
      } catch (error) {
        commit("displayToast", {
          display: true,
          message: "An error occured while trying to submit the observation.",
          color: "danger"
        });
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== null;
    },
    errors(state) {
      return state.error;
    },
    toastInfo(state) {
      return state.toast;
    },
    houses(state) {
      return state.houses;
    },
    environments(state) {
      return state.environment;
    },
    physicals(state) {
      return state.physical;
    },
    observations(state) {
      return state.observations;
    }
  }
});
