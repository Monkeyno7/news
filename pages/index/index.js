const newsMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other'
}

Page({
  data:{
    newsType:["国内","国际","财经","娱乐","军事","体育","其他"],
    selectedNewsType:'国内',
    newsList : [],
  },
  onLoad(){
    this.getNow()
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#3FBF7F',
    })
  },
  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },
  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list?type=' + newsMap[this.data.selectedNewsType],
      success: res => {
        let result = res.data.result
        this.setNewsList(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setNewsList(result){
    let length = 0
    let newsList = []
    for (var ever in result) {
      length++;
    }
    for (let i = 0; i < length; i += 1) {
      newsList.push({
        id:result[i].id,
        title:result[i].title,
        date: result[i].date.slice(11,16),
        source: result[i].source === '' ? '未知来源' : result[i].source,
        firstImage: result[i].firstImage === '' ? '/images/default.png' : result[i].firstImage
      })
    }
    this.setData({
      newsList: newsList,
    })
  },
  onTapNewsType(event){
    this.setData({
      selectedNewsType: event.target.dataset.selected,
    })
    this.getNow()
  },
  onTapNewsList(event) {
    wx.navigateTo({
      url: '/pages/list/list?id=' + event.currentTarget.dataset.id,
    })
  },
})