<template>
    <div id="fm-pane" class="clear">
        <!--返回键-->
        <div class="back close icon-back left"></div>
        <!-- 标题栏 -->
        <div class="title panel-handle">
            <p class="song-name">XXXXX</p>
            <p class="singer">XXX</p>
        </div>
        <!-- 频道栏 -->
        <div class="channels">
            <div class="channel-btn icon-menu"></div>
            <ul class="channels-list">
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../style/common.scss';
@import '../style/iconfont/iconfont.css';

#fm-pane {
    @include wh(300px, 480px);
    background-color: rgba(51, 51, 51, 0.79);
    background: url('../assets/background.jpg') no-repeat center center;

    /*返回按钮*/
    .back {
        margin-left: 10px;
        margin-top: 15px;
        @include wh(30px,
        30px);
        @include fc(20px,
        #eee);
        font-family: iconfont;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    } // 标题栏
    .title {
        position: absolute;
        @include tl(10px, 50px);
        @include hw(40px, 20px);
        text-align: left;


        border-bottom: 1px solid rgba(221, 221, 221, 0.5);
        letter-spacing: 1px;
        overflow: hidden;
        box-sizing: border-box;
    }
}
</style>

