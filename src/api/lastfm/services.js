import config from './config.js';
import HyperId from 'hyperid';
import { sanitize } from '@/utils/aux-methods.js';

HyperId.instance = HyperId({ fixedLength: true, urlSafe: true });

const { apiKey, url } = config;
const format = 'json';

/* API */
const getTopArtists = async (country) => {
  const url = buildApiUrl('geo.gettopartists', { 'country': country });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return checkMbids(json.topartists.artist);
};

const getArtistInfo = async (artist) => {
  const url = buildApiUrl('artist.getinfo', { 'artist': sanitize(artist) });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return json.artist;
};

const getArtistTopTags = async (artist) => {
  const url = buildApiUrl('artist.gettoptags', { 'artist': sanitize(artist) });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return json.toptags.tag;
};

const getArtistTopAlbums = async (artist) => {
  const url = buildApiUrl('artist.gettopalbums', { 'artist': sanitize(artist) });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return json.topalbums.album;
};

const getArtistTopTracks = async (artist) => {
  const url = buildApiUrl('artist.gettoptracks', { 'artist': sanitize(artist), 'limit': 10 });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return json.toptracks.track;
};

const getTrackInfo = async (artist, track) => {
  const url = buildApiUrl('track.getinfo', { 'artist': sanitize(artist), 'track': sanitize(track) });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return json.track;
};

const getSearchFunction = (type) => {
  if (type === 'track') {
    return searchTrack;
  }

  if (type === 'artist') {
    return searchArtist;
  }

  if (type === 'album') {
    return searchAlbum;
  }

  return q => { console.warn('This searcher is not supported yet!'); };
};

const searchTrack = async (search) => {
  const url = buildApiUrl('track.search', { 'track': search });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return checkMbids(json.results.trackmatches.track);
};

const searchAlbum = async (search) => {
  const url = buildApiUrl('album.search', { 'album': search });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return checkMbids(json.results.albummatches.album);
};

const searchArtist = async (search) => {
  const url = buildApiUrl('artist.search', { 'artist': search });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return checkMbids(sortWithoutImages(filterMbids(json.results.artistmatches.artist)));
};

/* Aux API methods */
const buildApiUrl = (method, params) => buildUrl(url, { 'method': method, ...params, 'api_key': apiKey, 'format': format });

const buildUrl = (url, params) => `${url}?${paramsToUrl(params)}`;

const paramsToUrl = (params = {}) => Object.entries(params).map((param) => paramToUrl(...param)).join('&');

const paramToUrl = (name, value) => name + (value ? '=' + value : '');

/* Other aux */
const filterMbids = (list) => {
  let mbids = new Map();

  return list.filter(element => {
    if (!element.mbid) return true;

    let exists = mbids.has(element.mbid);
    if (!exists) mbids.set(element.mbid, true);
    return !exists;
  });
};

const checkMbids = (list) => {
  list.filter(element => !element.mbid).forEach(element => {
    element.mbid = 'random:' + HyperId.instance();
  });
  return list;
};

const sortWithoutImages = (artists) => {
  let withImages = [];
  let withoutImages = [];

  artists.forEach(artist => {
    let image = artist.image[2]['#text'];
    let array = image === '' ? withoutImages : withImages;
    array.push(artist);
  });

  return withImages.concat(withoutImages);
};

/* Exports */
const standalone = { getTopArtists };
const artist = { getArtistInfo, getArtistTopTags, getArtistTopAlbums, getArtistTopTracks };
const track = { getTrackInfo };
const search = { getSearchFunction, searchTrack, searchAlbum, searchArtist };

export default { ...standalone, ...artist, ...track, ...search };
