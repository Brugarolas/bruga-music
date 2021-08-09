import Adapt from './adapt.js';
import config from './config.js';
import fetch from '@/api/utils/fetch-cache.js';
import { nanoid } from 'nanoid/non-secure';
import { sanitize } from '@/utils/aux-methods.js';
import { DAY, WEEK, MONTH, YEAR } from '@/utils/unit-times-in-ms.js';

const { apiKey, url } = config;
const format = 'json';

/* API */
const getTopArtists = async (country) => {
  const url = buildApiUrl('geo.gettopartists', { 'country': country });

  const response = await fetch(url, { cache: 'default', localCache: WEEK * 2 });
  const json = await response.json();
  return Adapt.adaptArtists(checkMbids(json.topartists.artist));
};

const getArtistInfo = async (artist) => {
  const url = buildApiUrl('artist.getinfo', { 'artist': sanitize(artist) });

  const response = await fetch(url, { cache: 'default', localCache: MONTH });
  const json = await response.json();
  return Adapt.adaptArtists(json.artist);
};

const getArtistTopTags = async (artist, num) => {
  const url = buildApiUrl('artist.gettoptags', { 'artist': sanitize(artist) });

  const response = await fetch(url, { cache: 'default', localCache: MONTH * 6 });
  const json = await response.json();

  let tags = json.toptags.tag;
  return Adapt.adaptTags(num ? tags.slice(0, num) : tags);
};

const getArtistTopAlbums = async (artist) => {
  const url = buildApiUrl('artist.gettopalbums', { 'artist': sanitize(artist) });

  const response = await fetch(url, { cache: 'default', localCache: MONTH * 6 });
  const json = await response.json();

  let albums = json.topalbums.album;
  return Adapt.adaptAlbums(filterUndefined(albums));
};

const getArtistTopTracks = async (artist) => {
  const url = buildApiUrl('artist.gettoptracks', { 'artist': sanitize(artist), 'limit': 10 });

  const response = await fetch(url, { cache: 'default', localCache: WEEK * 2 });
  const json = await response.json();
  return Adapt.adaptTracks(json.toptracks.track);
};

const getAlbumInfo = async(artist, album) => {
  const url = buildApiUrl('album.getinfo', { 'artist': sanitize(artist), 'album': sanitize(album) } )

  const response = await fetch(url, { cache: 'default', localCache: MONTH * 6 });
  const json = await response.json();
  return Adapt.adaptAlbums(json.album);
}

const getTrackInfo = async (artist, track) => {
  const url = buildApiUrl('track.getinfo', { 'artist': sanitize(artist), 'track': sanitize(track) });

  const response = await fetch(url, { cache: 'default', localCache: YEAR });
  const json = await response.json();
  return Adapt.adaptTracks(json.track);
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

  const response = await fetch(url, { cache: 'default', localCache: DAY * 5 });
  const json = await response.json();
  return Adapt.adaptTracks(checkMbids(json.results.trackmatches.track));
};

const searchAlbum = async (search) => {
  const url = buildApiUrl('album.search', { 'album': search });

  const response = await fetch(url, { cache: 'default', localCache: DAY * 5 });
  const json = await response.json();
  return Adapt.adaptAlbums(checkMbids(filterUndefined(json.results.albummatches.album)));
};

const searchArtist = async (search) => {
  const url = buildApiUrl('artist.search', { 'artist': search });

  const response = await fetch(url, { cache: 'default', localCache: DAY * 5 });
  const json = await response.json();
  return Adapt.adaptArtists(checkMbids(sortWithoutImages(filterMbids(json.results.artistmatches.artist))));
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

const filterUndefined = (list) => {
  return list.filter(element => element.name && element.name !== '(null)' && element.name !== 'undefined');
}

const checkMbids = (list) => {
  list.filter(element => !element.mbid).forEach(element => {
    element.mbid = 'random:' + nanoid();
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
const album = { getAlbumInfo }
const track = { getTrackInfo };
const search = { getSearchFunction, searchTrack, searchAlbum, searchArtist };

export default { ...standalone, ...artist, ...album, ...track, ...search };
