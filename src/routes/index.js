import Main from './Main.vue';
import Playlist from './Playlist.vue';
import ArtistDetail from './ArtistDetail.vue';
import AlbumDetail from './AlbumDetail.vue';
import store from '@/store/index.js';

const goBack = (from, next) => {
  const hasPrevRoute = Boolean(from.name);

  next(hasPrevRoute ? false : '/');
};

const beforeCheckPlaylist = (to, from, next) => {
  const hasSong = store.getters.hasSong;

  if (hasSong) {
    next();
  } else {
    goBack(from, next);
  }
};

const routes = [
  { path: '/', component: Main, name: 'Main', meta: { transitionName: 'slide' } },
  { path: '/playlist', component: Playlist, name: 'Playlist', meta: { transitionName: 'zoom' }, beforeEnter: beforeCheckPlaylist },
  { path: '/artist/:name', component: ArtistDetail, name: 'Artist', meta: { transitionName: 'slide' } },
  { path: '/artist/:name/:album', component: AlbumDetail, name: 'Album', meta: { transitionName: 'slide' } }
];

export default routes;
