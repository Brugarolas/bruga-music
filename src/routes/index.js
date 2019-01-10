import Main from './Main.vue';
import ArtistDetail from './ArtistDetail.vue';

const routes = [
  { path: '/', component: Main, name: 'Main' },
  { path: '/artist/:name', component: ArtistDetail, name: 'Artist' }
];

export default routes;
