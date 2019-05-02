import Vue from "vue";
import axios from "axios";
import Ionic from "@ionic/vue";
import Vuelidate from "vuelidate";
import vuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import "./registerServiceWorker";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.VUE_APP_API_DEV_BASE_URL
    : process.env.VUE_APP_API_PROD_BASE_URL;

axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status >= 500 && error.response.status <= 599) {
      store.dispatch("serverError", {
        data: {
          server: ["An issue occurred server side."]
        }
      });
    } else if (error.response.status === 401) {
      store.dispatch("logout");
      store.commit("displayToast", {
        display: true,
        message: "You've been automatically logged out.",
        color: "warning"
      });
    } else if (error.response.status === 404) {
      store.dispatch("serverError", {
        data: {
          server: ["The server could not find the page specified."]
        }
      });
    } else if (error.response) {
      store.dispatch("serverError", error.response);
    } else {
      store.dispatch("serverError", {
        data: {
          server: ["A general issue occurred."]
        }
      });
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  request => {
    if (store.getters.isAuthenticated) {
      request.headers.authorization = `Token ${store.state.token}`;
    }
    return request;
  },
  error => {
    store.dispatch("serverError", {
      data: {
        server: ["An issue has occured while trying to contacting the server."]
      }
    });
    return Promise.reject(error);
  }
);

Vue.use(Ionic);
Vue.use(Vuelidate);
Vue.use(vuelidateErrorExtractor, {
  template: templates.multiErrorExtractor.baseMultiErrorExtractor,
  messages: { required: "The {attribute} field is required." }
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
