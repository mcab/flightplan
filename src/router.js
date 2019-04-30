import Vue from "vue";
import { IonicVueRouter } from "@ionic/vue";
import Home from "@/views/Home.vue";
import store from "@/store";

Vue.use(IonicVueRouter);

const privateRoute = function(to, from, next) {
  if (!store.state.user || !store.state.user.isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
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
      component: () => import("@/views/About.vue")
    },
    {
      path: "/account",
      name: "account",
      component: () => import("@/views/Account.vue"),
      beforeEnter: privateRoute
    }
  ]
});
