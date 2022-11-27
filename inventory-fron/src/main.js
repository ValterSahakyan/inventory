import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";

import router from "@/router";

Vue.config.productionTip = false;
const app = createApp(App);
app.use(VueApexCharts);
app.use(router);
app.mount('#app')

import "bootstrap/dist/js/bootstrap"
