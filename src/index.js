import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import routes from '@/routes/index.js';
import GlobalBus from '@/utils/vue-bus.js';
import LowerCaseFilter from '@/utils/lowercase-filter.js';
import HumanNumberFilter from '@/utils/number-format-filter.js';
import DurationFilter from '@/utils/duration-filter.js';
import VolumeFilter from '@/utils/volume-filter.js';
import AsyncComputed from 'vue-async-computed';
import store from '@/store/index.js';

Vue.use(VueRouter);
Vue.use(GlobalBus);
Vue.use(LowerCaseFilter);
Vue.use(HumanNumberFilter);
Vue.use(DurationFilter);
Vue.use(VolumeFilter);
Vue.use(AsyncComputed);

const publicPath = PUBLIC_PATH || '/'; // eslint-disable-line no-undef
const router = new VueRouter({ routes, base: publicPath, mode: 'history' });

const app = new Vue({ // eslint-disable-line no-unused-vars
  el: '#app',
  render: h => h(App),
  router,
  store
});
