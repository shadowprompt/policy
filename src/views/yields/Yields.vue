<template>
  <div class="box">
    <!-- 头部 -->
    <div class="carbon-header">
      <div class="title1">大数据驱动的农作物产量估算系统</div>
    <div class="title1">System for Date-driven Estimation and Prediction of Crop Yeilds</div>
    <div class="title2">yields.policies.cn</div>
    <div class="title3" @click="showIntro = true" ><div>系统简介</div></div>
    </div>
    <!-- 下面第二部分 -->
    <div class="carbon-second">

      <!-- 左边 -->

      <div class="left">
        <div class="left-btn" @click="showList=true">
        <div class="btn">参数设置</div>
        </div>
        <div class="left-title">
        <span class="title">统计结果</span></div>
        <div class="list">
          <div class="image-loading2" v-if="loading" ></div>

          <img v-for="(image,index) in imageList.slice(1)"
          :key="index"
          :src="image" 
          @click="previewImage(image)">
          <!-- <img src="" alt=""> -->

        </div>
      </div>
      <!-- 右边 -->
      <div class="right">
        <div class="large"> 
          <div class="image-loading" v-if="loading"></div>

          <img :src="imageList[0]" alt="主图" v-if="imageList.length > 0"
          @click="previewImage(imageList[0])"
          ></div>
        <div class="right-bot">
          <div class="mid-nav">
            <midNav/>
          </div>

        </div>

        <!-- <img src="" alt=""> -->
      </div>

    </div>

        <!-- 简介-->
        <div v-if="showIntro" class="overlay" @click="showIntro = false">
      <div class="intro" @click.stop>
        <div class="intro-title">大数据驱动的农作物产量估算与预测系统</div>
        <div class="intro-content">
          <p class="title-small">一、基本信息</p>
        <p class="detail">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系统中文名称为大数据驱动的农作物产量估算与预测系统，英文名称为System for Date-driven Estimation and Prediction of Crop Yeilds。本系统由华中农业大学数字农业研究院农业大数据团队于2024年3月开发。
        </p>
        
        <p class="title-small">二、主要功能</p>
        <p class="detail">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本系统能查询历史作物产量以及播种面积数据，并利用作物历史产量，天气数据和土壤数据，对未来作物产量进行县域尺度大范围的预测。为粮食安全、宏观调控、粮食贸易、粮食储备等政策制定提供科学依据，保障国家粮食供需平衡和社会稳定。
        </p>
        
        <p class="title-small">三、适用范围</p>
        <p class="detail">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本系统由历史作物产量以及播种面积数据查询模块和未来产量预测模块组成。 其中历史作物产量以及播种面积数据由各市各作物的历史年鉴提供，能直观的展示各作物的历史产业结构分布和产能分布。 未来产量预测模块由基于GNN和RNN的深度学习网络组成，输入数据包括各市历史产量均值，以及各地区天气和土壤数据，通过这些数据可对每一个地区的作物产量进行良好的模拟。除了对历史数据的拟合外，本模块可利用未来天气的预测数据，对未来的作物产量进行预测，以支撑相关政策的制定。
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

    <!-- 参数设置 -->
    <div class="overlay" v-if="showList" @click="showList=false">
      <div class="varList" @click.stop>
        <div class="box1">
          <div class="box1-a">
            <span>政策区域</span></div>
          <div class="box1-a">
            <span>作物选择</span></div>
          <div class="box1-a">
            <span>时间选择</span></div>
        </div>
        <!--  -->
        <div class="box2">
          <div class="box2-a ">
            <el-select placeholder="湖北省">
                <el-option label="湖北省" value="hubei"/></el-select>
                <!-- <el-icon class="svg" size="large"
                  style="color: #0961FF; "><CaretBottom /></el-icon> -->
                </div>

          <div class="box2-b ">
            <div class="b-type " v-for="type in types" :key="type.key" 
            @click="cropType=type.key" :class="{'box2-active':cropType==type.key}"
            >{{type.name}}</div>
          </div>
          <div class="box2-c ">
            <div class="c-task" v-for="task in tasks" :key="task"
            @click="taskSelection=task.key" :class="{'box2-active':taskSelection==task.key}"
            >{{task.name}}</div>
          </div>

        </div>
        <!--  -->
        <div class="box3">
          <div class="box3-a" @click="checkParams">运行</div>
          <div class="loading" v-if="loading"></div>
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
  
  </template>
  
  <script setup>
  import { CaretBottom} from '@element-plus/icons-vue';
  // import { ElMessage } from 'element-plus';
  // import { ElSelect, ElOption } from 'element-plus';
  import {getDatasetsByPredictionId} from '@/api/getImages';
import {reactive, ref,toRef,onMounted} from 'vue'
//解析图像
import {resetImageSrc} from "@/utils/ImageSrc";
import { ElMessage } from 'element-plus';

// 基本数据

