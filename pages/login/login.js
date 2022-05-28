// pages/login/login.js
const app = getApp()

var serverUrl = app.globalData.serverUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  login(){
     var that = this
     var usercode = ''
     var identity = '';
     var userName = '';
     var avatarUrl = '';
     wx.getUserProfile({
       desc: '',
       success:res=>{
         var user = res.userInfo
         console.log('成功',user)
         userName = user.nickName
         avatarUrl = user.avatarUrl
         console.log(userName)
         console.log(avatarUrl)
          wx.login({
            success(res){
              if(res.code){
                usercode = res.code
                wx.request({
                  url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxaa91294389d42b51&secret=43ca5a1c3fb8179f194f6320ddf5a938&js_code='+res.code+'&grant_type=authorization_code',
                  success:res=>{
                    console.log("用户的openid:" + res.data.openid)
                    identity=res.data.openid
                    console.log("1"+identity)
                    wx.setStorageSync('id', identity)
                    wx.setStorageSync('username', userName)
                    wx.setStorageSync('userimage', avatarUrl)
                    console.log('2'+userName)
                    console.log('3'+avatarUrl)
                    wx.request({
                      url: serverUrl + '/user/login',
                      data: {
                        identity:identity,
                        userName:userName,
                        avatarUrl:avatarUrl,
                        sex:0
                      }, 
                      method: 'POST',

                    // 携带的参数会以url格式传到服务器，信息头我们设置为url编码，utf8编码
                    header: {
                      'content-type': 'application/json;charset=utf-8' 
                    },
                      fail:function(err){
                        console.log("失败")
                    }
                    })


                  }
                  
                })
              }else{
                  console.log('登录失败！' + res.errMsg)
              }

            }
          })

         console.log()
       }
     })
  },
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})