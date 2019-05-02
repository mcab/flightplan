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
      duration: 3000,
      color: "",
      showCloseButton: true
    },
    houses: []
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
        duration: 6000,
        color: "",
        showCloseButton: true
      };
    },
    updateHouses(state, payload) {
      if (payload.count) {
        state.houses = payload.count > 0 ? payload.results : {};
      } else {
        state.houses.unshift(payload);
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
        router.replace({ name: "login" });
        commit("displayToast", {
          display: true,
          message: "You've successfully signed up!",
          color: "success"
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
        router.replace({ name: "account" });
        commit("displayToast", {
          display: true,
          message: "You've successfully logged in!",
          color: "success"
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
      router.replace({ name: "home" });
      commit("displayToast", {
        display: true,
        message: "You've been logged out.",
        color: "success"
      });
    },
    async getHouseData({ commit }) {
      try {
        let response = await axios.get("/api/v1/houses");
        if (response.status === 200) {
          commit("updateHouses", response.data);
        }
      } catch (error) {
        commit("displayToast", {
          display: true,
          message: "An unexpected error occurred.",
          color: "danger"
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
            message: "The house was successfully created!",
            color: "success"
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
    }
  }
});
