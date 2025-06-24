<template>
  <div class="box">
    <!-- 头部 -->
    <div class="water-header">
      <div class="title1">农业水价综合改革政策监测与评估系统</div>
    <div class="title1">System for Policies of Comprehensive Reform of Agricultural Water Prices</div>
    <div class="title2">water.policies.cn</div>
    <div class="title3" @click="showIntro = true"><div>系统简介</div></div>

    </div>
    <div class="water-second">
      <div class="left-title">
        <span class="title">政策情景</span>
      </div>
      <!-- 左边 -->
      <div class="left">
        <div class="list">
          <!-- a -->
          <div class="list-a">
            <span class="title-a">政策区域</span>
          </div>
          <!-- b -->
          <div class="list-b ">
            <el-select placeholder="内蒙古鄂托克前旗">
      <el-option label="内蒙古鄂托克前旗" value="hubei"/></el-select></div>
        <!-- a -->
        <div class="list-a">
            <span class="title-a">政策补贴</span>
          </div>
        <!-- c -->
        <!-- c-1或者c-2是用来调整距离上一部分的距离的，因为会发生margin合并 -->
        <div class="slider-box">
          <noUiSlider @slider="handleSlider1"/>
        </div>

        <div class="list-c c-2" >
          <div class="c-content">补贴对象</div>
          <!-- <div class="line"></div> -->
        </div>
        <!-- g -->
        <div class="list-g" v-for="(item,index) in Options" :key="index" @click="chooseObject(item.key)">
          <div class="circle-button"
          :class="{'circle-button-active': subsidyObject === item.key }">
              </div>{{ item.name }}
        </div>
        <!-- a -->
        <div class="list-a a-3">
            <span class="title-a">用水管理</span>
          </div>
          <!-- d -->
        <div class="list-d c-1">
          <div class="d-content">水价梯度</div>
          <div class="d-btn">
            <el-select placeholder="0" v-model="waterGrad">
                <el-option
                v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                /></el-select>
          </div>

        </div>
        <div class="list-d">
          <div class="d-content">水价标准</div>
          <div class="d-input-container">
            <div class="d-input" v-for="item in inputNum" :key="item">
          <input type="text"  :disabled="waterGrad === '0'">
          </div>
          </div>

        </div>
        <div class="list-d">
          <div class="d-content">水价临价</div>
          <div class="d-input-container">
            <div class="d-input" v-for="item in inputNum" :key="item">
          <input type="text" :disabled="waterGrad === '0'">
          </div>
          </div>

        </div>

        <!-- a -->
        <div class="list-a">
            <span class="title-a">运行模式</span>
          </div>
        <!-- e -->
        <div class="list-e">
          <div class="e-btn" @click="runYear='1'" :class="{'list-active':runYear==='1'}">一年运行</div>
          <div class="e-btn" @click="runYear='2'" :class="{'list-active':runYear==='2'}">多年运行</div>
        </div>

        </div>

        <div class="btn">
          <div class="btn-content" @click="checkParams">运行</div>
          <div class="loading" v-if="loading"></div>
        </div>
      </div>
      <!-- 中间 -->
      <chart :dataList="dataList" ref="chartRef"></chart>
