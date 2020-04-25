<template>
  <view>
    <view class="category">
      <uni-segmented-control
        :current="current"
        :values="items"
        @clickItem="onClickItem"
        style-type="text"
        active-color="#d4237a"
        class="cate_title"
      ></uni-segmented-control>
    </view>
    <view class="content">
      <view v-show="current === 0">
        <cate-recommend :cate_id="id" ></cate-recommend>
      </view>
      <view v-show="current === 1">
        <cate-hot :cate_id="id" ></cate-hot>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import cateRecommend from '@/pages/home/home-category/children/cate_recommed'
import cateHot from '@/pages/home/home-category/children/cate_hot'
export default {
  components: { uniSegmentedControl,cateRecommend,cateHot },
  data() {
    return {
      items: ["最新", "热门"],
      current: 0,
      id:null
    };
  },
  onLoad(options) {
    this.id = options.id
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  }
};
</script>

<style lang='scss'>
.category {
  width: 70%;
  margin: 0 auto;
}
</style>