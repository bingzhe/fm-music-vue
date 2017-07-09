<template>
    <div id="progress" class="clearfix">
        <div class="time current-time">0:00</div>
        <div class="time full-time">0:00</div>
        <div class="progress-bar" @click="clickCtrl($event)">
            <div class="progress-pathway">
                <div class="progress-line" :style="{width: width + 'px'}">
                </div>
    
                <div class="progress-handle" @click="stopBubble($event)"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Draggabilly from 'draggabilly'


export default {

    props: {
        progressObj: {
            type: Object
        }
    },
    data() {
        return {
            width: 0,
            // fullTimeSec,
            drag: {}
        }
    },
    watch: {
        width: function(){
            console.log(this.width)
            console.log(this.progressObj)
        },

        // progressObj.currentTimeSec: 
    },
    methods: {

        // 拖动控制播放进度
        dragMove() {
            this.drag.on('dragMove', () => {
                this.width = this.drag.position.x
            })
            this.drag.on('dragStart', () => {
                //播放暂停
            })
            this.drag.on('dragEnd', () => {
                //播放开始，计算正确的播放进度
            })
        },

        //点击控制进度
        clickCtrl(event) {
            this.width = event.offsetX
            let $progressHandle = $('.progress-handle').css('left', this.width + 'px')

            //设置正确的播放时间

        },

        //长度处理
        toLength(str) {
            let num = parseInt(str.replace('px', ''))
            return num
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
        this.drag = new Draggabilly('.progress-handle', {
            axis: 'x',
            containment: '.progress-pathway'
        })

        this.dragMove()

        


    }
}
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
@import '../style/iconfont/iconfont.css';

#progress {
    position: absolute;
    bottom: 100px;
    left: 14px;
    @include wh(272px, 14px);

    .time {
        position: absolute;
        @include wh(26px, 14px);
        @include fc(12px, #fff);
        font-family: Arial;
        line-height: 14px;
    }

    .full-time {
        right: 0;
        padding-left: 2px;
    }

    .current-time {
        padding-right: 2px;
    }

    .progress-bar {
        position: absolute;
        @include tl(3px, 32px);
        @include wh(208px, 8px);

        .progress-pathway {
            position: absolute;
            @include tl(3px, 0px);
            @include wh(208px, 2px);
            border-radius: 1px;
            background-color: rgba(102, 102, 102, 0.6);
            cursor: pointer;

            .progress-line {
                position: absolute;
                left: 0px;
                @include wh(0px, 2px);
                border-radius: 1px 0 0 1px;
                background-color: #db4437;
            }

            .progress-handle {
                position: absolute;
                float: left;
                margin: -3px 0;
                @include wh(8px, 8px);
                border-radius: 4px;
                background-color: #fff;
                box-shadow: 0 0 5px #fff;
                cursor: pointer;
            }
        }
    }
}
</style>


