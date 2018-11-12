<template>
  <div class="player">
    <div class="player-image-wrapper">
      <img :src="imagePlaying" class="player-image">
    </div>

    <div class="player-title">
      <span class="artist">{{ playing.artist }}</span>
      <span class="track">{{ playing.track }}</span>
    </div>

    <div class="player-controls-panel">
      <div class="buttons-panel">
        <i v-if="!isPlaying" class="play-pause-button fas fa-play" @click="play" />
        <i v-if="isPlaying" class="play-pause-button fas fa-pause" @click="pause" />
      </div>

      <div class="progress-bar-wrapper">
        <ProgressBar :time="time" :duration="duration" @changeTime="setPlayerTime" />
      </div>
    </div>

    <div class="player-sound-panel">
      <SoundControl @changeVolume="changeVolume" @mute="mute" @unmute="unmute" />
    </div>

    <div class="player-music-time">
      <SoundIcon :playing="isPlaying" />

      <TimeDuration :time="time" :duration="duration" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProgressBar from './ProgressBar.vue';
import SoundIcon from './SoundIcon.vue';
import TimeDuration from './TimeDuration.vue';
import SoundControl from './SoundControl.vue';

export default {
  name: 'Player',
  components: { ProgressBar, SoundIcon, TimeDuration, SoundControl },
  data () {
    return {
      time: 0,
      duration: 0,
      isPlaying: false
    };
  },
  computed: {
    ...mapGetters(['playing', 'imagePlaying'])
  },
  watch: {
    playing: function (val) {
      this.$youtube.player.load(this.playing.youtubeId, true).then(() => {
        this.duration = this.$youtube.player.duration();
        this.isPlaying = true;
      });
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
    });
  },
  methods: {
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
  height: 60px;
  width: 100%;
  box-sizing: border-box;

  &::after {
    content: '';
    clear: both;
    display: table;
  }
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

  .artist, .track {
    width: 100%;
    margin: 0;
    padding: 0;
    display: block;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist {
    font-family: "Roboto", sans-serif;
    font-size: 25px;
    font-weight: 800;
  }
  .track {
    font-family: "Open Sans", sans-serif;
    font-size: 21px;
    font-weight: 300;
  }
}

.player-controls-panel {
  display: inline-block;
  float: left;
  width: 30%;
  box-sizing: border-box;
  vertical-align: middle;

  .buttons-panel {
    display: block;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    line-height: 24px;
    font-size: 28px;

    .play-pause-button  {
      cursor: pointer;
      color: @color-light-letter;
      transition: all 0.3s ease-in-out;
    }

    .play-pause-button:hover {
      color: @color-letter;
    }
  }

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
  width: 25%;
  text-align: center;
  box-sizing: border-box;
  vertical-align: middle;
  margin-top: 10px;
}

.player-music-time {
  display: inline-block;
  float: right;
  width: 10%;
  box-sizing: border-box;
  vertical-align: middle;
  margin-top: 8px;
}
</style>
