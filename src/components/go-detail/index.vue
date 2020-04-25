<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    list: Array,
    index: Number
  },
  methods: {
    handleClick() {
      getApp().globalData.ImgList = this.list
      getApp().globalData.ImgIndex = this.index
      wx.navigateTo({
        url: `/pages/picdetail/index`,
      });
    }
  }
}
</script>

<style>

</style>