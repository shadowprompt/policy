<template>
  <div class="box">
    <!-- 头部 -->
    <div class="carbon-header">
      <div class="title1">农业减排固碳政策监测与评估系统</div>
    <div class="title1">System for Policies of Emission Reduction and Carbon Sequestration in Agriculture</div>
    <div class="title2">carbon.policies.cn</div>
    <div class="title3" @click="showIntro = true" ><div>系统简介</div></div>
    </div>
    <div class="carbon-second">
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
            <el-select placeholder="湖北省">
      <el-option label="湖北省"
      value="hubei"/></el-select></div>
          <!-- a -->
          <div class="list-a">
            <span class="title-a">种植模式</span>
          </div>
          <!-- c -->
          <div class="list-c">
            <div class="c-mode" v-for="mode in modes" :key="mode.key" 
            :class="{'list-active': mode.key ==plantMode}"
            @click="plantMode=mode.key"
            >{{ mode.name }} </div>
          </div>
          <!-- a -->
          <div class="list-a">
            <span class="title-a">补贴政策</span>
          </div>
          <!-- d -->
          <div class="list-d">
            <div class="d-title" @click="selectedOption='1'" >
              <div class="circle-button" :class="{'circle-button-active': selectedOption === '1' }"></div>
              碳减排量补贴额</div>
            <div class="d-options">
              <div class="choose">
                <el-select placeholder="湖北省" v-model="carbonAmount">
                <el-option 
                v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                /></el-select>
              </div>
              <div class="d-content">元/千克CO₂</div>
            </div>
          </div>
          <div class="list-d">
            <div class="d-title" @click="selectedOption='2'" >
              <div class="circle-button" :class="{'circle-button-active': selectedOption === '2' }"></div>
              氮肥深施补贴比例</div>
            <div class="d-options">
              <div class="choose">
                <el-select  v-model="nitrogenRatio">
                <el-option 
                v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                /></el-select>

              </div>
              <div class="d-content">%</div>
            </div>
          </div>
          <div class="list-d">
            <div class="d-title" @click="selectedOption='3'" >
              <div class="circle-button" :class="{'circle-button-active': selectedOption === '3' }"></div>
              缓释肥补贴比例</div>
            <div class="d-options">
              <div class="choose">
                <el-select  v-model="slowRatio">
                <el-option 
                v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                /></el-select>

              </div>
              <div class="d-content">%</div>
            </div>
          </div>
          <!-- a -->
          <div class="list-a">
            <span class="title-a">运行模式</span>
          </div>
          <!-- c -->
          <div class="list-c">
            <div class="c-mode list-active c-1">多年运行</div>
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
<!--        <div -->
<!--        class="large" :class="[imageList.length <=0?'large':'none-large']">-->

<!--          <img :src="imageList[0]" alt="主图" v-if="imageList.length > 0"-->
<!--          style="object-fit: contain"-->
<!--          @click="previewImage(imageList[0])"-->
<!--          @load="onImageLoad"-->
<!--          :class="[scrollClass]"-->
<!--          > -->
<!--        </div>-->
<!--        <div class="nav"> <midNav/> </div>-->
<!--        -->