<!--      <div class="mid">-->
<!--        <div-->
<!--        class="large"-->
<!--        :class="[imageList.length <=0?'large':'none-large']">-->
<!--          <img :src="imageList[0]" alt="主图" v-if="imageList.length > 0"-->
<!--          style="object-fit: contain"-->
<!--          @click="previewImage(imageList[0])"-->
<!--          @load="onImageLoad"-->
<!--          :class="[scrollClass]"-->
<!--          >-->
<!--        </div>-->
<!--        <div class="nav">-->
<!--        <midNav/>-->
<!--        </div>-->
<!--        &lt;!&ndash; <img src="" alt=""> &ndash;&gt;-->
<!--      </div>-->
<!--      <div class="right">-->
<!--        <img v-for="(image,index) in imageList.slice(1)"-->
<!--          :key="index"-->
<!--          :src="image"-->
<!--          @click="previewImage(image)">-->
<!--      </div>-->
      <div class="right-title">
        <span class="title">统计分析</span>
      </div>

    </div>

    <!-- 简介幕布 -->
    <div v-if="showIntro" class="overlay" @click="showIntro = false">
      <div class="intro" @click.stop>
        <div class="intro-title">农业水价综合改革政策监测与评估系统</div>
        <div class="intro-content">
          <p class="title-small">一、基本信息</p>
        <p class="detail">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系统中文名称为农业水价综合改革政策监测与评估系统，英文名称为 System for Monitoring and Evaluation of Policies of Comprehensive Reform of Agricultural Water Prices。
          本系统由华中农业大学数字农业研究院农业数字经济团队于2024年6月开发。
        </p>

        <p class="title-small">二、主要功能</p>
        <p class="detail">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;农业水价综合改革政策事前评估 农业水价综合改革政策效果监测、预测与预警
        </p>

        <p class="title-small">三、适用范围</p>
        <p class="detail">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本系统可以为县、市、省乃至全国层面的用水管理（征收水费、水资源税）、节水奖励、节水措施补贴等农业水价综合改革政策提供监测、评估、预测和预警信息。
        </p>

        <p class="title-small">四、主要构成</p>
        <p class="detail">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本系统的核心模型是农户个体决策模型，采用模块化农户决策模拟器模块化决策模拟器（Modular Decision-making Simulator, 简称MoDemS），详见 https://gitee.com/socialsimulation/MoDemS
        </p>
        </div>

      </div>
    </div>

        <!-- 图片放大显示 -->
        <div class="overlay overlay-image" v-if="showPreview" @click="showPreview=false">
      <div class="ImagePreview" >
          <img :src="previewSrc" alt="放大详情">
      </div>
    </div>

  </div>

    <!-- <div class="themeBg">tan</div> -->

  </template>

  <script setup>
  import {reactive, ref,toRefs,watch,computed} from 'vue'
  import { ElMessage } from 'element-plus';
  import {getDatasetsByPredictionId} from '@/api/getImages';
  import {resetImageSrc} from "@/utils/ImageSrc";
  import Chart from '@/views/water/Chart.vue'
  import { fetchData } from '@/utils/waterDataRequest.js'


  const showIntro =ref(false);
  const chartRef =ref(null);
const options = [
{
    value: '0',
    label: '0',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '4',
    label: '4',
  },
]

// const subsidyObject=ref(0)
const Options=[
  {key:1,name:'随机确定补贴对象'},
  {key:2,name:'按社会网络确定补贴对象'},
]

// 输入框个数
const inputNum = computed(() => {
      return waterGrad.value === '0'? 2 : parseInt(waterGrad.value);
    });
const chooseObject=(key)=>{
  if(subsidyObject.value===key){
    subsidyObject.value=0;
  }
  else{
    subsidyObject.value=key;
  }
}
const Params2 = reactive({
  systemName: "water",
  waterParams: {
    policySubsidyRadio: 0.00, // 补贴比例，小数形式
    subsidyScope: 0.0, // 补贴范围，小数形式
    subsidyObject: 0, // 补贴对象
    waterGrad: "0", // 水价梯度
    runYear: "1" ,// 运行年份
    waterPriceStandard: [""], // 水价标准数组
    waterLimit: [""], // 水量临界数组
  }
})

const dataList = ref([]); // 用于存储数据列表

// 使用 toRefs 来解构 waterParams
const { policySubsidyRadio, subsidyScope, subsidyObject, waterGrad, waterPriceStandard, waterLimit, runYear } = toRefs(Params2.waterParams);


