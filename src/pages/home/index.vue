<template>
  <view class="home-tab">
    <view class="home-tab-title">
      <view class="home-tab-title-lf">
        <uni-segmented-control
          :current="current"
          :values="items.map(v => v.title)"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#d4237a"
          >
        </uni-segmented-control>
      </view>
      <view class="home-tab-title-rg">
        <i class="iconfont icon-xingtaiduICON_sousuo--"></i>
      </view>
    </view>
    <view class="content">
      <view v-if="current === 0">
        <home-recommend></home-recommend>
      </view>
      <view v-if="current === 1">
        <home-category></home-category>
      </view>
      <view v-if="current === 2">
        <home-album></home-album>
      </view>
      <view v-if="current === 3">
        <home-new></home-new>
      </view>
    </view>
  </view>

</template>

<script>
import homeAlbum from "@/pages/home/home-album";
import homeCategory from "@/pages/home/home-category";
import homeNew from "@/pages/home/home-new";
import homeRecommend from "@/pages/home/home-recommend";

import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    // 专辑
    homeAlbum,
    // 分类
    homeCategory,
    // 最新
    homeNew,
    // 推荐
    homeRecommend,
    // 分段器
    uniSegmentedControl
  },
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "专辑" },
        { title: "最新" }
      ],
      current: 0
    };
  },
  methods: {
    // 点击分段器
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .home-tab {
    &-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      &-lf {
        width: 70%;
      }
      &-rg {
        position: absolute;
        right: 30rpx;
        font-size: 26rpx;
      }
    }
  }

</style>