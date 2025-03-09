<template>
  <div class="container">
  <water></water>
  </div>


    <div v-if="isPopupVisible" class="popup">
      <div class="popup-content">
        <img src="../../assets/手机旋转-1.png" alt="手机旋转">
        <p>为了更好的体验，请在浏览器中打开后，将手机/平板横过来</p>
        <div class="btns">
          <button @click="closePopup">不再显示</button>
        <button @click="closePopupTemp">我已知晓</button>
        </div>

      </div>
    </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getFonts } from '@/api/ossFonts.js'  // 引入你请求字体 URL 的函数
import Water from '@/views/water/Water.vue'


onMounted(() => {
  loadFonts()
if (!localStorage.getItem('noShowPopup')) {
  checkOrientation();  // 检测设备方向
  window.addEventListener('resize', checkOrientation);  // 监听屏幕方向变化
}
});
// 定义状态
const isPopupVisible = ref(false);

// 检查设备方向
const checkOrientation = () => {
  const isPortrait = window.innerHeight > window.innerWidth;  // 判断竖屏状态
  if (isPortrait) {
    isPopupVisible.value = true;  // 如果是竖屏，显示弹窗
  } else {
    isPopupVisible.value = false;  // 横屏时隐藏弹窗
  }
};
const closePopup = () => {
  localStorage.setItem('noShowPopup', 'true');  // 保存状态为不再显示
  isPopupVisible.value = false;
};
const closePopupTemp=()=>{
  isPopupVisible.value = false;
}



// 获取字体并应用
const loadFonts = async () => {
  try {
    const fontUrl1 = await getFonts('SourceHanSansCN-Heavy.otf')
    const fontUrl2 = await getFonts('SourceHanSansSC-Medium-2.otf')
    // const fontUrl = response  // 假设返回的格式是 { data: { url: '字体文件 URL' } }
console.log(fontUrl2);
    // 创建 @font-face 样式并将字体应用到全局
    const style = document.createElement('style')
    style.innerHTML = `
      @font-face {
      font-family: 'SourceHanSansCN-Heavy';

        src: url('${fontUrl1}') format('opentype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
      font-family: 'SourceHanSansCN-Medium';

        src: url('${fontUrl2}') format('opentype');
        font-weight: normal;
        font-style: normal;
      }
    `
    document.head.appendChild(style)  // 将样式添加到页面的 <head> 中
  } catch (error) {
    console.error('字体加载失败', error)
  }
}


</script>

<style lang="scss">
.popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1080px;
  background:rgba(68, 76, 99, 0.8); /* 黑色半透明 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.popup-content {
  // background: white;
  height: 800px;
  font-size: 56px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
font-family: SourceHanSansCN-Medium;

  // font-family:;

  // padding: 20px;
  // border-radius: 8px;
  text-align: center;
  img{
    width: 300px;
    height: 300px;
  margin-bottom: 40px;

  }
  // width: 300px;
}

.popup button {
  margin-top: 40px;
  margin-right: 60px;
  padding: 10px 20px;
  background: #D3D3D3;
  // color: white;
  border: none;
  font-size: 40px;
  border-radius: 20px;

}

.container{
  // transform:scale(0.78);/* 根据实际情况调整 */
transform-origin:center top;/* 以左上角为基准缩放*/
// width:100vw;/*确保适应屏幕宽度*/
// height:100vh;/*确保适应屏幕高度*/
// width: 100%;
// height: 100%;
// display: flex;
// justify-content: center;
// align-items: center;

}



</style>
