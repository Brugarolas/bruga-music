import Vue from 'vue';
import Vuex from 'vuex';
import LastFM from '@/api/lastfm/vue-plugin.js';
import YouTube from '@/api/youtube/vue-plugin.js';

Vue.use(Vuex);

Vue.use(YouTube);
Vuex.Store.prototype.$youtube = Vue.prototype.$youtube;

Vue.use(LastFM);
Vuex.Store.prototype.$lastfm = Vue.prototype.$lastfm;
