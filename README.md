# fm-music-vue

> 之前写过一个FMmusic播放器，有空的时间有用vue.js重新写了一遍,练习一下vue

### 技术栈

> vue2 + vue-router + webpack + ES6 + sass等

主要是练手，所以就尽可能的搞的比较复杂，还有用到一些其他的库，整个项目也尽可能多的拆成了单页面组件，就是怎么麻烦怎么来了。

### 实现的功能

#### 拖动

整个页面都可拖动

#### 进度条完整功能

显示已播放时间、全部时长；
显示进度；
可拖动控制钮调整进度；
可点击进度条调整进度且进度条随之改变，注意点击区域应足够宽。

#### 音量控制功能

点击volume-button可实现静音/取消静音效果；
静音改变同时图标也发声变化；
显示音量的进度条；
可拖动volume-handle控制音量大小；
可点击进度条改变音量大小；

#### 黑胶旋转功能

音频播放时唱针转至唱片上，唱片旋转；
唱片中心封面为歌曲图片，随着歌曲改变而改变；
音频播放时唱片旋转，唱针在唱片上；暂停时唱片停止转动，唱针移开；
歌词显示按钮可控制唱片消失（歌词显示）和出现（歌词消失）。

#### 下一曲上一曲

可以返回听自己的上一曲歌曲

#### 歌曲api

接口是在网上找的，有时候请求过来的歌曲是空的，找到有更好的接口时候在处理下

### 预览地址

[预览](http://www.ranzhouli.cn/fmvue)

[之前的](https://github.com/bingzhe/FM_music)

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