const loading=ref(false);

  const handleSlider1 = (twoRadio) => {
  policySubsidyRadio.value = twoRadio.Avalue/100.0; // 更新父组件中的滑块值
  // console.log(policySubsidyRadio.value,'huqsic');
  // console.log(twoRadio);
  subsidyScope.value = twoRadio.Bvalue/100.0; // 更新父组件中的滑块值

};


watch(policySubsidyRadio,(a,b)=>{
  console.log(a,b);
}, { deep:true });

// 图片数据
const imageList = ref([]); // 存储解析后的 Base64 图片
const showPreview = ref(false);//放大图片用到
const previewSrc = ref("");

const previewImage=(src)=>{
  previewSrc.value = src;
  showPreview.value = true;
}
// const policySubsidyRadio.value =policySubsidyRadio%100;
// 封装获取水价参数的函数
const finalParams = computed(() => {
  // 特殊性限制

  return {
  systemName: "water",
    waterParams: {
      policySubsidyRadio: policySubsidyRadio.value,
      subsidyScope: subsidyScope.value,
      subsidyObject: subsidyObject.value,
      waterGrad:waterGrad.value,
      waterPriceStandard:waterPriceStandard.value,
      waterLimit:waterLimit.value,
      runYear: runYear.value,
    }
  };
});

const checkParams= async ()=>{
  console.log(finalParams.value);
  if (policySubsidyRadio.value == 0 && subsidyScope.value != 0) {
    ElMessage.warning("补贴比例为0%时，补贴范围仅能选择0%");
    throw new Error("无此数据组");
  }
  if (subsidyScope.value == 0 && subsidyObject.value != 0) {
    ElMessage.warning("补贴范围为0%时，补贴对象不能选择");
    throw new Error("无此数据组");
  }
  if ((policySubsidyRadio.value == 0.35 || policySubsidyRadio.value == 0.5) && subsidyScope.value != 1) {
    ElMessage.warning("补贴比例为35%/50%时，补贴范围仅能选择100%");
    throw new Error("无此数据组");
  }
  if ((policySubsidyRadio.value == 1) && (subsidyScope.value != 0.1 && subsidyScope.value != 0.15)) {
    ElMessage.warning("补贴比例为100%时，补贴范围仅能选择10%/15%");
    throw new Error("无此数据组");
  }
  if ((policySubsidyRadio.value == 1) && subsidyObject.value == 0) {
    ElMessage.warning("补贴比例为100%时，必须选择补贴对象");
    throw new Error("无此数据组");
  }
  if(subsidyScope.value == 1&&subsidyObject.value !=0){
    ElMessage.warning("补贴范围为1时,补贴对象不用选择");
  throw new Error("无此数据组");
  }


  loading.value=true;

  dataList.value = fetchData(finalParams.value);
  setTimeout(() => {
    loading.value=false;
    chartRef.value.start();
  }, 200)
  return;

  try{
    const response = await getDatasetsByPredictionId(finalParams.value);


    console.log("请求成功:", response);

    // 处理 Base64 图片
    const base64Images = response?.data?.base64Images || [];
    if (base64Images.length > 0) {
      imageList.value = base64Images.map((base64) => resetImageSrc(base64));

    ElMessage.success('操作成功！')
    loading.value=false;

    } else {
      console.error("后端返回的图片列表为空");
    loading.value=false;
  ElMessage.error('参数不符合规范，图片请求失败')

    }
  } catch (error) {
    console.error("请求失败:", error);
  ElMessage.error('图片请求失败')

    loading.value=false;

  }


}

