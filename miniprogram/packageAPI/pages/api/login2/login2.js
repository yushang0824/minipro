const app = getApp()
Page({
  onShareAppMessage() {
    return {
      title: '微信登录',
      path: 'packageAPI/pages/api/login/login'
    }
  },

  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
    this.setData({
      hasLogin: false
    })
  },
  data: {
    theme: 'light',},
  login() {
    const that = this
    wx.login({
      success(res) {
        app.globalData.hasLogin = true
        console.log(res)
        that.setData({
          hasLogin: true
        })

        if (res.code) {
          that.loginImpl(res)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  loginImpl(res) {
    wx.request({
      url: 'http://127.0.0.1:5000/login',
      method: 'POST',
      data: {
        code: res.code
      },
      success: function(res) {
        if (res.data.status === 'success') {
          // 登录成功
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          });
        } else {
          // 登录失败
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  }
})
