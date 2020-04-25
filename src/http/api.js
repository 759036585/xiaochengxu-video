import request from '@/http/request.js'

/**
 * ******************首页模块**********************
 */

//  推荐

export const getVertical = (params) => {
  return request({
    url: 'image/v3/homepage/vertical',
    data: {
      ...params
    }
  })
}

// 专辑
export const getAlbum = (params) => {
  return request({
    url: 'image/v1/wallpaper/album',
    data: {
      ...params
    }
  })
}

// 专辑-详情页面

export const getAlbumDetail = (id,params) => {
  return request({
    url:`image/v1/wallpaper/album/${id}/wallpaper`,
    data: {
      ...params
    }
  })
}

// 图片评论

export const getImgCategory = (id) => {
  return request({
    url:`image/v2/wallpaper/wallpaper/${id}/comment`
  })
}

// 分类

export const getCategory = () => {
  return request({
    url: 'image/v1/vertical/category'
  })
}

// 分类 ---最新 ---- 热门
export const getVerticalCategory = (id,params) => {
  return request({
    url:`image/v1/vertical/category/${id}/vertical`,
    data: {
      ...params
    }
  })
}

// 精美视频推荐

export const getVideoList = (url,params) => {
  return request({
    url: 'videoimg/v1/videowp/'+url,
    data: {
      ...params
    }
  })
}

// 视频分类

export const getVideoCategory = () => {
  return request({
    url: 'videoimg/v1/videowp/category'
  })
}