//图片滚动条
const scrollClass = computed(() => {
  if (isHorizontalScroll.value) {
    return 'horizontal-scroll';
  } else if (isVerticalScroll.value) {
    return 'vertical-scroll';
  } else {
    return 'none-scroll';
  }
});
const isHorizontalScroll = ref(false); // 是否显示横向滚动条
const isVerticalScroll = ref(false); // 是否显示横向滚动条
// 图片加载完成时的事件
const onImageLoad = (event) => {
  const img = event.target;
  const aspectRatio = img.naturalWidth / img.naturalHeight; // 计算宽高比

  // 当宽高比大于1.5时，显示横向滚动条；宽高比等于或小于1.5时，显示竖直滚动条
  if (aspectRatio > 1.65) {
    isHorizontalScroll.value = true;
    isVerticalScroll.value = false; // 宽高比大于1.5，显示横向滚动条
  } else if(aspectRatio <1.35){
    isVerticalScroll.value = true;
    isHorizontalScroll.value = false; // 宽高比小于或等于1.5，显示竖直滚动条
  }
console.log('图片加载完成，宽度：', img.naturalWidth, '高度：', img.naturalHeight);

};
  </script>

  <style lang="scss" scoped>
  .none-large{
    background: none !important;
  }
.horizontal-scroll {
  max-height: 100%;
  background-color: #fff;

}

.vertical-scroll {
  // overflow-x: hidden; /* 隐藏横向滚动条 */
  max-width: 100%;
}
.none-scroll{
  width: 1080px;
      height: 720px;
}

.list-g{
    width: 100%;
    height: 30px;
    // font-size: 16px;
    cursor: pointer;
display: flex;
align-items: center;
// width: 100%;
// height: 30px;
line-height: 16px;
// color: rgba(7, 76, 183, 1);
color: rgba(79, 99, 158, 1);
font-size: 16px;
text-align: left;
font-family: SourceHanSansCN-Medium;

  }

// 圆形选中按钮
.circle-button {
  display: inline-block;
    width: 16px;
    height: 16px;
    background-color: white;
    border: 2px solid #007bff;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
    margin: 0px 10px 0 10px;
  }

  .circle-button-active {
    background-color: #007bff;
  }





    :deep(.el-select__wrapper){
    // background-color: pink ;
    height: 40px;
        border-radius: 5px;
        background-color: rgba(230, 244, 255, 1);
        // border: 1.25px solid rgba(9, 97, 255, 1);
        // z-index: 99;
        color: #4F639E ;
  }
  :deep(.el-select__placeholder.is-transparent){
    color: #4F639E ;

    font-family: SourceHanSansCN-Medium;
    font-size: 17px;
  }
.left-title{
  position: absolute;
  left: 20px;
top: 96px;
width: 375px;
height: 50px;

background-image: url("@/assets/carbon/一级标题.png");
background-size: 100% 100%;
}
.title{
position:absolute;
top: 10px;
left: 50px;
// width: 80px;
// height: 20px;
color: rgba(255, 255, 255, 1);
font-size: 20px;
// text-align: left;
text-shadow: 2px 4px 0px rgba(39, 85, 149, 0.6);
font-family: SourceHanSansCN-Heavy;
}

