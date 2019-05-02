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
    }
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
        router.replace({ name: "about" });
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
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      commit("authUser", {
        token: token
      });
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("token");
      router.replace("/signin");
    },
    storeUser({ state }, userData) {
      if (!state.token) {
        return;
      }
      axios
        .post("/users.json" + "?auth=" + state.token, userData)
        .then(res => {
          console.log(res); // eslint-disable-line no-console
        })
        .catch(error => {
          console.log(error); // eslint-disable-line no-console
        });
    },
    fetchUser({ commit, state }) {
      if (!state.token) {
        return;
      }
      axios
        .get("/users.json" + "?auth=" + state.token)
        .then(res => {
          console.log(res); // eslint-disable-line no-console
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          console.log(users); // eslint-disable-line no-console
          commit("storeUser", users[0]);
        })
        .catch(error => {
          console.log(error); // eslint-disable-line no-console
        });
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
    }
  }
});