<!--        -->
<!--        &lt;!&ndash; <img src="" alt=""> &ndash;&gt;-->
<!--      </div>-->
<!--      <div class="right">-->
<!--        <img v-for="(image,index) in imageList.slice(1)"-->
<!--          :key="index"-->
<!--          :src="image" -->
<!--          @click="previewImage(image)">-->
<!--      </div>-->
      <div class="right-title">
        <span class="title">统计分析</span>
      </div>

    </div>


    <!-- 黑色幕布（点击关闭） -->
    <div v-if="showIntro" class="overlay" @click="showIntro = false">
      <div class="intro" @click.stop>
        <div class="intro-title">农业减排固碳政策监测与评估系统</div>
        <div class="intro-content">
          <p class="title-small">一、基本信息</p>
        <p class="detail">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系统中文名称为农业减排固碳政策监测与评估系统，英文名称为 System for Monitoring and Evaluation of Policies of Emission Reduction and Carbon Sequestration in Agriculture。
          本系统由华中农业大学数字农业研究院农业数字经济团队和农业土地变化研究团队于2024年6月开发。
        </p>
        
        <p class="title-small">二、主要功能</p>
        <p class="detail">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本系统能够监测和事前评估农业种植模式发生改变和实施固碳减排政策所产生的碳减排量和政策成本收益，并将结果在空间网格尺度反映，
          从而精准定位和识别与预期效果不符的区域和政策，为进一步优化农业管理措施、制定农业固碳减排政策提供重要的理论支撑。
        </p>
        
        <p class="title-small">三、适用范围</p>
        <p class="detail">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本系统可以为县、市、省乃至全国尺度的农业管理措施（节水灌溉、氮肥深施、缓释肥施用、秸秆还田）、种植结构优化（冷浸田推行综合种养模式、冬闲田扩种油菜）、
          固碳减排政策评估（碳减排数量补贴、技术补贴）等农业种植模式改革、技术推广、管理措施优化政策提供监测、评估、预测和预警信息。
        </p>
        
        <p class="title-small">四、主要构成</p>
        <p class="detail">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本系统由种植模式变化模拟和固碳减排政策模拟两部分组成。种植模式变化固碳减排模拟的核心模型是 Denitrification-Decomposition model（DNDC模型），
          已被国际生态学界公认为模拟 CO2、CH4 和 N2O 排放最成功的生物地球化学模型之一。DNDC模型由两大部分组成，第一部分包括土壤气候、农作物生长和土壤有机质分解三个子模型，
          第二部分包括硝化作用、反硝化作用以及发酵作用三个子模型。DNDC模型运行依靠气候、土壤、植被和管理四个生态因子驱动，采用的函数来自物理学、化学和生物学的经典法则或实验室研究所产生的经验方程，反应速率统一由米氏方程表达。DNDC模型的模拟时间尺度可少至几日，多至几百年，可模拟的空间尺度从小至单个农田，大至全球尺度。

        </p>
        </div>

      </div>
    </div>

        <!-- 图片放大显示 -->
        <div class="overlay" v-if="showPreview" @click="showPreview=false">
      <div class="ImagePreview" >
          <img :src="previewSrc" alt="放大详情">
      </div>
    </div>

  </div>

    <!-- <div class="themeBg">tan</div> -->
  
  </template>
  

  <style lang="scss" scoped>
  .none-scroll{
  width: 1080px;
      height: 720px;
      img{
        object-fit: contain;

      }
}
      .none-large{
    background: none !important;
  }
  //在传递的图片不符合比例的时候，加滚动条

  .horizontal-scroll {
  max-height: 100%;
  background-color: #fff;

}

