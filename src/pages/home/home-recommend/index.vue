<template>
 <scroll-view scroll-y v-if="recommendList.length > 0" class="scroll-view" @scrolltolower="scrollToLower">
  <view class="recommend">
    <view class="recommend-top" v-for="item in recommendList" :key="item.id" @click="handleNavgate(item.target)">
      <image mode="widthFix" :src="item.thumb"></image>
    </view>
  </view>

  <view class="moment">
    <view class="moment-title">
      <view class="moment-title-lf">
        <view class="moment-title-lf-date">
          <text>{{momentList.DD}}</text>
          / {{momentList.MM}}月
        </view>
        <view class="moment-title-lf-info">
          {{momentList.title}}
        </view>
      </view>
      <view class="moment-title-rg">
        <text>更多 ></text>
      </view>
    </view>
    <view class="moment-content">
        <view class="moment-content-image" v-for="(item,index) in momentList.items" :key="item.id" >
          <go-detail :list="momentList.items" :index="index">
            <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
          </go-detail>
        </view>
    </view>  
  </view>
  <view class="hot">
    <view class="hot-title">
      <text>热门</text>
    </view>
    <view class="hot-content">
      <view class="hot-content-image" v-for="(item,index) in hotList" :key="item.id" >
        <go-detail :list="hotList" :index="index">
          <image mode="aspectFill" :src="item.thumb"></image>
        </go-detail>
      </view>
    </view>
  </view>
 </scroll-view>
</template>

<script>
import {getVertical} from "@/http/api.js"
import goDetail from '@/components/go-detail'
import moment from 'moment'
export default {
  components: {
    goDetail
  },
  data() {
    return {
      recommendList:[],
      momentList: [],
      hotList: [],
      params: {
        order: 'hot',
        limit: 30,
        skip: 0
      },
      hasMore: true
    }
  },
  methods: {
    // 获取推荐数据
    async getVertical() {
      const res = await getVertical(this.params)
      if(res.res.vertical.length === 0) {
        this.hasMore = false
        return false
      }
      if(this.recommendList.length === 0) {
        this.recommendList = res.res.homepage[1].items
        this.momentList = res.res.homepage[2]
        this.momentList.MM = moment(this.momentList.stime).format('MM')
        this.momentList.DD = moment(this.momentList.stime).format('DD')

      }
      this.hotList = [...this.hotList,...res.res.vertical]
    },
    scrollToLower() {
      if(!this.hasMore){
        wx.showToast({
          title: '没有更多了...',
          icon: 'none',
        });
      }
      this.params.skip += this.params.limit
      this.getVertical()
    },
    // 跳转页面
    handleNavgate(id) {
      wx.navigateTo({
        url: '/pages/home/home-detail/index?id='+id,
      });
    }
  },
  mounted() {
    this.getVertical()
  },

}
</script>

<style lang="scss">
  .scroll-view {
    height: calc( 100vh - 36px );
  }

  .recommend {
    margin-top: 6rpx;
    display: flex;
    flex-wrap: wrap;
    &-top {
      width: 50%;
      border: 5rpx solid #fff;
    }
  }
  .moment {
    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 10rpx;
      &-lf {
        display: flex;
        font-size: 30rpx;
        font-weight: 600;
        &-date {
          color: $color;
          text {
            font-size: 36rpx;
          }
        }
        &-info {
          font-size: 36rpx;
          margin-left: 10rpx;
          color: #666;
        }
      }
      &-rg {
        font-size: 26rpx;
        color: #666;
        font-weight: 600;
      }
    }
    &-content {
      display: flex;
      flex-wrap: wrap;
      &-image { 
        border: 5rpx solid #fff;
        width: 33.33%;
      }
    }
  }
  .hot {
    &-title {
      padding: 20rpx 0;
      border-left: 10rpx solid $color;
      text {
        color: #666;
        font-weight: 600;
        font-size: 36rpx;
        padding-left: 20rpx;
      }
    }
    &-content {
      display: flex;
      flex-wrap: wrap;
      &-image {
        width: 33.33%;
        image {
          border: 5rpx solid #fff;
        }
      }
    }
  }


</style>