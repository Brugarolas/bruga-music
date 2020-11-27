import fetch from '@/api/utils/fetch-cache.js';
import { WEEK } from '@/utils/unit-times-in-ms.js';
import Player from './player.js';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyC06v4WdyeLlP0tHM7FyMyESHEHIvISCLU';

/* API */
const search = async (query) => {
  const url = buildQueryUrl(query);

  const response = await fetch(url, { cache: 'default', localCache: WEEK * 2 });
  const json = await response.json();

  return json.items;
};

/* AUX API Methods */
const buildQueryUrl = (query) => buildUrl(BASE_URL, { part: 'snippet', key: API_KEY, q: query, maxResults: 5 });

const buildUrl = (url, params) => `${url}?${paramsToUrl(params)}`;

const paramsToUrl = (params = {}) => Object.entries(params).map((param) => paramToUrl(...param)).join('&');

const paramToUrl = (name, value) => name + (value ? '=' + value : '');

/* Exports */
export default { search, Player };
