<template>
  <view>
    <view class="category">
      <view class="category-item" v-for="item in categoryList" :key="item.id" @click="handleCategory(item.id)">
        <image mode="aspectFill" :src="item.cover"></image>
        <view class="title">{{item.name}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import {getCategory} from '@/http/api.js'
export default {
  data() {
    return {
      // 图片分类
      categoryList:[]
    }
  },
  methods: {
    async getCategoryList(){
      const {res} = await getCategory()
      this.categoryList = res.category
    },
    handleCategory(id) {
      wx.navigateTo({
        url: '/pages/imgCategory/index?id='+id,
      });
    }
  },
  mounted() {
    this.getCategoryList()
  },
}
</script>

<style lang='scss'>
  .category {
    display: flex;
    flex-wrap: wrap;
    &-item {
      width: 33.33%;
      height: 260rpx;
      position: relative;
      image {
       height: 100%;
       border: 6rpx solid #fff;
      }
      .title {
        position: absolute;
        bottom: 20rpx;
        left: 20rpx;
        color: #fff;
        font-weight: 600;
        font-size: 36rpx;
      }
    }
  }

</style>