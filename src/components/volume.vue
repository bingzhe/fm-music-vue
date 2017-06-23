<template>
    <div id="volume">
        <div class="volume-button icon-volume-on"></div>
        <div class="volume-bar">
            <div class="volume-pathway">
                <div class="volume-line">
                </div>
    
                <div class="volume-handle"></div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {

    },
    data() {
        return {

        }
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

            .volume-line {
                float: left;
                @include wh(100px, 2px);
                border-radius: 1px 0 0 1px;
                background-color: rgba(255, 255, 255, 0.7);
            }

            .volume-handle {
                position: relative;
                float: right;
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

