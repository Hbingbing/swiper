//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    firstAlbum: 1, // 1 用户首次创建相册
    stepScrollLeft: 'card1',
    nextPage: false,
    prePage: false,
    touchDot: 0//触摸时的原点
  },
  
  onLoad: function () {
    
  },
  // 新手指引-三步骤
  prePageFun: function () {
    var id = this.data.stepScrollLeft;
    var that = this
    if (id == 'card3') {
      id = 'card2'
    } else if (id == 'card2') {
      id = 'card1'
    }
    this.setData({
      stepScrollLeft: id,
      prePage: true,
      nextPage: false
    })
  },
  nextPageFun: function () {
    var id = this.data.stepScrollLeft;
    var that = this
    if (id == 'card1') {
      id = 'card2'
    } else if (id == 'card2') {
      id = 'card3'
    } else {
      this.hideStepCardModal()
    }
    this.setData({
      stepScrollLeft: id,
      nextPage: true,
      prePage: false
    })
  },
  // 触摸开始事件
  touchStart: function (e) {
    this.setData({
      touchDot: e.touches[0].pageX // 获取触摸时的原点
    })
  },
  // 触摸结束事件
  touchEnd: function (e) {
    var touchDot = this.data.touchDot;
    var touchMove = e.changedTouches[0].pageX;
    // 下一页   
    if (touchMove - touchDot <= -20) {
      if (this.data.stepScrollLeft != 'card3') {
        this.nextPageFun()
      }
    }
    // 上一页   
    if (touchMove - touchDot >= 20) {
      this.prePageFun()
    }
  },
  // 关闭三步骤
  hideStepCardModal: function (e) {
    var that = this
    this.setData({
      firstAlbum: 0,
      stepScrollLeft: 'card1'
    })
  }
})
