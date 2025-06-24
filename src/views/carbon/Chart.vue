<script setup>
import { onMounted, ref, defineExpose } from 'vue';
import * as echarts from 'echarts';
import mapData from '../../assets/carbon_MapData.json';
import carbonData2020_1 from '../../assets/carbon_output/2020_1.json';
import { fetchData } from '@/utils/carbonDataRequest.js'

const props = defineProps(['dataList', 'xxx'])
console.log('props ~ ', props)
const CLIENT_WIDTH = 1940;

const OFFSET = 50;
const INITIAL = 0
let count = INITIAL;

let mapInstance = ref(null);
let instanceRight1 = ref(null);
let instanceRight2 = ref(null);
let instanceRight3 = ref(null)
let instanceRight4 = ref(null);

let mapInstanceOptions = ref(null);
let instanceRight1Options = ref(null);
let instanceRight2Options = ref(null);
let instanceRight3Options = ref(null);
let instanceRight4Options = ref(null);
let instanceRight5Options = ref(null);

let setId = ref(null);


let scale = ref(1);

function getMapGroup (indexList, source) {
  return indexList.map(item => source[item])
}

// 返回累加数组[1, 3, 4] => [1], [1, 4]  [1, 4, 8]
function calcTotalList (list, count) {
  return list.slice(0, count + 1).reduce((acc, item) => {
    const preTotal = acc[acc.length - 1] || 0;
    return [...acc, preTotal + item];
  }, [0]); // 初始值为2023年的0
}

function init() {
  // 比例尺
  const width = 40;
  const height = 10;
  const left = 0;
  const top = 400;
  
  echarts.registerMap('jianghanMap', {
    geoJson: mapData,
  });
  
  console.log('geoJson ~ ', mapData);

  mapInstance.value = echarts.init(document.getElementById('chartsDOM'))
  instanceRight1.value = echarts.init(document.getElementById('chartsRightDOM1'))
  instanceRight2.value = echarts.init(document.getElementById('chartsRightDOM2'))
  instanceRight3.value = echarts.init(document.getElementById('chartsRightDOM3'))
  instanceRight4.value = echarts.init(document.getElementById('chartsRightDOM4'))
  
  const valueList = carbonData2020_1.map(item => item.value[2]);

  mapInstanceOptions.value = {
    geo: [{
      type: 'map',
      map: 'jianghanMap',
      itemStyle: {
        areaColor: '#440166', // 设置地图默认填充背景色
        borderColor: '#A29EA3', // 设置边框颜色
        borderWidth: 1 // 设置边框宽度
      },
      label: {
        normal: {
          show: true, // 省份名称
          color: '#fff'
        },
        emphasis: {
          show: false
        }
      },
    }],
    title: {
      text: '湖北省江汉平原水稻碳减排量：2020年',
      left: 'center'
    },
    visualMap: {
      min: 0, // 根据实际数据调整
      max: 10, // 根据实际数据调整
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0',
      text: ['10.0', '0.0'],
      inRange: {
        color: ['#460A5D', '#443983', '#375A8C', '#29798E', '#228D8D', '#1FA287', '#42BE71', '#8BD646', '#DAE319', '#ECD724']
      }
    },
    series: [{
      name: '热力值',
      type: 'heatmap',
      coordinateSystem: 'geo',
      geoIndex: 0,
      data: carbonData2020_1,
      progressive: 100, // 渐进式渲染，提高大数据量下的性能
      progressiveThreshold: 3000
    }]
  };

  instanceRight1Options.value= {
    title: {
      top: '5%',
      text: '减排量',
      textStyle: {
        fontSize: 14,
      }
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: new Array(6).fill(1).map((item, index) => index + 2020)
    },
    yAxis: {
      max: 150,
      min: 0,
      type: 'value'
    },
    grid: {
      bottom: '15%',
    },
    series: [{
      name: '补贴政策',
      type: 'line',
      data: []
    }, {
      name: '种植模式',
      type: 'line',
      data: []
    }]
  };

  instanceRight2Options.value= {
    title: {
      top: '5%',
      text: '政策效率',
      textStyle: {
        fontSize: 14,
      }
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: new Array(6).fill(1).map((item, index) => index + 2020)
    },
    yAxis: {
      max: 250,
      min: 0,
      type: 'value'
    },
    grid: {
      bottom: '15%',
    },
    series: [{
      name: '补贴政策',
      type: 'line',
      data: []
    }, {
      name: '种植模式',
      type: 'line',
      data: []
    }]
  };

  instanceRight2Options.value= {
    title: {
      top: '5%',
      text: '政策效率',
      textStyle: {
        fontSize: 14,
      }
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: new Array(6).fill(1).map((item, index) => index + 2020)
    },
    yAxis: {
      max: 1500,
      min: 0,
      type: 'value'
    },
    grid: {
      bottom: '15%',
    },
    series: [
      {
        type: 'bar',
        data: [0, 0]
      }
    ]
  };

  instanceRight3Options.value= {
    title: {
      top: '5%',
      text: '减排比例',
      textStyle: {
        fontSize: 14,
      }
    },
    tooltip: {
      trigger: 'item'
    },
    grid: {
      bottom: '5%',
    },
    series: [
      {
        type: 'pie',
        id: 'pie',
        radius: '50%',
        label: {
          formatter: '{b}: ({d}%)'
        },
        data: [{
          value: 0,
          name: '模式减排'
        }, {
          value: 0,
          name: '政策减排',
        }]
      }
    ],
  };


  console.log('mapInstanceOptions.value ~ ', mapInstanceOptions.value);

  mapInstanceOptions.value && mapInstance.value.setOption(mapInstanceOptions.value);
  instanceRight1Options.value && instanceRight1.value.setOption(instanceRight1Options.value);
  instanceRight2Options.value && instanceRight2.value.setOption(instanceRight2Options.value);
  instanceRight3Options.value && instanceRight3.value.setOption(instanceRight3Options.value);
  instanceRight4Options.value && instanceRight3.value.setOption(instanceRight4Options.value);
}


