<template>
  <!-- 标题 -->
<div class="box" >
  <div class="home-title">
    <div class="title1">数字化农业政策支持平台</div>
    <div class="title1">Digitial Agricultural Policies Support (DAPoS)</div>
  </div>
  <!-- 中间部分 -->
  <div class="home-second">
    <!-- 中间图 -->
    <div class="home-mid">
      <img src="../../assets/home/中心元素.png" alt="地球图标">

      <div class="mid-image">
        <div class="mid-image1 img1"><router-link class="btn" to="/carbon"> <p>减排固碳政策</p> 
              <img src="../../assets/home/底座.png" alt="底座">
            </router-link></div>
            <div class="mid-image1"><router-link class="btn" to="/water"><p>水价改革政策</p>
              <img src="../../assets/home/底座.png" alt="底座">
            
            </router-link></div>
            <div class="mid-image1"><router-link class="btn" to="/yields"><p>大数据作物估产</p>
              <img src="../../assets/home/底座.png" alt="底座">
            
            </router-link></div>
      </div>
    </div>
    <!-- 底部文字 -->
    <div class="home-bottom">
      <div class="footer">华中农业大学数组农业研究院 研制</div>
      <div class="footer">www.police.cn</div>
      <p></p>
    </div>
  </div>
</div>
  <!-- <div class="themeBg" ref="themeBgRef"></div> -->

</template>

<script setup>
import { ref, onMounted } from 'vue';

// const themeBgRef = ref(null);
// const themeBgSize = ref(null);

// onMounted(() => {
//   if (themeBgRef.value) {
//     const rect = themeBgRef.value.getBoundingClientRect();
//     themeBgSize.value = {
//       width: rect.width,
//       height: rect.height
//     };
//     console.log('themeBg 宽度:', rect.width, 'px, 高度:', rect.height, 'px');
//   }
// });

</script>

<style lang="scss" scoped>
//
.mid-image{
  display: flex;
  position: absolute;
  top: 535px;
  left: 410px;
  width: 980px;
  height: 310px;
  // position: re;
  // background-color: #fff;
}
.mid-image1{
  height: 170px;
  position: absolute;
  a{
width: 240px;
height: 40px;
color: rgba(255, 255, 255, 1);
font-size: 40px;
font-family: SourceHanSansCN-Heavy;

 -webkit-text-stroke: 1.5px #007eff;
//  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
//  text-shadow: -2px 3px 0px rgba(157,208,243, 0.5);




  }
  .btn{
width: 240px;
height: 40px;

// background-color: #fff;
    img{
      width: 250px;
      height: 150px;
      object-fit: contain;
    }
    p{
      margin-bottom: -20px;
//  color: transparent; 
  font-size: 40px;
  font-family: SourceHanSansCN-Heavy;
  color: rgb(212,249,255);
  text-shadow: -1px 4px 0px black;
  // background: linear-gradient(to bottom, #FFFFFF, #CFF8FF);
  // -webkit-background-clip: text; /* 适用于 Chrome 和 Safari */
  // background-clip: text; /* 适用于 Firefox */
    }

  }
  &:nth-child(1){
    
    left: -24px;
    top: 5px;
  }
  &:nth-child(2){
    bottom: 35px;
    left: 380px;
  }
  &:nth-child(3){
    right: -45px;
    top: -10px;

  }
}

///
.box{
  // width: 1920px;
  width: 100%;
  background-image: url("@/assets/home/背景.png");
  background-size: contain;
  background-size: 100% 100%;
  background-repeat: no-repeat;
// background-color: black;

}

.home-title{
  width: 100%;
  height: 110px;
  display: flex;
  flex-direction: column;

  .title1{
    text-align: center;  
width: 100%;
height: 45px;
color: rgba(255, 255, 255, 1);
font-size: 45px;
  text-shadow: 4px 2px  4px rgba(4, 95, 224, 0.9);
font-family: SourceHanSansCN-Heavy;

  &:nth-child(2){
      font-size: 30px;
      padding-top: 25px;
      line-height: 30px;
  }
  }
}



.home-second{

  width: 100%;
}
.home-mid{
  width: 100%;
  height: 825px;
  display: flex;
  flex-direction: column;

  img{
    margin: 0 auto;
    width: 980px;
    object-fit: contain;
  }

}

.home-bottom{
  width: 100%;
  height: 124px;
  // position: absolute;
  // bottom: 50px;

  .footer{
    width: 100%;
    padding: 8px 0;
    color: rgba(15, 56, 106, 1);
    font-size: 24px;
    line-height: 24px;
    // font-weight: 60px;
    font-weight: 700;
    text-align: center;  /* 文字居中对齐 */
    font-family: SourceHanSansCN-Medium;
  }
}

</style>