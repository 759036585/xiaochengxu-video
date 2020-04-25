<template>
  <scroll-view scroll-y @scrolltolower="scrollToLower" class="scroll-view">
    <!-- 轮播图 -->
    <view class="swiper">
      <swiper class="swiper-list" autoplay circular indicator-dots>
        <swiper-item class="swiper-list-item" v-for="item in banner" :key="item.id">
          <image :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 列表 -->    
    <view class="album">
      <view class="album-item" v-for="item in albumList" :key="item.id" @click="handleDeatil(item.id)">
        <view class="album-item-img">
          <image :src="item.cover"></image>
        </view>
        <view class="album-item-info">
          <h3>{{item.name}}</h3>
          <p>{{item.desc}}</p>
          <view class="btn">
            <view class="a_btn">关注</view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import {getAlbum} from '@/http/api.js'
export default {
  data() {
    return {
      // 轮播图数据
      banner: [],
      albumList: [],
      params: {
        limit: 30,
        order: 'new',
        skip: 0
      },
      hasMore: true
    }
  },
  methods: {
    async getAlbumList() {
      const {res} = await getAlbum(this.params)
      if(res.album.length === 0) {
        this.hasMore =false
        return false
      }
      this.banner = res.banner
      this.albumList = [...this.albumList,...res.album]
    },
    scrollToLower() {
      if(!this.hasMore) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
        });
      }
      this.params.skip += this.params.limit
      this.getAlbumList()
    },
    handleDeatil(id) {
      wx.navigateTo({
        url: '/pages/home/home-detail/index?id='+id,
      });
    }
  },
  mounted() {
    uni.setNavigationBarTitle({title:'专辑'})
    this.getAlbumList()
  },
}
</script>

<style lang="scss">
  .scroll-view {
    height: calc( 100vh - 36px );
  }
  .swiper {
    margin-top: 5rpx;
    &-list {
      height: calc( 750rpx / 2.4 );
      &-item {
        image {
          height: 100%;
        }
      }
    }
  }
  .album {
    &-item {
      display: flex;
      padding: 10rpx 0;
      border-bottom: 1px solid #eee;
      &-img {
        padding: 20rpx;
        flex: 1;
        height: 200rpx;
        width: 200rpx;
        image {
        height: 100%;
        }
      }
      &-info {
        flex: 2;
        overflow: hidden;
        h3 {
          font-size: 36rpx;
          color: #333;
        }
        p {
          margin: 0;
          padding: 30rpx 0;
          font-size: 26rpx;
          color: #666;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .btn {
          display: flex;
          justify-content: flex-end;
          padding-right: 20rpx;
          .a_btn {
            color: $color;
            border: 2rpx solid $color;
            padding: 10rpx 20rpx;
          }
        }
      }
    }
  }
</style>