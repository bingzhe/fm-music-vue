<template>
    <div id="fm-pane" class="clear">
        <!--返回键-->
        <div class="back close icon-back left" @click="closeMySelf"></div>
        <!-- 标题栏 -->
        <div class="title panel-handle">
            <p class="song-name">XXXXX</p>
            <p class="singer">XXX</p>
        </div>
        <!-- 频道栏 -->
        <div class="channels" @mouseenter="showChannel" @mouseleave ="hiddenChannel">
            <div class="channel-btn icon-menu" ></div>
            <transition name="fade">
                <ul class="channels-list" v-if="isChannelShow" @mouseleave ="hiddenChannel">
                    <li class="list-selected">1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                    <li>1111111111</li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    propts: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    components: {

    },
    data () {
        return {
            isChannelShow: false
        }
    },
    computed:{

    },
    methods: {
        closeMySelf (){
            this.$emit("on-close")
        },
        showChannel (){
            this.isChannelShow = true
        },
        hiddenChannel (){
            this.isChannelShow = false
        }
    }
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
        @include wh(30px,30px);
        @include fc(20px,#eee);
        font-family: iconfont;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    } 
    
    // 标题栏
    .title {
        position: absolute;
        @include tl(10px,50px);
        @include wh(200px,40px);
        text-align: left;
        border-bottom: 1px solid rgba(221, 221, 221, 0.5);
        letter-spacing: 1px;
        overflow: hidden;
        box-sizing: border-box;

        .song-name {
            line-height: 20px;
            @include fc(13px, #fff);
        }

        .singer {
            line-height: 15px;
            @include fc(13px, #aaa);
        }
    }

    //频道分类
    .channels{
        position: absolute;
        @include tl(15px, 260px);
        z-index: 100;

        .channel-btn{
            @include wh(30px, 30px);
            @include fc(25px, #fff);
            text-align: center;
            line-height: 30px;
            font-family: 'iconfont';
            cursor: pointer;
        }

        .channels-list{
            @include wh(110px, 328px);
            margin-top: 10px;
            padding: 8px 0;
            background-color: #fff;
            box-shadow: 2px 0px 2px #888;
            overflow: auto;
            border-top: 8px solid #fff;
            border-bottom: 8px solid #fff;
            box-sizing: border-box;


            li {
                position: relative;
                text-align: center;
                line-height: 30px;
                font-size: 13px;
                cursor: pointer;
            }

            li:hover {
                background-color: #db4437;
                color: #fff;
            }

            .list-selected:before {
                content: '';
                display: block;
                position: absolute;
                @include tl(0px, 0px);
                @include wh(5px, 30px);
                background-color: #db4437;
            }
        }
    }   
    
}
</style>

