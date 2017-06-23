<template>
    <div id="progress" class="clearfix">
        <div class="time current-time">0:00</div>
        <div class="time full-time">0:00</div>
        <div class="progress-bar">
            <div class="progress-pathway">
                <div class="progress-line">
                </div>
    
                <div class="progress-handle"></div>
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

            .progress-line {
                position: absolute;
                left: 0px;
                @include wh(2px, 0px);
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


