// flexible.js
/*
 * @Descripttion: 响应式适配
 * @Author: wangtt
 * @Date: 2024-10-28 09:55:34
 * @LastEditors: wangtt
 * @LastEditTime: 2024-12-02 09:54:47
 */
(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // 调整 body 的字体大小： 根据设备的 devicePixelRatio 设置 body 的字体大小
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // set 1rem = viewWidth / 24  此时我们把屏幕平均划分为24等份
  function setRemUnit () {
    // var rem = docEl.clientWidth / 24
    var rem = docEl.clientWidth / 24

    docEl.style.fontSize = rem + 'px'
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

  // 检测设备是否支持 0.5 像素的边框
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
})(window, document)