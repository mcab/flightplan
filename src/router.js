import Vue from "vue";
import { IonicVueRouter } from "@ionic/vue";
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import store from "@/store";

Vue.use(IonicVueRouter);

const privateRoute = function(to, from, next) {
  if (store.state.idToken) {
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
      component: () =>
        import(/* webpackChunkName: "auth" */ "@/views/Account.vue"),
      beforeEnter: privateRoute
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "auth" */ "@/views/auth/Login.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () =>
        import(/* webpackChunkName: "auth" */ "@/views/auth/Signup.vue")
    },
    {
      path: "/houses",
      name: "houses",
      component: () =>
        import(/* webpackChunkName: "bathouse" */ "@/views/bathouse/ListBatHouse.vue")
    },
    {
      path: "/houses/create",
      name: "house-create",
      component: () =>
        import(/* webpackChunkName: "bathouse" */ "@/views/bathouse/CreateBatHouse.vue")
    },
    {
      path: "/houses/:id/environment/create",
      name: "house-environment-create",
      component: () =>
        import(/* webpackChunkName: "bathouse" */ "@/views/bathouse/CreateEnvironmentFeatures.vue")
    },
    {
      path: "/houses/:id/physical/create",
      name: "house-physical-create",
      component: () =>
        import(/* webpackChunkName: "bathouse" */ "@/views/bathouse/CreatePhysicalFeatures.vue")
    },
    {
      path: "/houses/:id/observations/create",
      name: "house-observation-create",
      component: () =>
        import(/* webpackChunkName: "bathouse" */ "@/views/bathouse/CreateObservation.vue")
    },
    {
      path: "*",
      redirect: { name: "home" }
    }
  ]
});