const showIntro =ref(false);
const showList =ref(false);
const types=[
  { key: '1', name: '棉花' },
  { key: '2', name: '大豆' },
  { key: '3', name: '玉米' }
]
const tasks= [
  { key: '1', name: '产量' },
  { key: '2', name: '预测' },
  { key: '3', name: '播种面积' }
]

const Params3 =reactive({
  systemName: "output",
  outputParams:{
    cropType: '1',
    taskSelection: '1'
  }
})

const cropType =toRef(Params3.outputParams,'cropType');
const taskSelection =toRef(Params3.outputParams,'taskSelection');

// onMounted(()=>{
//   checkParams();
// })

// 图片数据
const imageList = ref([]); // 存储解析后的 Base64 图片
const showPreview = ref(false);//放大图片用到
const previewSrc = ref("");
const loading =ref(false);

const previewImage=(src)=>{
  previewSrc.value = src;
  showPreview.value = true;
}


// 校验参数并发送请求
const checkParams= async () => {
  loading.value=true;
  if (cropType.value === "1") {
    try {
      const response = await getDatasetsByPredictionId(Params3);
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
  } else {
    ElMessage.warning('暂时仅支持棉花作物！')
    loading.value=false;

    console.log("cropType 不等于 1，无需发送请求");
  }
};

  </script>
  
  <style lang="scss" scoped>

.left-btn{
  width: 354px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  // background-image: url("@/assets/carbon/数据框背景.png");
  // background-size: 100%;
  // background-repeat: no-repeat;
  // overflow: hidden;


  background-color: rgba(240, 246, 255, 0.8);
border: 1.5px solid rgba( 10, 98,255, 1);
  
// margin-bottom: 50px;

.btn{

width: 180px;
height: 50px;
border-radius: 5px;
background-color: rgba(4, 91, 211, 1);
box-shadow: 0px 3px 6px 0px rgba(34, 133, 235, 0.5);
border: 1px solid rgba(255, 255, 255, 1);

// left: 166px;
// top: 139px;
// width: 88px;
// height: 22px;
box-sizing: border-box;
line-height: 50px;
padding-left: 45px;
color: rgba(255, 255, 255, 1);
font-size: 22px;
text-align: left;
font-family: SourceHanSansCN-Heavy;
}
  
}
// @media screen and (max-width: 500px) {
.el-message {
min-width: 300px !important;
}
// }

@media screen and (max-width: 768px) {
  /* 手机端特有样式 */
  // .el-form-item__label {
  //   width: 32px!important;
  // }
  // .el-select.el-input {
  //   width: 120px!important;
  // }
  .el-message {
min-width: 300px !important;
}
}

:deep(.el-select-dropdown__item){
  margin-top:10px ;
}
  :deep(.el-select__wrapper){
    height: 40px;
        border-radius: 5px;
        background-color: rgba(230, 244, 255, 1);
  }
  :deep(.el-select__placeholder.is-transparent){
    color: #4F639E ;
    font-family: SourceHanSansCN-Medium;
    font-size: 17px;
  }
  .svg{

    position: absolute;
    right: 6px;
    top: 6px;

    // z-index: 99;
  }

    
  
.varList{
  width: 1220px;
  height: 320px;
  box-sizing: border-box;
  padding: 60px 60px 60px 50px;
  background-image: url("@/assets/yields/弹窗背景.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
//第一层的盒子们
  .box1{
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  .box1-a{
    width: 315px;
    height: 35px;
    background-image: url("@/assets/water/二级标题.png");
    background-size: 100% 100%;
    position: relative;
    span{
position: absolute;
left: 20px;
width: 72px;
height: 18px;
color: rgba(255, 255, 255, 1);
font-size: 18px;
font-family: SourceHanSansCN-Heavy;
    }
  }
  
  }

  // box2
  .box2{
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 55px;
    font-size: 16px;
    color: rgba(79, 99, 158, 1);

font-family: SourceHanSansCN-Medium;
    .box2-a{
    cursor: pointer;
        width: 220px;
        height: 40px;
        margin-left: 10px;
        border-radius: 5px;
        background-color: rgba(230, 244, 255, 1);
        border: 1.5px solid rgba(9, 97, 255, 1);
        box-shadow: none;
        position: relative;

    }
    .box2-b{
    cursor: pointer;

        width: 320px;
        height: 40px;
        margin-left: 10px;
        // background-color: pink;
        display: flex;
        justify-content: space-around;
        .b-type{
          width: 100px;
          height: 40px;
          border-radius: 5px;
          background-color: rgba(230, 244, 255, 1);
          border: 1.5px solid rgba(9, 97, 255, 1);
          box-sizing: border-box;
    padding-top:7px ;
    text-align: center;
        }
      }
    .box2-c{
    cursor: pointer;

        width: 320px;
        height: 40px;
        // background-color: pink;
        display: flex;
        justify-content: space-around;
        .c-task{
          width: 100px;
          height: 40px;
          border-radius: 5px;
          background-color: rgba(230, 244, 255, 1);
          border: 1.5px solid rgba(9, 97, 255, 1);
          box-sizing: border-box;
    padding-top:7px ;
    text-align: center;
        }
      }

  }
  .box3{
//     left: 840px;
// top: 590px;  
width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    .box3-a{
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
  right: 380px;
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

  }

.box2-active{
        background: linear-gradient(to right, rgba(0, 51, 255, 0.7), rgba(0, 191, 255, 0.5)) !important ;
        color: white;
        border: 1.5px solid white !important;

      }
 

.left-title{
  position:relative;
//   left: 25px;
// top: 80px;
width: 375px;
height: 50px;
margin-top: 20px;
margin-bottom: 20px;
background-image: url("@/assets/yields/一级标题.png");
background-size: 100% 100%;
}
.title{
position:absolute;
top: 4px;
left: 40px;
width: 80px;
height: 20px;
color: rgba(255, 255, 255, 1);
font-size: 20px;
text-align: left;
text-shadow: 2px 4px 0px rgba(39, 85, 149, 0.6);
font-family: SourceHanSansCN-Heavy;
}
 
.left{
  // padding: 20px 30px 40px 20px;
  box-sizing: border-box;
  .a-1{
//     left: 55px;
// top: 160px;
    background-image: url("@/assets/water/二级标题.png");
    background-size: 100% 100%;
    width: 300px;
    height: 30px;
    .title-a{
      position:absolute;
      left: 70px;
      width: 72px;
      height: 18px;
      color: rgba(255, 255, 255, 1);
      font-size: 18px;
      text-align: center;
      font-family: SourceHanSansCN-Heavy;
    }
  }
}




.box{
  width: 100%;
  height: 1080px;
  background-image: url("@/assets/yields/背景.png");
  background-size: contain;
  background-size: 100% 100%;
  background-repeat: no-repeat;
// background-color: black;

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
width: 72px;
height: 18px;
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
    width: 365px;
    height: 900px;
    // background-image: url("@/assets/carbon/数据框背景.png");
  background-size: 100% 100%;
    margin:0px 0px 4px 30px;
    // padding: 20px 30px 40px 20px;
  box-sizing: border-box;
  overflow: hidden;
    .list{
      position: relative;
      height: 750px;
      width: 354px;
    background-image: url("@/assets/yields/数据框背景.png");
  background-size: 100% 100%;
  padding: 20px 30px 40px 20px;
  box-sizing: border-box;
  img{
    width: 300px;
    height: 200px;
    margin-bottom: 50px;
  }
    // margin:36px 0px 4px 30px;
    // margin-top: 50px;
    }
  }
  .right{
    width: 1410px;
    height: 900px;
    // background-color: pink;
    .large{
      width: 950px;
      height: 800px;
      position: relative;
      // background-color: #fff;
      margin: 52px 240px 0px 230px;
  background: url(../../assets/yields/背景数据图片png.png) no-repeat;

      background-size: 100% 100%;

      img{
        width: 960px;
        height: 800px;
        
      }
    }
    .right-bot{
      width: 1410px;
      height: 90px;
      // background-color: hotpink;
      box-sizing: border-box;
      padding-left: 180px;
    }
  .mid-nav{
    height: 90px;
    width: 780px;
    // background-color: blanchedalmond;
  }
  }
}

//简介
.intro {
  margin-top: 30px;
  width: 1470px;
  height: 940px;
  background-image: url("@/assets/carbon/简介背景.png");
  background-size: 100% 100%;
  overflow: auto;
  scrollbar-width: none;
  box-sizing: border-box;
  padding: 50px 0px 40px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & ::-webkit-scrollbar {
    display: none;
  }

  .intro-title {
    line-height: 35px;
    color: rgba(255, 255, 255, 1);
    font-size: 35px;
    text-align: left;
    font-family: SourceHanSansCN-Heavy;
  }

  .intro-content {
    overflow: auto;
    margin: 40px 100px;
    height: 769px;
    color: rgba(255, 255, 255, 1);

    .title-small {
      font-size: 28px;
      font-family: SourceHanSansCN-Heavy;
      margin-bottom: 30px;
    }

    .detail {
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
  background:rgba(68, 76, 99, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.ImagePreview{
  img{
    margin-left: 10%;
    max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  }

}

.image-loading{
      /* 加载提示框 */ 
  position: absolute;
  top: 400px;
  right: 500px;
  display: inline-block;
  margin-left: 8px;
  width: 70px;
  height: 70px;
  border: 10px solid rgba(0, 84, 166, 0.5);
  border-top-color: rgba(0, 84, 166, 1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
// .image-loading2{
//   position: absolute;
//   top: 270px;
//   left: 130px;
//   // right: px;
//   display: inline-block;
//   margin-left: 8px;
//   width: 70px;
//   height: 70px;
//   border: 10px solid rgba(0, 84, 166, 0.5);
//   border-top-color: rgba(0, 84, 166, 1);
//   border-radius: 50%;
//   animation: spin 1s linear infinite;

// }
// @keyframes spin {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(720deg);
//   }}
  </style>