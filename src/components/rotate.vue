<template>
  <div id="rotate">
    <div class="needle needle-pause" :class="{ 'needle-play': !isPlay}"></div>
    <div class="disco" :class="{'disco-play': !isPlay}">
      <div class="cover" :style="{ backgroundImage: 'url('+ pictureUrl +')'}"></div>
      <div class="current-cover"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pictureUrl: {
      type: String,
      // default: 'www.ranzhouli.cn/fmvue/static/img/timg4.e4aa80f.jpg',
    },
    // lyricObj: {
    //   type: Object,
    //   // default: {}
    // },
    isPlay: {
      type: Boolean
    }
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../style/common.scss';
@import '../style/iconfont/iconfont.css';

#rotate {
  position: absolute;
  @include tl(50px, 0px);
  @include wh(300px, 240px);
  overflow: hidden;

  .needle {
    position: absolute;
    @include tl(-3px, 140px);
    @include wh(60px, 88px);
    background: url(../assets/needle.png) no-repeat center center;
    background-size: cover;
    z-index: 8;
    transition: 0.5s;
    -webkit-transform: rotate(-25deg);
    -moz-transform: rotate(-25deg);
    -webkit-transform-origin: 12px 0;
    -moz-transform-origin: 12px 0;
  }
  .needle-play {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }

  .disco {
    position: absolute;
    @include tl(50%, 50%);
    @include wh(200px, 200px);
    margin-top: -80px;
    margin-left: -100px;
    -webkit-transform-origin: center center;
    -moz-transform-origin: center center;
    background: url(../assets/disc-ip6.png) no-repeat center center;
    background-size: cover;

    .cover {
      position: absolute;
      @include tl(50%, 50%);
      @include wh(126px, 126px);
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      background: url(../assets/timg4.jpg) no-repeat center center;
      background-size: cover;
      border-radius: 63px;
    }

    .current-cover {
      position: absolute;
      @include tl(50%, 50%);
      @include wh(126px, 126px);
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      border-radius: 63px;
    }
  }

  .disco-play {
    animation: rotate 25s linear;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }
}
</style>
