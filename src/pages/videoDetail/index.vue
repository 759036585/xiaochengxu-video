<template>
  <view>
    <image :src="videoObj.img"></image>
    <view class="video-top">
      <view :class="['iconfont',muted?'icon-jingyin':'icon-shengyinyinliangxianxing']" @click="handleMuted"></view>
      <view class="iconfont icon-forward-null">
        <button class="btn" open-type="share"></button>
      </view>
    </view>
     <view class="video-mid">
       <video :muted ='muted' object-fit="fill" :src="videoObj.video"></video>
    </view>
     <view class="video-btm">
       <view class="download">下载视频</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      videoObj: {},
      muted: false
    }
  },
  onLoad() {
    console.log(getApp().globalData.video)
    this.videoObj = getApp().globalData.video
  },
  methods: {
    // 是否静音
    handleMuted(){
      this.muted = !this.muted
    }
  },
}
</script>

<style lang='scss' scoped>
  image {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -1;
    filter: blur(16px);
  }
  .video-top {
    display: flex;
    width: 100%;
    height: 80rpx;
    justify-content: flex-end;
    .iconfont {
      box-shadow: 5px 5px 5px 5px rgba(0,0,0,.5);
      width: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background-color: rgba(0,0,0,.5);
      font-size: 50rpx;
      border-radius: 50%;
      margin-right: 20rpx;
      .btn {
        opacity: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
  .video-mid {
    margin: 20rpx auto;
    width: 600rpx;
    height: 900rpx;
    video {
      width: 100%;
      height: 100%;
    }
  }
  .video-btm {
    margin: 20rpx auto;
    width: 560rpx;
    height: 100rpx;
    background-color: rgba(0,0,0,.5);
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
    .download {
      font-weight: 600;
      color: #fff;
      font-size: 46rpx;
      box-sizing: border-box;
    }
  }

</style>