<template>
  <view>
    <view class="category">
      <view class="category-item" v-for="item in getVideoCateList" :key="item.id">
        <image mode="aspectFill" :src="item.img"></image>
        <view class="title">{{item.name}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import {getVideoCategory} from '@/http/api.js'
export default {
  data() {
    return {
      getVideoCateList: []
    }
  },
  methods: {
    async getVideCategoryList() {
      const {res} = await getVideoCategory()
      this.getVideoCateList = res.category
    }
  },
  mounted() {
    this.getVideCategoryList()
  },

}
</script>

<style lang = 'scss'>
  .category {
    display: flex;
    flex-wrap: wrap;
    &-item {
      position: relative;
      width: 33.33%;
      height: 260rpx;
      image {
        height: 100%;
        border: 6rpx solid #fff;
      }
      .title {
        position: absolute;
        bottom: 20rpx;
        left: 20rpx;
        font-size: 36rpx;
        font-weight: 600;
        color: #fff;
      }
    }
  }
</style>