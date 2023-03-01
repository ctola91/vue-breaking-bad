import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import router from "./router";
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);

import "@/store/characters.store";

// app.use(VueQueryPlugin);
VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 120, // 2 minutes
        refetchOnReconnect: "always",
      },
    },
  },
});

app.use(router);

app.mount("#app");
