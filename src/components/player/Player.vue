<template>
  <div class="player" :class="{ 'hidden': !hasSong }">
    <div class="player-image-wrapper">
      <img :src="imageSong" class="player-image">
    </div>

    <div class="player-title">
      <router-link class="player-title-artist" :to="{ name: 'Artist', params: { name: playing.artist } }">{{ playing.artist }}</router-link>
      <span class="player-title-track">{{ playing.track }}</span>
    </div>

    <div class="player-controls-panel">
      <ButtonsPanel :is-playing="isPlaying" @play="play" @pause="pause" />

      <div class="progress-bar-wrapper">
        <ProgressBar :time="time" :duration="duration" @changeTime="setPlayerTime" />
      </div>
    </div>

    <div class="player-sound-panel">
      <SoundControl @changeVolume="changeVolume" @mute="mute" @unmute="unmute" />
    </div>

    <div class="player-music-time">
      <Playlist />

      <div class="time-song">
        <SoundIcon :playing="isPlaying" />
        <TimeDuration :time="time" :duration="duration" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonsPanel from './ButtonsPanel.vue';
import ProgressBar from './ProgressBar.vue';
import Playlist from './Playlist.vue';
import SoundIcon from './SoundIcon.vue';
import TimeDuration from './TimeDuration.vue';
import SoundControl from './SoundControl.vue';

export default {
  name: 'Player',
  components: { ButtonsPanel, ProgressBar, Playlist, SoundIcon, TimeDuration, SoundControl },
  data () {
    return {
      time: 0,
      duration: 0,
      isPlaying: false,
      actual: null
    };
  },
  computed: {
    hasSong () {
      const hasSong = this.$store.getters.hasSong;

      if (hasSong) {
        this.$emit('show-player');
      }

      return hasSong;
    },
    playing () {
      return this.$store.getters.playing;
    },
    imageSong () {
      return this.$store.getters.imagePlaying;
    }
  },
  watch: {
    playing: function (playing) {
      if (!playing) {
        console.log('No song!');
        return;
      }

      if (this.actual !== playing.youtubeId) {
        this.load(playing.youtubeId);
      }
    }
  },
  mounted () {
    this.$youtube.player.setOnReadyEvent(() => {
      this.$bus.$emit('api-change-volume', this.$youtube.player.volume());
      this.$bus.$emit('api-change-mute', this.$youtube.player.muted());
    });

    this.$youtube.player.setCurrentTimeEvent((time) => {
      this.time = time;
    });

    this.$youtube.player.setEndSongEvent(() => {
      this.isPlaying = false;
      this.$store.dispatch('playNextSong');
    });
  },
  methods: {
    load (youtubeId) {
      this.actual = youtubeId;

      this.$youtube.player.load(youtubeId, true).then(() => {
        this.duration = this.$youtube.player.duration();
        this.isPlaying = true;

        const { track, artist } = this.playing;
        document.title = `${track} - ${artist} | Bruga Music`;
      });
    },
    play () {
      if (this.isPlaying) return;
      this.$youtube.player.play();
      this.isPlaying = true;
    },
    pause () {
      if (!this.isPlaying) return;
      this.$youtube.player.pause();
      this.isPlaying = false;
    },
    setPlayerTime (time) {
      this.$youtube.player.goTo(time);
      this.time = time;
    },
    changeVolume (volume) {
      this.$youtube.player.setVolume(volume);
    },
    mute () {
      this.$youtube.player.mute();
    },
    unmute () {
      this.$youtube.player.unmute();
    }
  }
};
</script>

<style lang="less">
@import (less, reference) "../../assets/styles/colors.less";

.player {
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  padding: 12px 50px;
  background-color: @color-white;
  box-shadow: 0 -1/4rem 1/8rem 0 @color-shadow;
  transition: transform 0.3s ease-in-out;
  transform: none;

  &.hidden {
    transform: translate3d(0, 90px, 0);
  }

  &::after {
    content: '';
    clear: both;
    display: table;
  }

  .player-image-wrapper {
    display: inline-block;
    float: left;
    vertical-align: middle;
    box-sizing: border-box;
    width: 60px;

    .player-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.10);
      background-color: #ccc;
      display: inline-block;
      object-fit: cover;
    }
  }

  .player-title {
    display: inline-block;
    text-align: left;
    float: left;
    padding-left: 20px;
    width: calc(35% - 60px);
    min-height: 5px;
    box-sizing: border-box;
    vertical-align: middle;

    .player-title-artist, .player-title-track {
      display: block;
      width: 100%;
      margin: 0;
      padding: 0;
      color: @color-gray;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .player-title-artist {
      font-family: "Roboto", sans-serif;
      font-size: 25px;
      font-weight: 800;

      &:hover {
        cursor: pointer;
      }
    }
    .player-title-track {
      font-family: "Open Sans", sans-serif;
      font-size: 21px;
      font-weight: 300;
    }
  }

  .player-controls-panel {
    display: inline-block;
    float: left;
    width: calc(35% - 72px);
    box-sizing: border-box;
    vertical-align: middle;

    .progress-bar-wrapper {
      display: block;
      width: 100%;
      padding: 0 5px;
      box-sizing: border-box;
    }
  }

  .player-sound-panel {
    display: inline-block;
    float: left;
    width: calc(30% - 100px);
    text-align: center;
    box-sizing: border-box;
    vertical-align: middle;
    margin-top: 10px;
  }

  .player-music-time {
    display: inline-flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;

    float: right;
    width: 172px;
    box-sizing: border-box;
    vertical-align: middle;
    margin-top: 8px;

    .time-song {
      margin-left: 20px;
    }
  }
}
</style>
