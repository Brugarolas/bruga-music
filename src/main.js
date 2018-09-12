import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import routes from '@/routes.js';
import LowerCaseFilter from '@/utils/lowercase-filter.js';
import HumanNumberFilter from '@/utils/number-format-filter.js';
import DurationFilter from '@/utils/duration-filter.js';
import store from '@/store.js';

Vue.use(VueRouter);
Vue.use(LowerCaseFilter);
Vue.use(HumanNumberFilter);
Vue.use(DurationFilter);

const router = new VueRouter({ routes, mode: 'history' });

const app = new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App),
  router,
  store
});
