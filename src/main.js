import Vue from 'vue';
import VueCompositionAPI, { createApp, h } from '@vue/composition-api';

import App from './App.vue';
import './plugins/sweetalert2-vue';
import vuetify from './plugins/vuetify';

Vue.use(VueCompositionAPI);

const app = createApp({
  vuetify,
  render: () => h(App),
});

app.mount('#app');
