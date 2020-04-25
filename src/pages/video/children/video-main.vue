<template>
  <scroll-view scroll-y @scrolltolower="scrollToLower" class="scroll-view">
    <view class="video">
      <view class="video-item" v-for="item in videoList" :key="item.id" @click="handelGoVideoDetail(item)">
        <image :src="item.img" mode="aspectFill"></image>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import {getVideoList} from '@/http/api.js'
export default {
  props:{
    urlObj: {
      type:Object
    }
  },
  data() {
    return {
      videoList: [],
      hasMore: true
    }
  },
  watch: {
    urlObj(){
      if(this.urlObj.params) {
        this.videoList = []
        this.getVideoList()
      }
    }
  },
  mounted() {
    this.getVideoList()
  },
  methods: {
    handelGoVideoDetail(item) {
      getApp().globalData.video = item
      wx.navigateTo({
        url: '/pages/videoDetail/index',
      });
    },
    async getVideoList() {
      const {res} = await getVideoList(this.urlObj.url,this.urlObj.params)
      if(res.videowp.length === 0) {
        this.hasMore = false
        return false
      }
      this.videoList = [...this.videoList,...res.videowp]
      console.log(res)
    },
    scrollToLower() {
      if(this.hasMore) {
        this.urlObj.params.skip += this.urlObj.params.limit
        this.getVideoList()
      }else{
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none',
        });
      }
    }
  },
}
</script>

<style lang='scss'>
  .scroll-view {
    height: calc(100vh - 72rpx);
  }
  .video {
    display: flex;
    flex-wrap: wrap;
    &-item {
      width: 33.33%;
      image {
        border: 6rpx solid #fff;
      }
    }
  }
</style>