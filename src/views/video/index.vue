<template>
  <div class="video">
    <video
      width="100%"
      height="100%"
      ref="videoPlayer"
      preload="auto"
      autoplay
      controls
      class="video-js vjs-default-skin vjs-big-play-centered"
    >
      <source
        src="http://oa.talentinfo.com.cn:8085/VodStreamService/talent_vod.asmx/Vod?cmd=play&fileid=2745"
        type="video/mp4"
      />
    </video>
    <button @click="handlePause">1212</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = this.$video(this.$refs.videoPlayer);
    // 设置标点
    this.player.markers({
      markerStyle: {
        "border-radius": "50%",
      },
      markerTip: {
        display: true,
        text: function (marker) {
          return marker.text;
        },
      },
      markers: [
        {
          time: 5,
          text: "开始",
          class: "white-marker-class",
        },
        {
          time: 7,
          text: "结束",
          class: "custom-marker-class",
        },
      ],
    });
  },
  methods: {
    handlePause() {
      this.$refs.videoPlayer.pause();
    },
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style>
.video {
  width: 1000px;
  height: 500px;
}
.video-js {
  width: 100%;
  height: 100%;
}
.white-marker-class {
  width: 0.125rem !important;
  height: 0.625rem !important;
  background-color: aqua !important;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}
.custom-marker-class {
  width: 0.125rem !important;
  height: 0.625rem !important;
  background-color: red !important;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>
