<template>
  <div class="nav-container">
    <button 
      v-for="btn in orderedButtons" 
      :key="btn.route" 
      @click="navigateTo(btn.route)"
      :class="['nav-button', { active: btn.route === currentRoute }]">
      <p>{{ btn.label }}</p>
    <div class="btn-line" v-if="btn.route === currentRoute"></div>

    </button>
  </div>
</template>

<script  setup >
// import '@/utils/flexible.js'
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();

const buttons = [
  { label: '减排固碳政策', route: '//carbon.bundless.cn' },
  { label: '水价改革政策', route: '//water.bundless.cn' },
  { label: '大数据作物估产', route: '//yields.bundless.cn' }
];

const currentRoute = computed(() => route.path);

const orderedButtons = computed(() => {
  const currentIndex = buttons.findIndex(btn => btn.route === currentRoute.value);
  if (currentIndex === -1) return buttons;

  return [
    buttons[(currentIndex + 1) % 3], 
    buttons[currentIndex], 
    buttons[(currentIndex + 2) % 3]
  ];
});

const navigateTo = (path) => {
  location.href = path
};
</script>

<style scoped lang="scss">
.nav-container {
  // position: relative;
  height: 90px;
    width: 780px;
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 20px;
  // background-color: hotpink;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding-top: 34px;
  
}


.nav-button {

position: relative;
// bottom: 18px;
  width: 120px;
  height: 20px;
  margin-right: 100px;
  // padding: 10px 20px;
  // border: none;
  // background-color: lightgray;
  cursor: pointer;
  transition: 0.3s;
  width: 240px;
height: 40px;

color: rgba(255, 255, 255, 1);
// font-size: 40px;
font-family: SourceHanSansCN-Heavy;

 -webkit-text-stroke: 0.5px #56AAFF;

    p{
  width: 150px;
  height: 30px;

      // margin-bottom: -20px;
//  color: transparent; 
  font-size: 20px;
  font-family: SourceHanSansCN-Heavy;
  color: rgb(212,249,255,0.6);
  // text-shadow: -0.5px 1px 0px black;
  -webkit-text-stroke: 0.9px rgb(   86,170,255);

  background: linear-gradient(to bottom, #FFFFFF, #3398FF );
  -webkit-background-clip: text; /* 适用于 Chrome 和 Safari */
  background-clip: text; /* 适用于 Firefox */
    }

}

.nav-button.active  p{
  background-color: blue;
  margin-bottom: 100px;
  position: absolute;
  top: -5px;

  // color: black;
  // font-weight: bold;
  // p{
 -webkit-text-stroke: 0.99px rgb(    0,141,255);
    
  // }
}
.btn-line{
  width: 120px;
  height: 4px;
  margin-left: 15px;
  border-radius: 5px;
  background-color: rgb(  0,141,255);
  position: absolute;
  // top: 0px;
  bottom: 7px;
}
</style>
