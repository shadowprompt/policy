<template>
  <div class="list-c c-1">
          <div class="c-content">补贴比例</div>
          <div class="line">
            <div class="slider-container" id="Aslider">
                <div class="num">{{ Math.floor(Avalue)}}</div>
                <div ref="Aslider" class="form-range"></div>
              </div>
          <!-- <noUiSlider  @slider="handleSlider1"/> -->

          </div>
        </div>

        <!-- 第二个滑块 -->
 <div class="list-c">
          <div class="c-content">补贴范围</div>
          <div class="line">
            <div class="slider-container" id="Bslider">
                <div class="num">{{ Math.floor(Bvalue)}}</div>
                <div ref="Bslider" class="form-range"></div>
              </div>
          </div>
        </div>

</template>

<script setup>
import { onMounted, ref ,defineEmits,watch, reactive,toRefs} from 'vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css'; // 引入 noUiSlider 默认样式
const emits=defineEmits(['slider'])
const data=reactive({
  Avalue:0,
  Bvalue:0
})
    const {Avalue,Bvalue} = toRefs(data); // 当前滑块的值
    // const Bvalue = ref(0); // 当前滑块的值
    const Aslider = ref(null); // 获取滑块的 DOM 元素
    const Bslider = ref(null); // 获取滑块的 DOM 元素

    onMounted(() => {
      noUiSlider.create(Aslider.value, {
        start: [0], // 初始值
        range: {
        'min': 0,
        '30%': 35,
        '50%': 50,
        'max': 100
      },
        connect: [true, false], // 连接滑块的选中范围
        // step: 5, // 步长设置为 25
        tooltips: true, // 显示提示
        pips: {
        mode: 'values',
        values: [0, 35, 50, 100],
        density: 4
      }
      });
      noUiSlider.create(Bslider.value, {
        start: [0], // 初始值
        range: {
        'min': 0,
        '15%':10,
        '30%': 15,
        // '50%': 50,
        'max': 100
      },
        connect: [true, false], // 连接滑块的选中范围
        // step: 5, // 步长设置为 25
        tooltips: true, // 显示提示
        pips: {
        mode: 'values',
        values: [0, 10, 15, 100],
        density: 4
      }
      });
  // 获取刻度条数字并为其绑定点击事件
  const ApipValues = Aslider.value.querySelectorAll('.noUi-value');
  const BpipValues = Bslider.value.querySelectorAll('.noUi-value');


  ApipValues.forEach(value => {
    value.addEventListener('click', () => {
      const valueToSet = parseFloat(value.getAttribute('data-value'));
      Aslider.value.noUiSlider.set(valueToSet); // 更新滑块的值
      // console.log(Avalue.value,"Avalue.value变了");
      // emits('slider', data); // 触发 slider 事件
    });
  });

  BpipValues.forEach(value => {
    value.addEventListener('click', () => {
      const valueToSet = parseFloat(value.getAttribute('data-value'));
      // console.log(Avalue.value,"Bvalue.value变了");

      Bslider.value.noUiSlider.set(valueToSet); // 更新滑块的值
      
      // emits('slider', data); // 触发 slider 事件
    });
  });
      // 监听滑块值变化
      Aslider.value.noUiSlider.on('update', (values) => {
        Avalue.value = values[0]; // 更新滑块值
        // console.log(Avalue.value,);
        // emits('slider', data); // 触发 slider 事件

        // emits('slider',value.value)
      });
      Bslider.value.noUiSlider.on('update', (values) => {
        Bvalue.value = values[0]; // 更新滑块值
        // emits('slider', data); // 触发 slider 事件

        // emits('slider',value.value)
      });
    });


// 监听 value 的变化，更新滑块的位置
watch(Avalue, (n) => {
  if(Aslider.value.noUiSlider){
    if(n>50&&n<=100)
    Aslider.value.noUiSlider.set(100);  // 更新滑块位置
  
    else if(n>5&&n<=35){
    Aslider.value.noUiSlider.set(35);  // 更新滑块位置
    }
    else if(n>35&&n<=50){
    Aslider.value.noUiSlider.set(50);  // 更新滑块位置

    }
    else if(n<=5){
    Aslider.value.noUiSlider.set(0);  // 更新滑块位置

    }
  }
  // emits('slider', data); // 触发 slider 事件


});
    
watch(Bvalue, (n) => {
  if(Bslider.value.noUiSlider){
    if(n>15&&n<=100)
    Bslider.value.noUiSlider.set(100);  // 更新滑块位置
  
    else if(n>10&&n<=15){
    Bslider.value.noUiSlider.set(15);  // 更新滑块位置
    }
    else if(n>5&&n<=10){
    Bslider.value.noUiSlider.set(10);  // 更新滑块位置

    }
    else if(n<=5){
    Bslider.value.noUiSlider.set(0);  // 更新滑块位置

    }
  }
  // emits('slider', data); // 触发 slider 事件

});
    
watch(data,()=>{
  
    data.Avalue=Avalue.value;
  data.Bvalue=Bvalue.value;
  // console.log(data);
  emits('slider', data); // 触发 slider 事件
},{deep:true});
</script>

<style scoped lang="scss">
.list-c{
    // margin-top: 20px ;
    // margin-bottom: 20px;
    width: 100%;
    height: 50px;
    // background-color: pink;
    box-sizing: border-box;
    margin-bottom: 20px;
    // padding-left: 4px;
    // background-color: pink;
    display: flex;
    flex-wrap: nowrap;
    // justify-content: space-around;

    .c-content{
      height: 40px;
      // width: px;
      // margin-right: 26px;
      

color: rgba(79, 99, 158, 1);
font-size: 16px;
text-align: center;
padding: 10px 10px 0 6px;
font-family: SourceHanSansCN-Medium;
    }
    .line{
      width: 210px;
      height: 50px;
      // background-color: #fff;

    }
    .c-mode{
      cursor: pointer;
      margin-right: 20px;
      margin-bottom: 10px;
      width: 120px;
          height: 40px;
          // line-height: 40px;
          border-radius: 5px;
          background-color: rgba(230, 244, 255, 1);
          border: 1.5px solid rgba(9, 97, 255, 1);
          box-sizing: border-box;
    padding-top:7px ;
    text-align: center;
    font-size: 16px;
    color: rgba(79, 99, 158, 1);

font-family: SourceHanSansCN-Medium;
    }


  }
  .c-1{
    // height: 30px;
    margin-top: 10px;
  }

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
