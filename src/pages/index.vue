<template>
    <div id="fm-pane" class="clear">
        <audio id="music" :src="musicUrl" autoplay @playing="audioPlay" @pause="audioPause" @durationchange="getMusicFullTime" @ended="nextSong"></audio>
        <!--返回键-->
        <div class="back close icon-back left" @click="closeMySelf"></div>
        <!-- 标题栏 -->
        <div class="title panel-handle">
            <p class="song-name">{{ songName }}</p>
            <p class="singer">{{ songer }}</p>
        </div>
        <!-- 频道栏 -->
        <div class="channels" @mouseenter="showChannel" @mouseleave="hiddenChannel">
            <div class="channel-btn" :class="{'icon-menu': isMenu, 'icon-minus': !isMenu}"></div>
            <transition name="fade">
                <ul class="channels-list" v-if="isChannelShow" @mouseleave="hiddenChannel">
                    <li :class="{'list-selected': isListSelected === index}" v-for="(item, index) in channelsList" :key="item.id" @click="addClassSelect(index)" :channel-id="item.channel_id">{{ item.name }}</li>
                </ul>
            </transition>
        </div>
    
        <!--黑胶圆盘，歌词-->
        <transition name="fade">
            <keep-alive>
                <router-view :picture-url="this.picture" :lyric-sid="this.sid" :is-play="this.isPlay" :progress-obj="this.progressObj"></router-view>
            </keep-alive>
        </transition>
    
        <!-- 歌词显示按钮 -->
        <router-link :to="this.$route.path === '/rotate' ? '/lyric': '/rotate'" class="lyric-btn icon-lyric" :class="{ 'lyric-btn-active': this.$route.path === '/rotate' ? false : true}" title="歌词显示"></router-link>
    
        <!-- 音量控制 -->
        <volume-ctrl @on-change="changeVolume($event)"></volume-ctrl>
    
        <!--进度条-->
        <progress-ctrl :progress-obj="this.progressObj" @on-change="setMusicCurrentTime($event)" @on-pause="pauseMusic" @on-play="playMusic"></progress-ctrl>
    
        <!--  播放控制  -->
        <div id="control">
            <div class="prev icon-prev" @click="prevSong"></div>
            <div class="next icon-next" @click="nextSong"></div>
            <div class="on-off play" :class="isPlay ? 'icon-start1': 'icon-stop'" @click="isPlayStop"></div>
        </div>
    </div>
</template>

<script>
import volumeCtrl from '../components/volume'
import progressCtrl from '../components/progress'


