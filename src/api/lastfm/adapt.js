/* Aux funcs */
const findImage = (imageArray, size) => {
  const selected = imageArray.find(image => image.size === size) || imageArray[imageArray.length - 1];

  return selected['#text'];
};

const getNameFromArtist = (track) => {
  if (typeof track.artist === 'string') {
    return track.artist;
  }
  return track.artist.name;
};

/* Adapt funcs */
const artistsArray = (artists) => {
  return artists.map(artist => {
    const item = {
      name: artist.name,
      image: findImage(artist.image, 'large')
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
    image: findImage(artist.image, 'mega'),
    moreLink: artist.url
  };

  if (artist.bio && (artist.bio.summary || artist.bio.content)) {
    let bio = artist.bio.summary || artist.bio.content;
    let index = bio.indexOf(' <a');

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
    artist: album.artist.name,
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
    let bio = album.wiki.summary || album.wiki.bio.content;
    let index = bio.indexOf(' <a');

    detail.wiki = bio.substring(0, index);
  }

  return detail;
};

const tracksArray = (tracks, image) => {
  return tracks.map(track => ({
    mbid: track.mbid,
    artist: getNameFromArtist(track),
    name: track.name,
    image: image || findImage(track.image, 'medium')
  }));
};

const trackDetail = (track) => {
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
