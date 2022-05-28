import Vue from 'vue';
import VueCompositionAPI, { createApp, h } from '@vue/composition-api';

import App from './App.vue';
import './plugins/bootstrap-vue';
import './plugins/sweetalert2-vue';

Vue.use(VueCompositionAPI);

const app = createApp({
  render: () => h(App),
});

app.mount('#app');
