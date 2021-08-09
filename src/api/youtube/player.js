import loadYoutubePlayerWidget from './widget.js';
import disablePageVisibility from '@/utils/disable-page-visibility-api';

/* YouTube Player */

const YouTubeState = {
  None: -2,
  Unstarted: -1,
  Ended: 0,
  Playing: 1,
  Paused: 2,
  Buffering: 3,
  Cued: 5
};

// TODO remove
const YouTubeStatesReverted = [
  'None',
  'Unstarted',
  'Ended',
  'Playing',
  'Paused',
  'Buffering',
  'Unknown',
  'Cued'
];

class YouTubePlayer {
  constructor (player) {
    this._emptyResolve = () => { };
    this._resolve = () => { };
    this._resolveEvent = YouTubeState.None;

    this._currentTimeInterval = undefined;
    this._onReadyEvent = () => { };
    this._currentTimeEvent = () => { };
    this._endSongEvent = () => { };

    if (player !== undefined) this._setAPI(player);
  }

  /* Public API */

  load (videoId, autoplay = false) {
    return this._loadAPI().then(() => {
      return new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._resolveEvent = autoplay ? YouTubeState.Playing : YouTubeState.Cued;

        const loadVideo = autoplay ? this._player.loadVideoById : this._player.cueVideoById;
        loadVideo.bind(this._player)(videoId, 0, 'large');
      });
    });
  }

  play () {
    this._player.playVideo();
  }

  pause () {
    this._player.pauseVideo();
  }

  stop () {
    this._player.stopVideo();
  }

  goTo (time) {
    this._player.seekTo(time, true);
  }

  setVolume (volume) {
    this._player.setVolume(volume * 100);
  }

  mute () {
    this._player.mute();
  }

  unmute () {
    this._player.unMute();
  }

  muted () {
    return this._player.isMuted();
  }

  volume () {
    return this._player.getVolume() / 100;
  }

  duration () {
    return this._player.getDuration();
  }

  setEndSongEvent (event) {
    this._endSongEvent = event;
  }

  setCurrentTimeEvent (event) {
    this._currentTimeEvent = event;
  }

  setOnReadyEvent (event) {
    this._onReadyEvent = event;
    if (this._player !== undefined) this._onReadyEvent();
  }

  /* Hidden API */

  _loadAPI () {
    if (this._player) {
      return Promise.resolve();
    }

    // Disable page visibility API so YouTube don't stop playing when minimized on mobile devices
    disablePageVisibility();

    return loadYoutubePlayerWidget().then(apiPlayer => {
      this._setAPI(apiPlayer);
    });
  }

  _setAPI (player) {
    this._player = player;
    this._player.addEventListener('onReady', this._emptyResolve.bind(this));
    this._player.addEventListener('onStateChange', this._onStateChange.bind(this));

    this._onReadyEvent();
  }

  _onStateChange (state) {
    // TODO delete, is testing
    const infoContainer = document.getElementById('log-messages');
    const infoElement = document.createElement('div');
    const mainInfo = document.createElement('h3');
    const logInfo = document.createElement('p');

    mainInfo.textContent = `${state.data} - ${YouTubeStatesReverted[state.data + 2]}`;
    logInfo.textContent = JSON.stringify(state).replace(/\"/g, '\''); // eslint-disable-line no-useless-escape

    infoElement.appendChild(mainInfo);
    infoElement.appendChild(logInfo);
    infoElement.appendChild(document.createElement('br'));

    infoContainer.appendChild(infoElement);

    console.log(mainInfo.textContent);

    // Real
    if (state.data === this._resolveEvent) {
      this._resolve();
      this._resetResolve();
    }

    if (state.data === YouTubeState.Playing) {
      this._startCurrentTimeEvents();
    } else {
      this._endCurrentTimeEvents();
      this._emitCurrentTimeEvent();
    }

    if (state.data === YouTubeState.Ended) {
      this._endSongEvent();
    }
  }

  _emitCurrentTimeEvent () {
    this._currentTimeEvent(this._player.getCurrentTime());
  }

  _startCurrentTimeEvents () {
    this._currentTimeInterval = setInterval(this._emitCurrentTimeEvent.bind(this), 200);
  }

  _endCurrentTimeEvents () {
    if (this._currentTimeInterval === undefined) return;

    clearInterval(this._currentTimeInterval);
    this._currentTimeInterval = undefined;
  }

  _resetResolve () {
    this._resolve = this._emptyResolve;
    this._resolveEvent = YouTubeState.None;
  }
}

// Exports
export default YouTubePlayer;
