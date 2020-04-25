<template>
  <view>
    <view>
      <uni-segmented-control
        :current="current"
        :values="items.map(v => v.title)"
        @clickItem="onClickItem"
        style-type="text"
        active-color="#d4237a"
      ></uni-segmented-control>
    </view>
    <view class="content">
      <view v-show="current < 4">
        <video-main :urlObj="{url:items[current].url,params:items[current].params}"></video-main>
      </view>
      <view v-show="current === 4">
        <video-cate ></video-cate>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import videoMain from "./children/video-main";
import videoCate from "./children/video-cate";
export default {
  components: { uniSegmentedControl, videoMain, videoCate },
  data() {
    return {
      items: [
        {
          title: "推荐",
          url: "featured",
          params: { limit: 15, skip: 0, order: "hot" }
        },
        {
          title: "娱乐",
          url: "category/59b25abbe7bce76bc834198a",
          params: { limit: 15, skip: 0, order: "new" }
        },
        {
          title: "最新",
          url: "videowp",
          params: { limit: 15, skip: 0, order: "new" }
        },
        {
          title: "热门",
          url: "videowp",
          params: { limit: 15, skip: 0, order: "hot" }
        },
        {
          title: "分类",
        }
      ],
      current: 0
    };
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

<style>
</style>