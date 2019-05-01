import Vue from "vue";
import axios from "axios";
import Ionic from "@ionic/vue";
import Vuelidate from "vuelidate";
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

Vue.use(Ionic);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
