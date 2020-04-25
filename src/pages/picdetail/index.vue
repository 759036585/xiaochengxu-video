<template>
  <view>
    <!-- 用户信息 -->
    <view class="user_info">
      <view class="user_pic">
        <image mode="widthFix" :src="detailList.user.avatar"></image>
      </view>
      <view class="user_desc">
        <view class="user_name">{{detailList.user.name}}</view>
        <view class="user_date">{{detailList.cnTime}}</view>
      </view>
    </view>

    <view class="detail_pic">
      <swiper-action @swiperAction="handleSwiperAction">
        <image mode="widthFix" :src="detailList.thumb"></image>
      </swiper-action>
      
    </view>

    <view class="pic_btm">
      <view class="pic_btm_lf">
        <text class="iconfont icon-dianzan_active"></text>
        <text>{{detailList.rank}}</text>
      </view>
      <view class="pic_btm_rg">
        <text class="iconfont icon-love"></text>
        <text>收藏</text>
      </view>
    </view>

    <view class="am">
      <view class="am_title">相关</view>
      <view class="am_content">
        <view class="am_img">
          <image mode="aspectFill" :src="detailList.thumb"></image>
        </view>
        <view class="am_info">
          <view class="am_rg_t">专辑</view>
          <view class="am_rg_m">
            <text v-for="item in detailList.tag" :key="item">{{item}}</text>
          </view>
          <text class=" iconfont icon-arrow-right am_rg_d"></text>
        </view>
      </view>
    </view>
    <!-- 最热评论 -->
    <view class="comment hot comment" v-if="hotShow">
      <view class="hot_item">
        <view class="hot_title">
          <text class="iconfont icon-hot"></text>
          <text class="hot_pinglun">最热评论</text>
        </view>
        <view class="hot_content" v-for="item in hotList" :key="item.id">
          <view class="hot_user">
            <view class="hot_user_pic">
              <image mode="widthFix" :src="item.user.avatar"></image>
            </view>
            <view class="hot_user_info">
              <view class="hot_user_name">{{item.user.name}}</view>
              <view class="hot_user_date">{{item.cnTime}}</view>
              <view class="hot_comment">
                <text class="hot_l">{{item.content}}</text>
                <text class="hot_r iconfont icon-dianzan_active">{{item.user.follower}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最新评论 -->
    <view class="comment hot" v-if="commentShow">
      <view class="hot_item">
        <view class="hot_title">
          <text class="iconfont icon-pinglun newPinglun"></text>
          <text class="hot_pinglun">最新评论</text>
        </view>
        <view class="hot_content" v-for="item in commentList" :key="item.id">
          <view class="hot_user">
            <view class="hot_user_pic">
              <image mode="widthFix" :src="item.user.avatar"></image>
            </view>
            <view class="hot_user_info">
              <view class="hot_user_name">{{item.user.name}}</view>
              <view class="hot_user_date">{{item.cnTime}}</view>
              <view class="hot_comment">
                <text class="hot_l">{{item.content}}</text>
                <text class="hot_r iconfont icon-dianzan_active">{{item.user.follower}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="pinglun" v-else>暂无评论,快来抢沙发吧....</view>
    <view class="download_pic">
      <view class="download_btn" @click="downLoadPic">下载图片</view>
    </view>
  </view>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
import {getImgCategory} from '@/http/api.js'
import swiperAction from '@/components/swiperAction'
export default {
  components: {
    swiperAction
  },
  data() {
    return {
      detailList: {},
      id:null,
      hotList: [],
      hotShow: false,
      commentList: [],
      commentShow: true,
      ImgIndex: 0      
    }
  },
  onLoad() {
    const {ImgIndex} = getApp().globalData
    this.ImgIndex = ImgIndex
    this.getData()
  },
  methods: {
    // 下载图片
    async downLoadPic(){
      await uni.showLoading({
        title: '下载中...',
      })
      const res = await uni.downloadFile({url:this.detailList.img })
      let {tempFilePath} = res[1]
      await uni.saveImageToPhotosAlbum({filePath:tempFilePath})
      await uni.hideLoading()
      await uni.showToast({
        title: '下载成功',
      });
    },
    getData() {
      const {ImgList} = getApp().globalData
      this.detailList = ImgList[this.ImgIndex]
      this.detailList.newThumb = this.detailList.thumb+this.detailList.rule.replace('$<Height>',360)
      this.detailList.cnTime = moment(this.detailList.user.viptime*1000).fromNow()
      this.id = ImgList[this.ImgIndex].id
      this.getCommentList(this.id)
    },
    handleSwiperAction(e){
      const {ImgList} = getApp().globalData
      if(e.dicration === 'left' && this.ImgIndex < ImgList.length -1) {
        this.ImgIndex++
        this.getData()
      }else if(e.dicration === 'right' && this.ImgIndex > 0){
        this.ImgIndex--
        this.getData()
      }else{
        wx.showToast({
          title: '没有更多数据了...',
          icon: 'none',
        });
      }

    },
    async getCommentList(id) {
      const {res} = await getImgCategory(id)
      this.hotList = res.hot
      this.commentList = res.comment
      this.hotList.map(item => {
        return item.cnTime = moment(item.atime).fromNow()
      })
      this.commentList.forEach(v => v.cnTime = moment(v.atime).fromNow())
      if(this.hotList.length >0) {
        this.hotShow = true
      }
      if(this.commentList.length === 0) {
        this.commentShow = false
      }
    }
  },
  mounted() {
    this.getCommentList(this.id)
  },
}
</script>

<style lang="scss">
  .user_info {
    padding: 20rpx;
    display: flex;
    align-items: center;
    .user_pic {
      padding: 0 20rpx;
      image {
        border-radius: 50%;
        width: 88rpx;
      }
    }
    .user_desc {
      .user_name {
        color: #000;
        font-weight: 600;
      }
      .user_date {
        color: #999;
        font-size: 26rpx;
      }
    }
  }
  .pic_btm {
    display: flex;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1px solid #999;
    .pic_btm_lf {
      flex: 1;
      display: flex;
      justify-content: center;
      border-right: 1px solid #999;
      text:first-child {
        font-size: 36rpx;
      }
    }
    .pic_btm_rg {
      flex: 1;
      display: flex;
      justify-content: center;
      line-height: 38rpx;
       text:first-child {
        font-size: 28rpx;
      }
    }
  }
  .am {
    padding: 0 20rpx;
    .am_title {
      padding: 20rpx 0;
      color: #000;
    }
    .am_content {
      display: flex;
      .am_img {
        flex: 1;
        height: 180rpx;
        image {
          height: 100%;
        }
      }
      .am_info {
        flex: 3;
        padding-left: 20rpx;
        position: relative;
        .am_rg_t {
          width: 120rpx;
          text-align: center;
          padding: 10rpx;
          color: #fff;
          font-size: 26rpx;
          background-color: $color;
          border-radius: 8rpx;
        }
        .am_rg_m {
          width: 400rpx;
          font-size: 30rpx;
          color: #666;
          text {
           padding: 10rpx;
          }
        }
        .am_rg_d {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 50rpx;
          font-size: 40rpx;
          color: #000;
        }
      }
    }
  }

  .hot {
    .hot_item {
      padding: 0 10rpx;
      .hot_title {
        padding: 20rpx 0;
        .iconfont {
          font-size: 40rpx;
          color: red;
          margin: 0 10rpx;
        }
        .hot_pinglun {
          font-size: 30rpx;
          color: #666;
        }
      }
    }
    .hot_content {
      border-bottom: 10rpx solid #eee;
      .hot_user {
        display: flex;
        .hot_user_pic {
          width: 60rpx;
          height: 60rpx;
          padding: 10rpx 0;
          image {
            height: 100%;
          }
        }
        .hot_user_info {
          width: 100%;
          padding: 10rpx;
          .hot_user_name {
            color: #999;
          }
          .hot_user_date {
            color: #333;
          }
          .hot_comment {
            margin-top: 30rpx;
            display: flex;
            justify-content: space-between;
            .hot_l {
              flex: 7;
            }
            .hot_r {
              flex: 1;
            }
          }
        }
      }
    }
  }
  .newPinglun {
    color: skyblue !important;
  }
  .comment {
    margin-bottom:50rpx !important;
  }
  .pinglun {
    text-align: center;
    margin-top: 100rpx;
    font-size: 40rpx;
    color: #666;
  }
  .download_pic {
    height: 120rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .download_btn {
      width: 90%;
      height: 100rpx;
      background-color: $color;
      color: #fff;
      font-size: 36rpx;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20rpx;
    }
  }
</style>