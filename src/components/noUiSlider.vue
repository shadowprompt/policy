<template>
  <div class="slider-container" id="slider">
    <div class="num">{{ Math.floor(value)}}</div>
    <div ref="slider" class="form-range"></div>
    <!-- <p>选择值: {{ value }}</p> -->
  </div>
</template>

<script setup>
import { onMounted, ref ,defineEmits,watch} from 'vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css'; // 引入 noUiSlider 默认样式
const emits=defineEmits(['slider'])
    const value = ref(0); // 当前滑块的值
    const slider = ref(null); // 获取滑块的 DOM 元素

    onMounted(() => {
      noUiSlider.create(slider.value, {
        start: [0], // 初始值
        range: {
          min: [0],
          max: [100],
        },
        connect: [true, false], // 连接滑块的选中范围
        step: 5, // 步长设置为 25
        tooltips: true, // 显示提示
        pips: { // 设置刻度线
          mode: 'steps', // 按步长显示刻度
          stepped: true, // 显示每个步长
          density: 10, // 刻度密度（可选）
          format: {
            to: (value) => {
              // 设置0-25区域只能停在0或25
              if (value <= 35 && value % 25 === 0) {
                return value;
              }
              // 设置25之后，每25为一段
              if (value > 25 && value % 25 === 0) {
                return value;
              }
              return ''; // 其他值不显示
            },
          },
        },
      });

      // 监听滑块值变化
      slider.value.noUiSlider.on('update', (values) => {
        value.value = values[0]; // 更新滑块值

        emits('slider',value.value)
      });
    });
// 监听 value 的变化，更新滑块的位置
watch(value, (n) => {
  if(slider.value.noUiSlider){
    if(n>50&&n<=100)
    slider.value.noUiSlider.set(100);  // 更新滑块位置
  
    else if(n>5&&n<=15){
    slider.value.noUiSlider.set(15);  // 更新滑块位置
    }
    else if(n>=16&&n<=35){
    slider.value.noUiSlider.set(35);  // 更新滑块位置
    }
    else if(n>35&&n<=50){
    slider.value.noUiSlider.set(50);  // 更新滑块位置

    }
    else if(n<=5){
    slider.value.noUiSlider.set(0);  // 更新滑块位置

    }
  }

});
    

</script>

<style scoped lang="scss">
.slider-container{
  width: 210px;
      height: 40px;
      // background-color: wheat;
  position: relative;
  .num{
  position: absolute;
  top: -28px;
left: 110px;

width: 9px;
height: 20px;
color: rgba(31, 144, 255, 1);
font-size: 17px;
text-align: center;
font-family: SourceHanSansCN-Heavy;
}
}


/* 滑块样式 ------------*/
:deep(.noUi-tooltip){
  display: none;
}
.form-range {
  margin: 15px 0 0 22px ;
  height: 10px;
  width: 200px;
}

/* 显示滑块的选中范围 */
:deep(.form-range .noUi-connect) {
  // background: rgba(0, 84, 166, 1);
  background: linear-gradient(to right, #2ECFDE, #109DFA);
  // -webkit-background-clip: text; /* 适用于 Chrome 和 Safari */
  // background-clip: text; 
}

/* 滑块的拖动按钮 */
:deep(.form-range .noUi-handle) {
  height: 20px;
  width: 20px;
  top: -5px;
  right: -9px; /* half the width */
  background: rgba( 34,113,255, 1);
  border-radius: 10px;
  box-shadow: none; /* 添加阴影效果 */
  transition: background-color 0.3s ease; /* 设置过渡效果 */
}

:deep(.noUi-handle){
  &:after{
    display: none;
  }
  &:before{
    display: none;
  }

}

/* 刻度线 */

:deep(.noUi-pips-horizontal) {
  height: 0.5rem;
}
/* 控制较小的刻度线的大小和外观 */
:deep(.form-range .noUi-marker) {
  display: none;
}
/* 控制刻度标签的大小和外观 */
:deep(.form-range .noUi-value) {
  font-size: 12px;  
  font-weight: bold;
  margin-top: -12px; /* 调整标签与刻度线的距离 */
  cursor: pointer;
  user-select: none;
}
/* 调整刻度标签的外边距，使其向内滑动 */
/* select-a */
:deep(.form-range .noUi-value[data-value="0"]) {
  margin-left: 2px;  /* 向内移动 */
}
:deep(.noUi-value[data-value="100"]) {
  left: 95% !important;
}

</style>
