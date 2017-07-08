<template>
    <div id="volume" class="clearfix">
        <div class="volume-button" :class="volumeOn ? 'icon-volume-on' : 'icon-volume-off'" @click="mute"></div>
        <div class="volume-bar">
            <div class="volume-pathway" @click="clickCtrl($event)">
                <div class="volume-line" :style="{width: width + 'px'}">
                </div>
    
                <div class="volume-handle" @click="stopBubble($event)"></div>
            </div>
        </div>
    </div>
</template>


<script>
import Draggabilly from 'draggabilly'


export default {
    props: {

    },
    data() {
        return {
            width: 100,
            volumeOn: true,
            drag: {}
        }
    },
    watch: {
        width: function() {
            this.$emit('on-change', this.width)
        }
    },
    methods: {
        // 拖动控制播放进度
        dragMove() {
            this.drag.on('dragMove', () => {
                this.width = this.drag.position.x
                if (this.width === 0) {
                    this.volumeOn = false
                } else {
                    this.volumeOn = true
                }
            })
        },
        //点击控制进度
        clickCtrl(event) {
            this.width = event.offsetX
            let $volumeHandle = $('.volume-handle').css('left', this.width + 'px')

            if (this.width === 0) {
                this.volumeOn = false
            } else {
                this.volumeOn = true
            }
            //设置正确的播放时间

        },
        //点击静音/取消静音效果
        mute() {  //mute 静音键
            if (this.volumeOn) {
                this.width = 0
                this.volumeOn = false
                $('.volume-handle').css('left', this.width + 'px')
            } else {
                this.width = 100
                this.volumeOn = true
                $('.volume-handle').css('left', this.width + 'px')
            }
        },
        //阻止冒泡
        stopBubble(event) {
            //如果提供了事件对象，则这是一个非IE浏览器
            if (event && event.stopPropagation) {
                //因此它支持W3C的stopPropagation()方法
                event.stopPropagation()
            }
            else {
                //否则，我们需要使用IE的方式来取消事件冒泡
                window.event.cancelBubble = true
            }
        }
    },
    mounted() {
        this.drag = new Draggabilly('.volume-handle', {
            axis: 'x',  //拖动路径
            containment: '.volume-pathway'  //拖动范围
        })

        this.dragMove()
    }
}
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
@import '../style/iconfont/iconfont.css';

#volume {
    @include wh(150px, 14px);
    position: absolute;
    bottom: 130px;
    left: 45px;

    .volume-button {
        @include wh(14px, 14px);
        @include fc(12px, #ccc);
        line-height: 14px;
        text-align: center;
        font-family: 'iconfont';
        cursor: pointer;
    }

    .volume-bar {
        position: absolute;
        @include tl(1px, 21px);
        @include wh(106px, 12px);
        left: 21px;
        top: 1px;
        width: 106px;
        height: 12px;

        .volume-pathway {
            position: absolute;
            @include tl(5px, 0);
            @include wh(106px, 2px);
            border-radius: 1px;
            background-color: rgba(102, 102, 102, 0.6);
            cursor: pointer;

            .volume-line {
                @include wh(0px, 2px);
                border-radius: 1px 0 0 1px;
                background-color: rgba(255, 255, 255, 0.7);
            }

            .volume-handle {
                position: absolute;
                @include tl(0px, 100px);
                margin: -2px 0;
                @include wh(6px, 6px);
                border-radius: 3px;
                background-color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
            }
        }
    }
}
</style>

