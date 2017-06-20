<template>
  <div id="app">
    <div class="fm-pane-min icon-music-b" v-if="show"></div>
    <router-view v-if="show"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  name: 'app'
}
</script>
 
<style lang="scss">
@import './style/common.scss';
@import './style/iconfont/iconfont.css';

#app {
  position: absolute;
  top: 130px;
  left: 150px;

  .fm-pane-min {
    position: absolute;
    @include tl(10px, -50px);
    @include wh(30px, 30px);
    @include fc(20px, rgba(170, 170, 170, 0.5));
    border-radius: 15px;
    text-align: center;
    line-height: 32px;
    font-family: iconfont;
    background-color: #000;
    cursor: pointer;
  }
}
</style>s
