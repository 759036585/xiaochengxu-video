
// 基准地址
let baseUrl = 'http://157.122.54.189:9088/'

export default function (params) {
  wx.showLoading({
    title: '加载中...'
  });
  return new Promise((resolve,reject) => {
    wx.request({
      ...params,
      url: baseUrl+params.url,
      success: (result)=>{
        resolve(result.data)
      },
      fail: (error)=>{reject(error)},
      complete: ()=>{
        wx.hideLoading()
      }
    });
  })
}