function run() {
  const listLength = props.dataList.length;
  console.log('run ~ ', 'dataList=', props.dataList, 'count=', count, 'listLength=', listLength);
  setId.value = setInterval(() => {
    if (props.dataList.length === 0 || !props.dataList[count]) {
      clearInterval(setId.value);
      return;
    }
    const {minValue, maxValue, mapDataList, modeList, sceneList, policyList, radioList} = props.dataList[count]
    console.log('set ~ ', `${count}/${props.dataList.length}`, setId.value, 'data=', props.dataList[count]);
    mapInstance.value.setOption({
      title: {
        text: `湖北省江汉平原水稻碳减排量：${2020 + count}年`,
        left: 'center'
      },
      // visualMap: {
      //   max: maxValue * 1.2,
      //   min: minValue * 1.4
      // },
      series: [{
        data: mapDataList
      }]
    });

    const accSceneList = calcTotalList(sceneList, count);
    const accModeList = calcTotalList(modeList, count);
    const accSceneListSum = accSceneList.reduce((acc, curr) => acc + curr, 0);
    const accModeListSum = accModeList.reduce((acc, curr) => acc + curr, 0);

    instanceRight1.value.setOption({
      series: [{
        name: '补贴政策',
        type: 'line',
        data: accSceneList
      }, {
        name: '种植模式',
        type: 'line',
        data: accModeList
      }]
    })

    instanceRight2.value.setOption({
      series: [{
        data: calcTotalList(policyList, count)
      }]
    })

    instanceRight3.value.setOption({
      series: [{
        data: [{
          value: accModeListSum,
          name: '模式减排',
        }, {
          value: accSceneListSum,
          name: '政策减排',
        }]
      }]
    })
    
    

    
    

    count = count + 1;

    if (count > props.dataList.length - 1) {
      console.log('clear ~ ', setId.value);
      clearInterval(setId.value);
    }
  }, 1500);
}

function start() {
  count = INITIAL;
  console.log(`reset ~ to ${count}`);
  clearInterval(setId.value);
  setId.value = null;
  
  mapInstance.value.setOption({
    series: [{
      data: []
    }]
  });

  run();
}

onMounted(() => {
  const ddd = fetchData({
    waterParams: {}
  })
  const clientWidth = document.documentElement.clientWidth;
  scale.value = clientWidth/CLIENT_WIDTH;
  
  console.log(`the component is now mounted.`, ddd, clientWidth);
  window.vm = this;



  init();

  // 动态调整图例大小（例如根据窗口大小）
  window.addEventListener('resize', function() {
    const clientWidth = document.documentElement.clientWidth;
    scale.value = clientWidth/CLIENT_WIDTH;

    console.log('clientWidth', clientWidth, scale.value);
    [mapInstance].forEach(item => {
      if (typeof item.value.resize === 'function') {
        item.value.resize();
      }
    })
  });

});

defineExpose({start, run})
</script>

<template>
  <div class="mid">
    <div class="large" id="chartsDOM"></div>
    <div class="nav">
      <midNav/>
    </div>
  </div>
  <div class="right">
    <div id="chartsRightDOM1" style="width:100%;height: 300px;"></div>
    <div id="chartsRightDOM2" style="width:100%;height: 300px;"></div>
    <div id="chartsRightDOM3" style="width:100%;height: 300px;"></div>
    <div id="chartsRightDOM4" style="width:100%;height: 300px;"></div>
  </div>
</template>

<style scoped lang="scss">
.mid{
  // display: flex;
  // gap: 20px;
  .large{
    width: 1080px;
    height: 720px;
    margin-top: 40px;
    position: relative;
    //background-color: #fff;
    //background: url(../../assets/water/地图.png) no-repeat;
    background-size: cover;
    overflow: auto;

  }
  .nav{
    height: 90px;
    width: 780px;
    margin-left: 198px;
    margin-top: 40px;
  }
}
.right{
  width: 4.53333rem;
  padding: 0px 0px 0px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0.48rem 0.25333rem 0.05333rem 0;
  img{
    width: 300px;
    height: 200px;
    // margin-bottom: 20px;
  }
}
</style>
