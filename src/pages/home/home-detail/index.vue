<template>
  <view>
    <view class="bg-img">
      <image mode="aspectFill" :src="albumObj.cover"></image>
      <view class="img-title">
        <view class="title">{{albumObj.name}}</view>
        <view class="btn">关注专辑</view>
      </view>
    </view>
    
    <view class="user">
      <view class="user-pic">
        <image :src="albumObj.user.avatar"></image>
        <text>{{albumObj.user.name}}</text>
      </view>
      <view class="user-info">
        <text>{{albumObj.desc}}</text>
      </view>
    </view>

    <view class="pic-list">
      <view class="pic-item" v-for="(item,index) in picList" :key="item.id">
        <go-detail :list="picList" :index="index">
         <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
        </go-detail>
      </view>
    </view>
  </view>
</template>

<script>
import goDetail from '@/components/go-detail'
import {getAlbumDetail} from '@/http/api.js'
let id;
export default {
  components: {
    goDetail
  },
  data() {
    return {
      params: {
          limit: 12,
          order: 'new',
          skip: 0,
          first: 1
      },
      albumObj: {},
      picList: [],
      hasMore: true
    }
  },
  onLoad(options) {
    id = options.id
    this.getAlbumDetail(options.id)
  },
  methods: {
    async getAlbumDetail(id) {
      const {res} = await getAlbumDetail(id,this.params)
      if(res.wallpaper.length === 0) {
        this.hasMore=false
        return false
      }
      if(Object.keys(this.albumObj).length === 0) {
        this.albumObj = res.album
      }
      this.picList = [...this.picList,...res.wallpaper]
    },
    onReachBottom() {
      if(this.hasMore){
        this.params.skip += this.params.limit
        this.params.first = 0
        this.getAlbumDetail(id)
      }else{
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
        });
      }
    }
  },
}
</script>

<style lang="scss">
  .bg-img {
    position: relative;
    image {
      height: 480rpx;
    }
    .img-title {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 20rpx;
      height: 80rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 40rpx 20rpx;
      .title {
        font-size: 36rpx;
        color: #fff;
      }
      .btn {
        padding: 10rpx;
        border-radius: 10rpx;
        color: #fff;
        background-color: $color;
      }
    }
  }

  .user {
    .user-pic {
      display: flex;
      align-items: center;
      margin: 20rpx;
      display: flex;
      height: 60rpx;
      image {
        width: 60rpx;
        height: 100%;
      }
      text {
        margin-left: 20rpx;
        font-size: 30rpx;
        font-weight: 600;
        color: #666;
      }
    }
    .user-info {
      padding: 0 20rpx;
    }
  }

  .pic-list {
    display: flex;
    flex-wrap: wrap;
    .pic-item {
      width: 33.33%;
      image {
        height: 200rpx;
        border: 5rpx solid #fff;
      }
    }
  }
</style>