<template>
    <div class="box">
      <!-- 头部 -->
      <div class="carbon-header">
        <div class="title1">农业减排固碳政策监测与评估系统</div>
      <div class="title1">System for Monitoring and Evaluation of Policies of Emission Reduction and Carbon Sequestration in Agriculture</div>
      <div class="title2">carbon.policies.cn</div>
      <div class="title3" @click="showIntro = true" ><div>系统简介</div></div>
      </div>
      <div class="carbon-second">
        <div class="left-title">
          <span class="title">政策详情</span>
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
            <div class="list-d" v-for="(carbon,index) in carbons" :key="index">
              <div class="d-title" @click="selectedOption=carbon.key" >
                <div class="circle-button" :class="{'circle-button-active': selectedOption === carbon.key }"></div>
                {{ carbon.name }}</div>
              <div class="d-options">
                <div class="choose">
                  <el-select placeholder="湖北省" v-model="carbonAmount">
                  <el-option 
                  v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
                  /></el-select>
  
                </div>
                <div class="d-content">内容</div>
              </div>
            </div>
    
  
          </div>
          <div class="btn"></div>
        </div>
        <!-- 中间 -->
        <div class="mid">
          <midNav/>
  
          图片
          <!-- <img src="" alt=""> -->
        </div>
        <div class="right"></div>
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
  
    </div>
      <!-- <div class="themeBg">tan</div> -->
    
    </template>
    
  
    <style lang="scss" scoped>
  
  
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
  background-size: 100% 100%;
  background-size: contain;
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
  
  
  .left-title{
    position: absolute;
    left: 25px;
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
  width: 80px;
  height: 20px;
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
    box-sizing: border-box;
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
    height: 1080px;
    background-image: url("@/assets/water/背景.png");
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
      width: 360px;
      height: 900px;
      background-image: url("@/assets/carbon/数据框背景.png");
    background-size: 100% 100%;
      margin:36px 0px 4px 30px;
    }
    .mid{
      display: inline-block;
  width: 960px;
  height: 884px;
  margin: 56px 45px 0px 45px;
  background-color:rgba(39, 85, 149, 0.6);
    }
    .right{
      width: 360px;
      height: 900px;
      background-image: url("@/assets/carbon/数据框背景.png");
    background-size: 100% 100%;
      margin:36px 30px 4px 0px;
    }
  
  }
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
      margin: 10px 10px 0 10px;
    }
  
    .circle-button-active {
      background-color: #007bff;
    }
  
    .list-d{
    width: 100%;
    height: 85px;
    background-color: pink;
    .d-title{
  
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
      justify-content: center;
      align-items: center;
      background-color: hotpink;
      box-sizing: border-box;
      padding-top: 10px;
      .choose{
        margin:0px 0 0 10px;
  width: 180px;
  height: 40px;
  border-radius: 5px;
  background-color: rgba(230, 244, 255, 1);
  border: 1px solid rgba(9, 97, 255, 1);
  background-color: #fff;
  
  color: rgba(79, 99, 158, 1);
  font-size: 16px;
  // text-align: left;
  font-family: SourceHanSansCN-Medium;
      }
      .d-content{
  //       left: 250px;
  // top: 518px;
  margin-left: 20px;
  width: 81px;
  height: 19px;
  line-height: 19px;
  color: rgba(7, 76, 183, 1);
  font-size: 16px;
  text-align: left;
  font-family: SourceHanSansCN-Medium;
      }
    }
  }
    </style>
      <script setup>
      // import Introduction from '@/components/midNav.vue'; 
      // import {Introduction} from '@/components/Introduction.vue';
    import { reactive, toRefs ,ref} from 'vue';
    
    
    // 基本数据
    const modes = [
      { key: '1', name: '稻闲→稻虾' },
      { key: '2', name: '稻油→稻虾' },
      { key: '3', name: '稻麦→稻虾' }
    ];
    const carbons = [
      {vModel:'carbonAmount',label:'options1', key: '1', name: '碳减排量补贴额' ,content:'元/千克CO₂' } ,
      {vModel:'nitrogenRatio',label:'options2', key: '2', name: '氮肥深施补贴比例',content:'%' },
      {vModel:'slowRatio',label:'options3', key: '3', name: '缓释肥补贴比例' ,content:'%'  }
    ];
    
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
    
    
      </script>
      <!-- 怎么一点就变大？？ -->