<template>
    <div id="lyric">
        <div class="lyric-ct">
            <div class="lyric-box" :class="classObj">
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
                <p>11111111111</p>
    
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        lyricObj: {
            type: Object,
            // default: {},
        }
    },
    data() {
        return {
            Lyric: '',
            classObj: {
                'active': true,
                'class-a': true
            }
        }
    },
    methods: {
        lyricReset(sidstr) {
            $.post('http://api.jirengu.com/fm/getLyric.php', {
                sid: sidstr
            })
                .done((data) => {
                    console.log(JSON.parse(data));
                    this.Lyric = JSON.parse(data).lyric
                })
        }
    },
    mounted(){
        this.lyricReset(this.lyricObj.sid)
        console.log(this.Lyric)
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
        }
    }
}
</style>
