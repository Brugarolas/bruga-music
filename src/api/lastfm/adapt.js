/*
 * Hacky solution after Last.FM prohibited artist image usage
 * @see https://getsatisfaction.com/lastfm/topics/api-announcement-dac8oefw5vrxq
 */
const LASTFM_API_RESTRICTS_IMAGES = true;
const IMAGE_SIZES = {
  small: 34,
  medium: 64,
  large: 174,
  extralarge: 240,
  mega: 300
};

const bingImage = (name, size) => {
  const imageSize = IMAGE_SIZES[size] || 200;

  return `https://tse2.mm.bing.net/th?q=${name}+spotify&w=${imageSize}&h=${imageSize}&c=7&rs=1&p=0&dpr=1&pid=1.7&mkt=en-US&adlt=on`;
};

const findImageArtistSecure = (item, size) => {
  if (LASTFM_API_RESTRICTS_IMAGES) {
    return bingImage(item.name, size);
  }

  return findImage(item.image, size);
};

const findImageTrackSecure = (item, size) => {
  if (LASTFM_API_RESTRICTS_IMAGES) {
    return bingImage(getNameFromArtist(item.artist), size);
  }

  return findImage(item.image, size);
};

/* Aux funcs */
const findImage = (imageArray, size) => {
  const selected = imageArray.find(image => image.size === size) || imageArray[imageArray.length - 1];

  return selected['#text'];
};

const getNameFromArtist = (artist) => {
  if (typeof artist === 'string') {
    return artist;
  }
  return artist.name;
};

/* Adapt funcs */
const artistsArray = (artists) => {
  return artists.map(artist => {
    const item = {
      name: artist.name,
      image: findImageArtistSecure(artist, 'large')
    };

    if (artist.mbid) {
      item.mbid = artist.mbid;
    }

    return item;
  });
};

const artistDetail = (artist) => {
  const detail = {
    name: artist.name,
    stats: artist.stats,
    image: findImageArtistSecure(artist, 'mega'),
    moreLink: artist.url
  };

  if (artist.bio && (artist.bio.summary || artist.bio.content)) {
    const bio = artist.bio.summary || artist.bio.content;
    const index = bio.indexOf(' <a');

    detail.biography = bio.substring(0, index);
  }

  if (artist.similar && artist.similar.artist) {
    detail.similar = artistsArray(artist.similar.artist);
  }

  if (artist.tags && artist.tags.tag) {
    detail.tags = adaptTags(artist.tags.tag);
  }

  return detail;
};

const albumsArray = (albums) => {
  return albums.map(album => ({
    name: album.name,
    artist: getNameFromArtist(album.artist),
    image: findImage(album.image, 'large')
  }));
};

const albumDetail = (album) => {
  const detail = {
    mbid: album.mbid,
    name: album.name,
    artist: album.artist,
    image: findImage(album.image, 'mega'),
    stats: { listeners: album.listeners, playcount: album.playcount },
    moreLink: album.url
  };

  if (album.tags && album.tags.tag) {
    detail.tags = adaptTags(album.tags.tag);
  }

  if (album.tracks && album.tracks.track) {
    detail.tracks = tracksArray(album.tracks.track, findImage(album.image, 'medium'));
  }

  if (album.wiki && (album.wiki.summary || album.wiki.content)) {
    const bio = album.wiki.summary || album.wiki.bio.content;
    const index = bio.indexOf(' <a');

    detail.wiki = bio.substring(0, index);
  }

  return detail;
};

const tracksArray = (tracks) => {
  return tracks.map(track => ({
    mbid: track.mbid,
    artist: getNameFromArtist(track.artist),
    name: track.name,
    image: findImageTrackSecure(track, 'medium')
  }));
};

const trackDetail = (track) => {
  // TODO
  console.log(track);

  return track;
};

/* Public API */
const adaptArtists = (artists) => {
  return Array.isArray(artists) ? artistsArray(artists) : artistDetail(artists);
};

const adaptAlbums = (albums) => {
  return Array.isArray(albums) ? albumsArray(albums) : albumDetail(albums);
};

const adaptTracks = (tracks) => {
  return Array.isArray(tracks) ? tracksArray(tracks) : trackDetail(tracks);
};

const adaptTags = (tags) => {
  return tags.map(tag => ({ name: tag.name }));
};

export default { adaptArtists, adaptAlbums, adaptTracks, adaptTags };
