//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  checkSession: function() {
    wx.checkSession({
      success() {
        console.log('xxxx')
      },
      fail() {
        login()
      }
    })
  },

  login: function() {
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        wx.request({
          method: "POST",
          url: app.globalData.serverUrl + "/login",
          data: {
            code: res.code,
            userInfo: app.globalData.userInfo
          },
          success: function (res) {
            //wx.setStorageSync("openid", res.data)//可以把openid保存起来,以便后期需求的使用
            wx.redirectTo({
              url: '../home/home'
            });
          },
          fail: function (res) {
            console.log("login failed");
          }
        })
      }
    })
  }
})
