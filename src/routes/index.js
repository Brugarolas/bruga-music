import Main from './Main.vue';
import Playlist from './Playlist.vue';
import ArtistDetail from './ArtistDetail.vue';
import AlbumDetail from './AlbumDetail.vue';

const routes = [
  { path: '/', component: Main, name: 'Main', meta: { transitionName: 'slide' } },
  { path: '/playlist', component: Playlist, name: 'Playlist', meta: { transitionName: 'zoom' } },
  { path: '/artist/:name', component: ArtistDetail, name: 'Artist', meta: { transitionName: 'slide' } },
  { path: '/artist/:name/:album', component: AlbumDetail, name: 'Album', meta: { transitionName: 'slide' } }
];

export default routes;
