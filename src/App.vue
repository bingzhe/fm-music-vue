<template>
  <div id="app">
    <transition name="fade">
      <div class="fm-pane-min icon-music-b" v-if="isPaneShow" @click="paneShow"></div>
    </transition>
    <transition name="fade">
      <keep-alive>
        <router-view v-if="!isPaneShow" :is-show="isPaneShow" @on-close="paneShow"></router-view>
      </keep-alive>
    </transition>
  
  </div>
</template>

<script>
import Draggabilly from 'draggabilly'
// var Draggabilly = require('draggabilly');

export default {
  data() {
    return {
      isPaneShow: true
    }
  },
  computed: {

  },
  methods: {
    paneShow() {
      this.isPaneShow = !this.isPaneShow
    }
  },
  mounted() {
    // console.log(Drag)
    console.log($("#app"))
    // console.log(draggabilly)
    // $('.fm-pane-min').Drag()
    // var $draggable = $("#app").Draggabilly()
    var draggie = new Draggabilly('#app', {
      // options
    });
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
