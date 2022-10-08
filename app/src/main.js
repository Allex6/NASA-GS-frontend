import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import VueTheMask from 'vue-the-mask';

const router = createRouter({
  history: createWebHistory(),
  routes
});

loadFonts();

createApp(App)
  .use(vuetify)
  .use(router)
  .use(VueTheMask)
  .mount('#app')