export default {
    props: {
        isShow: {
            type: Boolean,
            default: false,
        }
    },
    components: {
        volumeCtrl,
        progressCtrl
    },
    data() {
        return {
            isChannelShow: false,
            isMenu: true,  //class icon-menu判断
            isListSelected: '',
            channelsList: [],  //存放音乐频道分类
            song: {},
            songArr: [],
            channelId: 'public_tuijian_spring', //频道ID
            songName: '', //歌曲名
            songer: '', //歌手
            musicUrl: '',  //歌曲地址
            picture: './static/img/timg4.e4aa80f.jpg', //图片
            lyric: '',  //歌词地址
            sid: '',
            // lyricObj: {},
            isPlay: false, //暂停切换判断
            progressObj: {},
            fullTimeSec: 0,  //音频长度
            currentTimeSec: 0,  // 当前播放位置
            clock: {}
        }
    },
    computed: {

    },
    methods: {
        closeMySelf() {
            this.$emit("on-close")
        },
        showChannel() {
            this.isChannelShow = true
            this.isMenu = false
        },
        hiddenChannel() {
            this.isChannelShow = false
            this.isMenu = true
        },
        addClassSelect(index) {
            this.isListSelected = index
            this.channelId = $('.list-selected').attr('channel-id')
            this.getAndReset(this.channelId);
        },


        // 请求拿到音乐频道列表
        getChannelList() {
            this.$http({
                methods: 'get',
                url: 'http://api.jirengu.com/fm/getChannels.php'
            })
                .then((response) => {
                    this.channelsList = response.data.channels
                })
                .catch((error) => {
                    console.log(error)
                })
        },


        // 请求歌曲
        getAndReset(str) {
            $.get('http://api.jirengu.com/fm/getSong.php', {
                channel: str
            })
                .done((data) => {
                    this.song = JSON.parse(data).song[0]
                    this.songArr.push(this.song)
                    this.songReset(this.song) //重置歌曲
                    clearInterval(this.clock)
                })
                .fail((err) => {
                    console.log(err)
                })
        },


        //歌曲重置
        songReset(song) {
            let audio = document.getElementById('music')


            this.musicUrl = song.url
            audio.load()   // 重新加载音频元素
            this.songName = song.title
            this.songer = song.artist
            this.picture = song.picture
            this.sid = song.sid
            // this.lyricObj.lyric = song.lrc
            // this.lyricObj.sid = song.sid



        },
        //获取音频长度
        getMusicFullTime() {
            let audio = document.getElementById('music')

            this.progressObj = Object.assign({}, this.progressObj, { fullTimeSec: audio.duration })

        },
        //设置跳转的播放进度
        setMusicCurrentTime(val) {
            let audio = document.getElementById('music')

            audio.currentTime = val
        },

        //点击暂停播放
        isPlayStop() {
            let audio = document.getElementById('music')

            if (!this.isPlay) {
                audio.pause()
            } else {
                audio.play()
            }

            this.isPlay = !this.isPlay
        },
        //暂停 
        pauseMusic() {
            let audio = document.getElementById('music')
            clearInterval(this.clock)
            this.isPlay = true   //暂停歌曲
            audio.pause()
        },
        playMusic() {
            let audio = document.getElementById('music')
            this.isPlay = false
            audio.play()
        },
        //下一曲
        nextSong() {
            this.pauseMusic()
            this.getAndReset(this.channelId)
        },

        //开始播放
        audioPlay() {
            let audio = document.getElementById('music')
            //开始播放时黑胶开始转动
            this.isPlay = false
            //添加计时器,每隔一秒获取一次当前播放位置
            this.clock = setInterval(() => {
                this.progressObj = Object.assign({}, this.progressObj, { currentTimeSec: audio.currentTime })
            }, 1000)
        },

        //暂停
        audioPause() {
            //清除计时器
            clearInterval(this.clock)
        },



        //上一曲
        prevSong() {
            let audio = document.getElementById('music')
            
            if (this.songArr.length > 1) {
                clearInterval(this.clock)
                this.isPlay = true   //暂停歌曲
                audio.pause()

                this.songArr.pop()
                this.songReset(this.songArr[this.songArr.length - 1])
            }
        },

        //音量大小切换
        changeVolume(val) {
            let audio = document.getElementById('music')
            audio.volume = val / 100
        }

    },
    mounted() {
        this.getChannelList()
        this.getAndReset(this.channelId)
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
        @include tl(10px,
        50px);
        @include wh(200px,
        40px);
        text-align: left;
        border-bottom: 1px solid rgba(221, 221, 221, 0.5);
        letter-spacing: 1px;
        overflow: hidden;
        box-sizing: border-box;

        .song-name {
            line-height: 20px;
            @include fc(13px,
            #fff);
        }

        .singer {
            line-height: 15px;
            @include fc(13px,
            #aaa);
        }
    } //频道分类
    .channels {
        position: absolute;
        @include tl(15px,
        260px);
        z-index: 100;

        .channel-btn {
            @include wh(30px,
            30px);
            @include fc(25px,
            #fff);
            text-align: center;
            line-height: 30px;
            font-family: 'iconfont';
            cursor: pointer;
        }

        .channels-list {
            @include wh(110px,
            328px);
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
                @include tl(0px,
                0px);
                @include wh(5px,
                30px);
                background-color: #db4437;
            }
        }
    }

    .lyric-btn {
        position: absolute;
        right: 55px;
        bottom: 130px;
        height: 16px;
        width: 16px;
        line-height: 16px;
        text-align: center;
        font-family: iconfont;
        font-size: 16px;
        color: rgba(170, 170, 170, 0.7);
        cursor: pointer;
    }
    .lyric-btn-active {
        color: rgb(219, 68, 55);
    }

    #control {
        position: absolute;
        bottom: 0;
        left: 60px;
        @include wh(180px,
        100px);
        font-family: 'iconfont';
        color: #fff;

        .prev {
            float: left;
            margin: 30px 0;
            @include wh(40px,
            40px);
            text-align: center;
            line-height: 40px;
            font-size: 17px;
            border: 1px solid #fff;
            border-radius: 20px;
            box-sizing: border-box;
            cursor: pointer;
            font-family: 'iconfont';
            color: #fff;
        }
        .next {
            float: right;
            margin: 30px 0;
            @include wh(40px,
            40px);
            text-align: center;
            line-height: 40px;
            font-size: 17px;
            border: 1px solid #fff;
            border-radius: 20px;
            box-sizing: border-box;
            cursor: pointer;
            font-family: 'iconfont';
            color: #fff;
        }
        .on-off {
            margin: 23px 63px;
            @include wh(54px,
            54px);
            text-align: center;
            line-height: 54px;
            font-size: 25px;
            border: 1px solid #fff;
            border-radius: 27px;
            box-sizing: border-box;
            cursor: pointer;
            font-family: 'iconfont';
            color: #fff;
        }
    }
}
</style>

