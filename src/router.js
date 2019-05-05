import Vue from "vue";
import { IonicVueRouter } from "@ionic/vue";
import store from "@/store";
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Account from "@/views/Account.vue";
import Login from "@/views/auth/Login.vue";
import Signup from "@/views/auth/Signup.vue";
import CreateBatHouse from "@/views/bathouse/CreateBatHouse.vue";
import ListBatHouse from "@/views/bathouse/ListBatHouse.vue";
import CreateEnvironmentFeatures from "@/views/bathouse/CreateEnvironmentFeatures.vue";
import ListEnvironmentFeatures from "@/views/bathouse/ListEnvironmentFeatures.vue";
import CreatePhysicalFeatures from "@/views/bathouse/CreatePhysicalFeatures.vue";
import ListPhysicalFeatures from "@/views/bathouse/ListPhysicalFeatures.vue";
import CreateObservation from "@/views/bathouse/CreateObservation.vue";
import ListObservation from "@/views/bathouse/ListObservation.vue";
import Monitor from "@/views/Monitor.vue";
import Species from "@/views/Species.vue";

Vue.use(IonicVueRouter);

const privateRoute = function(to, from, next) {
  if (store.state.token) {
    next();
  } else {
    next({ name: "login" });
  }
};

export default new IonicVueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/account",
      name: "account",
      component: Account,
      beforeEnter: privateRoute
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/houses",
      name: "house-list",
      component: ListBatHouse,
      beforeEnter: privateRoute
    },
    {
      path: "/houses/create",
      name: "house-create",
      component: CreateBatHouse,
      beforeEnter: privateRoute
    },
    {
      path: "/houses/:id/environment",
      name: "house-environment-list",
      component: ListEnvironmentFeatures,
      beforeEnter: privateRoute
    },
    {
      path: "/houses/:id/environment/create",
      name: "house-environment-create",
      component: CreateEnvironmentFeatures,
      beforeEnter: privateRoute
    },
    {
      path: "/houses/:id/physical",
      name: "house-physical-list",
      component: ListPhysicalFeatures,
      beforeEnter: privateRoute
    },
    {
      path: "/houses/:id/physical/create",
      name: "house-physical-create",
      component: CreatePhysicalFeatures,
      beforeEnter: privateRoute
    },
    {
      path: "/houses/:id/observations",
      name: "house-observation-list",
      component: ListObservation,
      beforeEnter: privateRoute
    },
    {
      path: "/houses/:id/observations/create",
      name: "house-observation-create",
      component: CreateObservation,
      beforeEnter: privateRoute
    },
    {
      path: "*",
      redirect: { name: "home" }
    },
    {
      path: "/monitor",
      name: "monitor",
      component: Monitor
    },
    {
      path: "/species",
      name: "species",
      component: Species
    }
  ]
});
