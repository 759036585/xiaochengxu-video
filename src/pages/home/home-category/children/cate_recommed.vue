<template>
  <scroll-view scroll-y class="scroll-view" @scrolltolower="scrollToLower">
    <view class="album">
      <view class="album-item" v-for="item in albumList" :key="item.id">
        <image mode="widthFix" :src="item.thumb"></image>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import {getVerticalCategory} from '@/http/api.js'
export default {
  props: {
    cate_id: {
      type: String 
    }
  },
  mounted() {
    this.getAlbum()
  },
  data() {
    return {
      albumList: [],
      params: {
        limit: 15,
        skip: 0,
        order: 'new'
      },
      hasMore: true
    }
  },
  methods: {
    async getAlbum() {
      const {res} = await getVerticalCategory(this.cate_id,this.params)
      if(res.vertical.length === 0) {
        this.hasMore =false
        return false
      }
      this.albumList = [...this.albumList,...res.vertical]
    },
    scrollToLower() {
      if(this.hasMore) {
        this.params.skip += this.params.limit
        this.getAlbum()
      }else{
        uni.showToast({
          title: '没有更多了',
          icon: 'none',
        });
      }
    }
  },
}
</script>

<style lang = 'scss'>
  .scroll-view {
    height: calc( 100vh - 72rpx);
  }
  .album {
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