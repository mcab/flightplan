import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";
import { stat } from "fs";

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
      duration: null,
      color: "",
      showCloseButton: null
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
      state.error.status = payload.status;
      state.error.statusText = payload.statusText;
      state.error.data = payload.data;
    },
    displayToast(state, payload) {
      state.toast.display = payload.display;
      state.toast.message = payload.message;
      state.toast.duration = payload.duration;
      state.toast.color = payload.color;
      state.toast.showCloseButton = payload.showCloseButton;
    },
    clearToast(state) {
      state.toast = {
        display: null,
        message: "",
        duration: null,
        color: "",
        showCloseButton: null
      };
    }
  },
  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit("clearAuthData");
      }, expirationTime * 1000);
    },
    clearErrors({ commit }) {
      commit("clearErrors");
    },
    clearToast({ commit }) {
      commit("clearToast")
    },
    setToast({ commit }, payload) {
      commit("displayToast", payload);
    },
    serverError({ commit }, payload) {
      commit("errors", payload);
    },
    signup({ dispatch }, payload) {
      axios
        .post("/auth/users/create", {
          username: payload.username,
          email: payload.email,
          password: payload.password
        })
        .then(() => {
          router.replace({ name: "login" });
        })
        .catch(error => {
          if (error.response) {
            dispatch("serverError", error.response);
          } else if (error.request) {
            dispatch("serverError", {
              data: {
                server: [
                  "An issue has occured while trying to contacting the server."
                ]
              }
            });
          } else {
            dispatch("serverError", {
              data: {
                general: ["A general error has occured."]
              }
            });
          }
        });
    },
    login({ commit, dispatch }, payload) {
      return axios
        .post("/auth/token/login", {
          username: payload.username,
          password: payload.password
        })
        .then(res => {
          localStorage.setItem("token", res.data.auth_token);
          commit("authUser", { token: res.data.auth_token });
          router.replace({ name: "about" });
          commit("displayToast", {
            display: true,
            message: "You've successfully logged in!",
            duration: 3000,
            color: "success",
            showCloseButton: true
          });
        })
        .catch(error => {
          if (error.response) {
            dispatch("serverError", error.response);
          } else if (error.request) {
            dispatch("serverError", {
              data: {
                server: [
                  "An issue has occured while trying to contacting the server."
                ]
              }
            });
          } else {
            dispatch("serverError", {
              data: {
                general: ["A general error has occured."]
              }
            });
          }
          commit("displayToast", {
            display: true,
            message: "An error occured while trying to login.",
            duration: 3000,
            color: "danger",
            showCloseButton: true
          });
        });
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
