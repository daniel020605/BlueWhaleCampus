Page({
  data: {
      tabList: ['ToDo', '统计', '我的'],
      current: 0,//当前选中的Tab项
      inputValue: '', //搜索的内容
      ValueList: [],
      show: false, //未完成完成绑定
      iSshow: false, //全选全不选
      yesList: [],
  },
  onLoad: function (options) {
    
        var nolist = wx.getStorageSync('ValueList')
        var yesvallist = wx.getStorageSync('yesList')
        if (nolist) {
          this.setData({
            ValueList: nolist
          })
        }
        if (yesvallist) {
          this.setData({
            yesList: yesvallist
          })
        }
      },
    // 实时触发
  inputBind: function (e) {
      var that = this
      that.setData({
        inputValue: e.detail.value
      })
      this.save()
    },
  // 回车添加
    addsearch: function (e) {
        var that = this
        var ValueList = that.data.ValueList
        ValueList.push({
          iSshow: that.data.iSshow,
          inputValue: that.data.inputValue
        })
        that.setData({
          ValueList: this.data.ValueList,
          inputValue: ""
        })
        this.save()
      },
      // 未完成到完成
  nolist: function (e) {
    var data1 = this.data.ValueList.splice(e.currentTarget.dataset.index, 1)[0]
    // console.log(data1)
    data1.iSshow = true
    data1.show = !this.data.show
    this.data.yesList.push(data1)
    this.setData({
      ValueList: this.data.ValueList,
      yesList: this.data.yesList,
    })
    this.save()
  },
  // 未完成点击删除
  nodelete: function (e) {
    // console.log(e.currentTarget.dataset.index);
    this.data.ValueList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      ValueList: this.data.ValueList
    })
    this.save()
  },
 // 已完成到未完成
  yeslist: function (e) {
      var data1 = this.data.yesList.splice(e.currentTarget.dataset.index, 1)[0]
      // console.log(data1)
      data1.iSshow = false
      this.data.ValueList.push(data1)
      this.setData({
        ValueList: this.data.ValueList,
        yesList: this.data.yesList,
      })
      this.save()
    },
   //已完成的删除
    yesdelete: function (e) {
        this.data.yesList.splice(e.currentTarget.dataset.index, 1)
        this.setData({
          yesList: this.data.yesList
        })
      },
  /**
   * Tab的点击切换事件
   */
  tabItemClick: function (e) {
      this.setData({
          current: e.currentTarget.dataset.pos
      })
  },
})
//index.js
//获取应用实例
const app = getApp()

const promisic = function (func) {
  return function (params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res);
        },
        fail: (error) => {
          reject(error);
        }
      });
      func(args);
    });
  };
},
class Http {
  // 同步Http请求
  static async asyncRequest(url, method, data, backMethod) {
      let res = await promisic(wx.request)({
          url: url,
          method: method,
          data: data,
      })
      backMethod(res)
  }
}
