import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import routes from '@/routes.js';
import LowerCase from '@/utils/lowercase-filter.js';
import HumanNumber from '@/utils/number-format-filter.js';

Vue.use(VueRouter);
Vue.use(LowerCase);
Vue.use(HumanNumber);

const router = new VueRouter({ routes, mode: 'history' });

const app = new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App),
  router
});