.left{
  position: relative;
  padding: 20px 30px 40px 20px;
  box-sizing: border-box;
  overflow: hidden;
  .list-a{
//     left: 55px;
// top: 160px;
    background-image: url("@/assets/water/二级标题.png");
    background-size: 100% 100%;
    width: 300px;
    height: 30px;
    display: flex;
    flex-wrap: nowrap;
  // justify-content: center; /* 水平靠左 */
  // align-items: center; /* 竖直居中 */

    .title-a{
      position:relative;
      // left: 70px;
      top:50%;
  left: 6%;
  transform: translateY(-50%);
      // width: 72px;
      // height: 17px;
      color: rgba(255, 255, 255, 1);
      font-size: 17px;
      // text-align: center;
      font-family: SourceHanSansCN-Heavy;
    }
  }
  .a-3{
    margin-top: 20px;
  }
  .list-b{
margin-top: 10px;
margin-bottom: 20px;
width: 300px;
height: 40px;
border-radius: 5px;
background-color: rgba(230, 244, 255, 1);
border: 1.5px solid rgba(9, 97, 255, 1);
font-family:SourceHanSansCN-Medium;
font-size: 18px;
    color: #4F639E;
    text-align: center;
    cursor: pointer;
  }
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
    flex-wrap: wrap;
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
  .c-2{
    height: 20px;
    margin-top: -20px;
  }
  .list-d{
    // width: 100%;
    height: 40px;
    // background-color: pink;
    border-top: 1px solid transparent;
    display: flex;
    margin-bottom: 20px;
    &:nth-child(10){
    margin-top: 10px;
    }

    .d-content{
      height: 40px;
      width: 68px;
      margin-right: 26px;

color: rgba(79, 99, 158, 1);
font-size: 16px;
text-align: center;
padding: 6px 5px 0 15px;
font-family: SourceHanSansCN-Medium;
    }
    .d-btn{
      width: 180px;
      height: 40px;
      font-size: 20px;
      // background-color: hotpink;
      background-color: rgba(230, 244, 255, 1);
border: 1.5px solid rgba(9, 97, 255, 1);
border-radius: 5px;
    }
    .d-input-container{
      width: 180px;
      display: flex;
      gap: 5px;
      // flex: 1;
      .d-input{
        flex: 1;
      font-size: 20px;
      color: #4F639E;
      // background-color: hotpink;
      background-color: rgba(230, 244, 255, 1);
border-radius: 5px;
// max-width: 70px;
// min-width: 30px;
// margin-right: 10px;
border: 1.5px solid rgba(9, 97, 255, 1);

height: 34px;
input{
  width: 80%;
  height: 80%;
  flex: 1;
border-radius: 10px;

  background-color: rgba(230, 244, 255, 1);
  &:disabled{
    cursor: not-allowed;
  }
}
      // &:nth-child(2){
      //   margin-right: 20px;
      // }
    }
    }
//     .d-input{
//       // font-size: 20px;
//       // color: #4F639E;
//       // background-color: hotpink;
//       background-color: rgba(230, 244, 255, 1);
// border-radius: 5px;
// max-width: 70px;
// // min-width: 30px;
// // margin-right: 10px;
// // height: 34px;
// input{
// // border: 1.5px solid rgba(9, 97, 255, 1);

// }
//       // &:nth-child(2){
//       //   margin-right: 20px;
//       // }
//     }
  }
  .list-e{
    height: 40px;
    // background-color: #fff;
    display: flex;
    margin-top: 10px;
    .e-btn{
      width: 120px;
      height: 40px;
      margin-left: 20px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;

          border-radius: 5px;
          background-color: rgba(230, 244, 255, 1);
          border: 1.5px solid rgba(9, 97, 255, 1);
          // border: 1px solid rgba(255, 255, 255, 1);
          box-sizing: border-box;
    font-size: 16px;
    color: rgba(79, 99, 158, 1);

font-family: SourceHanSansCN-Medium;
    }
  }


}

.list-active{
        background: linear-gradient(to right, rgba(50, 213, 218, 1), rgba(13, 153, 255, 1)) !important ;
        color: white !important;
        border: 1.5px solid white !important;

      }
.btn{
width: 100%;
    display: flex;
    justify-content: center;
position: relative;
margin-top: 100px;
    // position: absolute;
    // bottom: 40px;
    // left: 5px;
.btn-content{
  box-shadow: 0px 3px 6px 0px rgba(34, 133, 235, 0.5);
    cursor: pointer;

width: 240px;

      height: 50px;
border-radius: 5px;
background-color: rgba(4, 91, 211, 1);
box-shadow: 0px 3px 6px 0px rgba(34, 133, 235, 0.5);
border: 1px solid rgba(255, 255, 255, 1);
font-size: 19px;
text-align: center;
font-family: SourceHanSansCN-Medium;
color: white;
box-sizing: border-box;
    padding-top:9px ;
    text-align: center;
    }
    .loading{
      /* 加载提示框 */
  position: absolute;
  top: 15px;
  right: -5px;
  // right: 380px;
  display: inline-block;
  margin-left: 8px;
  width: 20px;
  height: 20px;
  border: 4px solid rgba(0, 84, 166, 0.5);
  border-top-color: rgba(0, 84, 166, 1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(720deg);
  }

    }
}


