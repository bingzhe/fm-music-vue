<template>
    <div id="lyric">
        <div class="lyric-ct">
            <transition name="topScroll">
                <div class="lyric-box" :class="classObj" :style="{top: top + 'px'}">
                    <p v-for="(item, index) in lyricArr" :key="item.id" :class="{'light-lyric': isLight == index}"> {{ item }}</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        lyricSid: {
            type: Number | String
            // default: {},
        },
        progressObj: {
            type: Object
        }
    },

    data() {
        return {
            Lyric: '',
            classObj: {
                'active': true,
                'class-a': true
            },
            lyricArr: [],   //歌词数组
            lyricTimeArr: [],  //时间数组
            top: 80,
            currentTimeSec: 0,
            isLight: 0
        }
    },

    watch: {
        //父组件传过来的lyricSid值改变的时候，重置歌词
        lyricSid: function () {
            this.lyricReset(this.lyricSid)
        },
        progressObj: {
            handler: function () {
                this.currentTimeSec = Math.round(this.progressObj.currentTimeSec)
                this.lyricBoxMove(this.currentTimeSec)
            },
            deep: true
        }


    },
    methods: {
        //重置歌词
        lyricReset(sidstr) {
            $.post('http://api.jirengu.com/fm/getLyric.php', {
                sid: sidstr
            })
                .done((data) => {

                    this.Lyric = JSON.parse(data).lyric
                    this.lyricFormat(this.Lyric)

                })
                .fail((err) => {
                    console.log(err)
                })
        },
        //处理歌词
        lyricFormat(str) {
            this.lyricArr = []
            this.lyricTimeArr = []
            let lyArr = str.split('\n')
            let reg1 = /^\[ti:/
            let reg2 = /^\[ar:/
            let reg3 = /^\[al:/
            let reg4 = /^\[by:/
            let lyric

            for (let i = 0; i < lyArr.length; i++) {

                if (reg1.test(lyArr[i]) || reg2.test(lyArr[i]) || reg3.test(lyArr[i]) || reg4.test(lyArr[i])) {
                    lyric = '-'
                } else {
                    lyric = lyArr[i].slice(10)
                }

                if (!lyric) {
                    lyric = '-'
                }


                this.lyricArr.push(lyric)

                this.lyricTimeFormat(lyArr[i])

            }
            this.lyricArr.shift()
            this.lyricArr.unshift('音乐来自百度FM')

        },
        //处理时间
        lyricTimeFormat(str) {
            let min = Number(str.slice(1, 3))
            let sec = min * 60 + Number(str.slice(4, 6))

            this.lyricTimeArr.push(sec)

        },
        //歌词滚动
        lyricBoxMove(num) {
            for (let i = 1; i < this.lyricTimeArr.length; i++) {
                if (num === this.lyricTimeArr[i]) {
                    this.top = 80 - i * 40
                    this.isLight = i
                }
            }
        }
    },
    beforeUpdate() {

    },
    mounted() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../style/common.scss';
@import '../style/iconfont/iconfont.css';

#lyric {
    position: absolute;
    @include tl(60px, 0px);
    @include wh(300px, 240px);
    z-index: 99;

    .lyric-ct {
        position: absolute;
        @include tl(20px, 0px);
        @include wh(300px, 200px);
        overflow: hidden;

        .lyric-box {
            position: absolute;
            @include tl(80px, 0px);
            width: 300px;
            font-family: Arial, '微软雅黑';
            text-align: center;
            font-size: 14px;
            line-height: 40px;
            overflow: hidden;
            color: rgba(170, 170, 170, 0.7);

            .light-lyric {
                color: #fff;
            }
        }
    }
}
</style>
