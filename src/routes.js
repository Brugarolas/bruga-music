import Main from '@/routes/Main.vue';
import ArtistDetail from '@/routes/ArtistDetail.vue';

const routes = [
  { path: '/', component: Main, name: 'Main' },
  { path: '/artist/:name', component: ArtistDetail, name: 'Artist' }
];

export default routes;
