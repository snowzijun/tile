import Taro from '@tarojs/taro'
// 在蒙版或其他情况下，如果body有滚动条，会影响页面布局，此时需要删除滚动条
let scrollTop
function handleTouchScroll (flag) {
  if (process.env.TARO_ENV !== 'h5') {
    return
  }
  if (flag) {
    scrollTop = document.documentElement.scrollTop

    // 使body脱离文档流
    document.body.classList.add('tile-frozen')

    // 把脱离文档流的body拉上去！否则页面会回到顶部！
    document.body.style.top = `${-scrollTop}px`
  } else {
    document.body.style.top = null
    document.body.classList.remove('tile-frozen')

    document.documentElement.scrollTop = scrollTop
  }
}

export {
  handleTouchScroll
}