.vertical-scroll {
  // overflow-x: hidden; /* 隐藏横向滚动条 */
  max-width: 100%;
}
.nav{
  height: 90px;
    width: 780px;
    margin-left: 198px;
    margin-top: 40px;
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

  .intro{
& ::-webkit-scrollbar{
  display: none;
}
    margin-top: 30px;
width: 1470px;
height: 940px;
// border: 3px solid rgba(255, 255, 255, 1);
background-image: url("@/assets/carbon/简介背景.png");
// background-size: 100% 100%;
// background-size: contain;
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
// 放大图片
.ImagePreview{
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    // margin-left: 10%;
    max-width: 60%;
  max-height: 70%;
  object-fit: contain;
  background-color: #fff;
  }

}

.left-title{
  position: absolute;
  left: 10px;
top: 85px;
width: 375px;
height: 50px;

background-image: url("@/assets/water/一级标题.png");
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
text-align: left;
text-shadow: 2px 4px 0px rgba(39, 85, 149, 0.6);
font-family: SourceHanSansCN-Heavy;
}
 
.left{
  padding: 20px 30px 40px 20px;
  box-sizing: border-box;
  .list-a{
//     left: 55px;
// top: 160px;
    background-image: url("@/assets/water/二级标题.png");
    background-size: 100% 100%;
    width: 300px;
    height: 30px;
    display: flex;
    flex-wrap: nowrap;
    // align-items: center;
    // transform-: ;


    .title-a{
      // position:absolute;
      // left: 70px;
      position: relative;
      top:50%;
  left: 6%;
  transform: translateY(-50%); 
  // top:0;
      // width: 72px;
      // height: 17px;
      color: rgba(255, 255, 255, 1);
      font-size: 17px;
      text-align: center;
      font-family: SourceHanSansCN-Heavy;
    }
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
    margin-top: 20px ;
    margin-bottom: 20px;
    width: 280px;
    height: 90px;
    box-sizing: border-box;
    // padding-left: 4px;
    // background-color: pink;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;

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
  
}
.list-active{
        background: linear-gradient(to right, rgba(0, 51, 255, 0.7), rgba(0, 191, 255, 0.5)) !important ;
        color: white !important;
        border: 1.5px solid white !important;

      }

.right{
  padding: 20px 20px 40px 30px;
  // padding: 0px 0px 0px 10px;

  box-sizing: border-box;
  img{
    width: 300px;
    height: 200px;
    margin-bottom: 50px;
    object-fit: contain;
  }
}
.right-title{
  position: absolute;
  right: 20px;
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
  background-image: url("@/assets/water/背景.png");
  background-size: 100% 100%;
  // background-size: contain;
  background-repeat: no-repeat;
background-color: black;

}
// 头部
.carbon-header{
  width: 100%;
  height: 110px;
  position: relative;


  .title1{
    text-align: center;  
width: 100%;
height: 40px;
color: rgba(255, 255, 255, 1);
font-size: 40px;
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

color: rgba(56, 115, 206, 1);
font-size: 18px;
text-align: left;
font-family: SourceHanSansCN-Heavy;
  }
}

// 第二部分
.carbon-second{
  display: flex;
  height: 936px;
  width: 100%;
  // background-color: #fff;
  overflow: hidden;
  .left{
    width: 340px;
    height: 900px;
    background-image: url("@/assets/carbon/数据框背景.png");
  background-size: 100% 100%;
    // margin:36px 0px 4px 30px;
    margin:36px 0px 4px 18px;

  }
  .mid{
    display: inline-block;
// width: 960px;
height: 884px;
// margin: 56px 45px 0px 45px;
margin: 56px 0px 0px 1px;

// background-color:rgba(39, 85, 149, 0.6);
  }
  .right{
    width: 340px;
    height: 900px;
    background-image: url("@/assets/carbon/数据框背景.png");
  background-size: 100% 100%;
  margin:36px 19px 4px 0px;

    // margin:36px 30px 4px 0px;
  }

}

////
/// 
.large{
  width: 1080px;
      height: 720px;
      position: relative;
      background-color: #fff;
  background: url("@/assets/carbon/地图.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 40px;
  overflow: auto;


      // margin: 10px 20px 0px 230px;
}
///  
/// 
/// 
/// 
// 
// 
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



  .list-d{
  width: 100%;
  height: 85px;
  margin-bottom: 10px;
  // background-color: pink;
  .d-title{
    cursor: pointer;
display: flex;
align-items: center;
width: 100%;
height: 30px;
line-height: 16px;
color: rgba(7, 76, 183, 1);
font-size: 16px;
text-align: left;
font-family: SourceHanSansCN-Medium;
  }
  .d-options{
    display: flex;
    justify-content: baseline;
    align-items:center;
    box-sizing: border-box;
    padding-top: 10px;
    // margin-bottom: 10px;
    .choose{
      margin:0px 0 0 10px;
width: 180px;
height: 40px;

border-radius: 4px;
background-color: rgba(230, 244, 255, 1);
border: 1.5px solid rgba(9, 97, 255, 1);
font-family:SourceHanSansCN-Medium;
font-size: 20px;

    }
    .d-content{
//       left: 250px;
// top: 518px;
margin-left: 10px;
height: 19px;
line-height: 19px;
color: rgba(7, 76, 183, 1);
font-size: 16px;
text-align: left;
font-family: SourceHanSansCN-Medium;
    }
  }
}
.c-1{
  margin-left: 10px;

}
.btn{

width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    .btn-content{
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
  </style>
    <script setup>
    // import Introduction from '@/components/midNav.vue'; 
    // import {Introduction} from '@/components/Introduction.vue';
  import { reactive, toRefs ,ref,computed} from 'vue';
import {resetImageSrc} from "@/utils/ImageSrc";
import {getDatasetsByPredictionId} from '@/api/getImages';

import { ElMessage } from 'element-plus';
    import Chart from '@/views/carbon/Chart.vue';
    import { fetchData } from '@/utils/carbonDataRequest.js';
    const chartRef =ref(null);
    const dataList = ref([]); // 用于存储数据列表
    
  
  // 基本数据
  const modes = [
    { key: '1', name: '稻闲→稻虾' },
    { key: '2', name: '稻油→稻虾' },
    { key: '3', name: '稻麦→稻虾' }
  ];
  const carbons = [
    { key: '1', name: '碳减排量补贴额' },
    { key: '2', name: '氮肥深施补贴比例' },
    { key: '3', name: '缓释肥补贴比例' }
  ];
  const options1 = [
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },

]
const options2 = [
  {
    value: '0.2',
    label: '20',
  },
  {
    value: '0.3',
    label: '30',
  },
  {
    value: '0.4',
    label: '40',
  },
]
const options3 = [
  {
    value: '0.4',
    label: '40',
  },
  {
    value: '0.5',
    label: '50',
  },
  {
    value: '0.6',
    label: '60',
  },
]
  
  const showIntro =ref(false);
  
  const Params2= reactive({
    systemName: 'carbon',
    carbonParams: {
      plantMode: '1', // 种植模式
      carbonAmount: '2', // 碳排放量
      nitrogenRatio: "0.2", // 氮气比例
      slowRatio: "0.4" // 缓释比例
    }
  });
  
  const { plantMode, carbonAmount, nitrogenRatio, slowRatio } = toRefs(Params2.carbonParams);
  const selectedOption=ref('1');
// 图片数据
const imageList = ref([]); // 存储解析后的 Base64 图片
const showPreview = ref(false);//放大图片用到
const previewSrc = ref("");
const loading =ref(false);

// 放大图片预览
const previewImage=(src)=>{
  previewSrc.value = src;
  showPreview.value = true;
}
  

  const finalParams = computed(() => {
  return {
    systemName: "carbon",
    carbonParams: {
      plantMode:plantMode.value, 
      carbonAmount: selectedOption.value === "1" ? carbonAmount.value : null,
      nitrogenRatio: selectedOption.value === "2" ? nitrogenRatio.value : null,
      slowRatio: selectedOption.value === "3" ? slowRatio.value : null
    }
  };
});

// 发送请求
  const checkParams= async () => {
  loading.value=true;

  dataList.value = fetchData(finalParams.value);
  setTimeout(() => {
    loading.value=false;
    chartRef.value.start();
  }, 200)
  return;
  
    try {
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
    ElMessage.error('图片请求失败')

      }
    } catch (error) {
      console.error("请求失败:", error);
    ElMessage.error('图片请求失败')

      loading.value=false;

    }

};
const isHorizontalScroll = ref(false); // 是否显示横向滚动条
const isVerticalScroll = ref(false); // 是否显示横向滚动条
//图片滚动条
const scrollClass = computed(() => {
  if (isHorizontalScroll.value) {
    return 'horizontal-scroll';
  } else if (isVerticalScroll.value) {
    return 'vertical-scroll';
  } else {
    return 'none-scroll';
  }
  // console.log("图片更新了",isHorizontalScroll.value,"heng",isVerticalScroll.value);
});

// 图片加载完成时的事件
const onImageLoad = (event) => {
  const img = event.target;
  const aspectRatio = img.naturalWidth / img.naturalHeight; // 计算宽高比

  if (aspectRatio > 1.65) {
    isHorizontalScroll.value = true;
    isVerticalScroll.value = false; // 宽高比大于1.65，显示横向滚动条
  } else if(aspectRatio <1.35){
    isVerticalScroll.value = true;
    isHorizontalScroll.value = false; // 宽高比小于或等于1.35，显示竖直滚动条
  }
console.log('图片加载完成，宽度：', img.naturalWidth, '高度：', img.naturalHeight);

};
    </script>
    