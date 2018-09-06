import config from './config.js';
import HyperId from 'hyperid';
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
  const url = buildApiUrl('artist.getinfo', { 'artist': artist.replace(/ /g, '+') });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return json.artist;
};

const getArtistTopTags = async (artist) => {
  const url = buildApiUrl('artist.gettoptags', { 'artist': artist.replace(/ /g, '+') });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return json.toptags.tag;
};

const getArtistTopAlbums = async (artist) => {
  const url = buildApiUrl('artist.gettopalbums', { 'artist': artist.replace(/ /g, '+') });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return json.topalbums.album;
};

const getArtistTopTracks = async (artist) => {
  const url = buildApiUrl('artist.gettoptracks', { 'artist': artist.replace(/ /g, '+'), 'limit': 10 });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return json.toptracks.track;
};

const searchTrack = async (search) => {
  const url = buildApiUrl('track.search', { 'track': search });

  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  return checkMbids(json.results.trackmatches.track);
};

/* Aux methods */
const buildApiUrl = (method, params) => buildUrl(url, { 'method': method, ...params, 'api_key': apiKey, 'format': format });

const buildUrl = (url, params) => `${url}?${paramsToUrl(params)}`;

const paramsToUrl = (params = {}) => Object.entries(params).map((param) => paramToUrl(...param)).join('&');

const paramToUrl = (name, value) => name + (value ? '=' + value : '');

/* MBIDs */
const checkMbids = (list) => {
  list.filter(element => !element.mbid).forEach(element => {
    element.mbid = 'random:' + HyperId.instance();
  });
  return list;
};

/* Exports */
export default { getTopArtists, getArtistInfo, getArtistTopTags, getArtistTopAlbums, getArtistTopTracks, searchTrack };
