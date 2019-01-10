import Main from './Main.vue';
import ArtistDetail from './ArtistDetail.vue';
import AlbumDetail from './AlbumDetail.vue';

const routes = [
  { path: '/', component: Main, name: 'Main' },
  { path: '/artist/:name', component: ArtistDetail, name: 'Artist' },
  { path: '/artist/:name/:album', component: AlbumDetail, name: 'Album' }
];

export default routes;
