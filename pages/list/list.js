Page({
  data: {
    id: "",
    title: '',
    date:'',
    source:'',
    firstImage:'',
    content:'',
    readCount:'',
  },
  onLoad(options){
    this.setData({
      id:options.id
    })
    this.getNow()
  },
  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail?id=' + this.data.id,
      success: res => {
        let result = res.data.result
        this.setHead(result)
        this.setNews(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setHead(result){
    this.setData({
      title:result.title,
      source: result.source === '' ? '未知来源' : result.source,
      date: result.date.slice(11, 16),
      readCount:'阅读数'+result.readCount,
    })
  },
  setNews(result){
    this.setData({
      content:result.content
    })
  }
})