.right-title{
  position: absolute;
  right: -16px;
top: 96px;
width: 375px;
height: 50px;

background-image: url("@/assets/carbon/一级标题.png");
background-size: 100% 100%;

}




.box{
  width: 100%;
  // width: 1920px;
  height: 1070px;
  background-image: url("@/assets/carbon/背景.jpg");
  background-size: contain;
  background-size: 100% 100%;
  background-repeat: no-repeat;
background-color: black;

}
// 头部
.water-header{
  width: 100%;
  height: 110px;
  position: relative;


  .title1{
    text-align: center;
width: 100%;
height: 38px;
color: rgba(255, 255, 255, 1);
font-size: 38px;
  text-shadow: 4px 2px  4px rgba(4, 95, 224, 0.9);
font-family: SourceHanSansCN-Heavy;

  &:nth-child(2){
      font-size: 18px;
      padding-top: 25px;
      line-height: 18px;
  }
  }

  .title2{
    position:absolute;
    left: 30px;
    top: 40px;
    width: 212px;
    height: 18px;
    color: rgba(56, 115, 206, 1);
    font-size: 18px;
    text-align: left;
    font-family: SourceHanSansCN-Heavy;
  }
  .title3{
    cursor: pointer;
    position: absolute;
right: 40px;
top: 40px;
// width: 72px;
// height: 18px;
color: rgba(56, 115, 206, 1);
font-size: 18px;
text-align: left;
font-family: SourceHanSansCN-Heavy;
  }
}

// 第二部分
.water-second{
  display: flex;
  height: 936px;
  width: 100%;
  // background-color: #fff;
  overflow: hidden;
  .left{
    width: 340px;
    // height: 900px;
    background-image: url("@/assets/carbon/数据框背景.png");
  background-size: 100% 100%;
    margin:36px 0px 4px 18px;
  }
  .mid{
    display: inline-block;
// width: 960px;
height: 884px;
margin: 56px 0px 0px 1px;
// background-color: pink;
  }
  .right{
    width: 340px;
    height: 900px;
    background-image: url("@/assets/carbon/数据框背景.png");
  background-size: 100% 100%;
    margin:36px 19px 4px 0px;
    position: absolute;
    right: 0;
  }

}

.intro{
& ::-webkit-scrollbar{
  display: none;
}
    margin-top: 30px;
width: 1470px;
height: 940px;
// border: 3px solid rgba(255, 255, 255, 1);
background-image: url("@/assets/carbon/简介背景.png");
background-size: 100% 100%;
overflow: auto; /* 自动出现滚动条 */
scrollbar-width: none;

    box-sizing: border-box;
    // background-color: #fff;
    padding: 50px 0px 40px 0px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    .intro-title{
line-height: 35px;
color: rgba(255, 255, 255, 1);
font-size:35px;
text-align: left;
font-family: SourceHanSansCN-Heavy;
}
.intro-content{
  overflow: auto; /* 自动出现滚动条 */
  margin:40px 100px 40px 100px;
  // width: 1410px;
height: 769px;

color: rgba(255, 255, 255, 1);

.title-small{
  font-size: 28px;
font-family: SourceHanSansCN-Heavy;
margin-bottom: 30px;


}
.detail{
  font-size: 25px;
  margin-bottom: 30px;
}
}
  }

    /* 黑色幕布 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1080px;
  background:rgba(68, 76, 99, 0.5); /* 黑色半透明 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
// .overlay-image{
//   background-color:rgb(255,255,255);
//   background:rgba(68, 76, 99, 0.8); /* 黑色半透明 */

// }
// 放大图片
.ImagePreview{
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    // margin-left: 10%;
    max-width: 60%;
  max-height: 80%;
  object-fit: contain;
  background-color:rgb(255,255,255);


  }

}
  </style>
