import Vue from "vue";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import App from "./App.vue";
import router from "./router";
import VeeValidate from "vee-validate";
import VueSweetalert2 from "vue-sweetalert2";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// Import the styles directly. (Or you could add them via script tags.)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { TablePlugin } from "bootstrap-vue";
Vue.use(TablePlugin);
Vue.use(VeeValidate);
Vue.config.productionTip = false;
Vue.use(VueSweetalert2);
Vue.use(VueToast, {
  // One of the options
  position: "top-right"
});
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
