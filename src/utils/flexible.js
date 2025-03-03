// flexible.js
(function flexible (window, document) {
  var docEl = document.documentElement//获取根元素
  var dpr = window.devicePixelRatio || 1//获取像素比，devicePixelRatio 表示物理像素与 CSS 像素的比例，通常用于高分辨率屏幕（如 Retina 屏幕）。

  // 调整 body 的字体大小： 根据设备的 devicePixelRatio 设置 body 的字体大小
  function setBodyFontSize () {
    if (document.body) {//Dom加载完成
      document.body.style.fontSize = 12 * dpr + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)//DOMContentLoaded浏览器事件
    }
  }
  setBodyFontSize()

  // 把屏幕平均划分为24等份
  function setRemUnit () {
    var rem = docEl.clientWidth / 24

    docEl.style.fontSize = rem + 'px'
    // console.log(max,min);
  }

  setRemUnit()

  // 在页面大小调整时重新设置 rem 单位
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
      console.log("监听到页面大小调整")
    }
  })

})(window, document)
