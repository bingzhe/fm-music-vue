<template>
    <div id="lyric">
        <div class="lyric-ct">
            <div class="lyric-box">
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
