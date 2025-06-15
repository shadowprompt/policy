<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import waterJson from '../../assets/waterJson.json';
import waterData from '../../assets/waterData.json';
import { fetchData } from '@/utils/dataRequest.js'

const props = defineProps(['dataList', 'xxx'])
console.log('props ~ ', props)

const OFFSET = 50;
const INITIAL = -1
let count = INITIAL;

function getDataList(idx) {

  const dataList = Array(76).fill(1).map((item, index) => {
    const data = waterData[index];
    const name =data[0];

    const value =data[2 + 10 * idx];
    // console.log('value of ~ ', idx, index, name, value);
    return {
      name: `${index}_${name}`,
      value,
      // value: waterData[index] ? waterData[index].value : Math.round(Math.random() * 1000000)
    };
  });
  const maxValue = Math.max(...dataList.map(it => it.value));
  const minValue = Math.min(...dataList.map(it => it.value));
  console.log('getDataList of ~ ', idx, dataList, maxValue, minValue);
  return {
    maxValue,
    minValue,
    dataList,
  };
}

const {dataList} = getDataList(0)
const total =  dataList.length;

let instance = ref(null);
let instanceRight1 = ref(null);
let instanceRight2 = ref(null);
let instanceRight3 = ref(null);

let scale = ref(1);


function init() {
  // 比例尺
  const width = 40;
  const height = 10;
  const left = 0;
  const top = 400;

  var MyShape = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    buildPath: function(ctx, shape) {
      ctx.moveTo(shape.x, shape.y);
      ctx.lineTo(shape.x + shape.width, shape.y);
      ctx.lineTo(shape.x + shape.width, shape.y + shape.height);
      ctx.lineTo(shape.x, shape.y + shape.height);
      ctx.closePath();
    }
  });
  echarts.graphic.registerShape('myCustomShape', MyShape);

  const geoJson = {
    "type": "FeatureCollection",
    "features": waterJson.geometries.slice(0, 69).map((item, index) => ({
      "type": "Feature",
      "properties":
        {
          "name": `${index}_${waterData[index][0]}`,
        },
      geometry: item
    })),
  };
  console.log('geoJson ~ ', geoJson, dataList);
  echarts.registerMap('water', {
    geoJSON: geoJson
  });

  instance.value = echarts.init(document.getElementById('chartsDOM'))
  instanceRight1.value = echarts.init(document.getElementById('chartsRightDOM1'))
  instanceRight2.value = echarts.init(document.getElementById('chartsRightDOM2'))
  instanceRight3.value = echarts.init(document.getElementById('chartsRightDOM3'))

  const options = {
    tooltip: {
      trigger: 'item',
      valueFormatter: (...rest) => {
        // console.log('rest ~ ', rest);
        return rest;
      }
    },
    toolbox: {
      top: 0,
      feature: {
        saveAsImage: {
          title: '保存图片'
        },
        dataZoom: {
          title: {
            zoom: '区域缩放',
            back: '区域缩放还原'
          }
        }
      }
    },
    // 左侧小导航图标
    // visualMap: {
    //   type: 'piecewise',
    //   pieces: [
    //     {gt: 1024 * 1024 * 1024, label: '>1GB'}, // 不指定 max，表示 max 为无限大（Infinity）。
    //     {gt: 1024 * 1024, lte: 1024 * 1024 * 1024, label: '(1MB,1GB]'},
    //     {gt: 500 * 1024, lte: 1024 * 1024, label: '(500KB,1MB]'},
    //     {gt: 1024, lte: 500 * 1024, label: '(1KB,500KB]'},
    //     {gt: 0, lte: 1024, label: '(0,1KB]'} // 不指定 min，表示 min 为无限大（-Infinity）。
    //   ],
    //   show: true,
    //   x: 'left',
    //   y: 'center',
    //   color: ['#5a7097', '#7be7db', '#b4f0d2', '#e0fafb']
    // },
    visualMap: {
      min: -2000000,
      max: 8000000,
      orient: 'horizontal',
      // left: 'right',
      // top: 'center',
      calculable: true,
      left: 50,
      bottom: 50,
      realtime: false,
      splitNumber: 8,
      inRange: {
        color: [
          '#F2CCD4',
          '#FFFDFE',
          '#FFFFFF',
          '#D7DFEF',
          '#B2C3E0',
          '#8FA7D2',
          '#637CA9'
        ]
      }
    },
    graphic: [
      // 比例尺文字
      {
        type: 'text', // 类型
        left: OFFSET + left - 5, // 位置
        top: top + height + 5,
        style: {
          text: '0',
          font: '16px Microsoft YaHei',
          fill: '#333' // 颜色
        }
      },
      {
        type: 'text', // 类型
        left: OFFSET + left + width - 10, // 位置
        top: top + height + 5,
        style: {
          text: '25',
          font: '16px Microsoft YaHei',
          fill: '#333' // 颜色
        }
      },
      {
        type: 'text', // 类型
        left: OFFSET + left + width * 2 - 10, // 位置
        top: top + height + 5,
        style: {
          text: '50',
          font: '16px Microsoft YaHei',
          fill: '#333' // 颜色
        }
      },
      {
        type: 'text', // 类型
        left: OFFSET + left + width * 2 + 10, // 位置
        top: top,
        style: {
          text: 'Km',
          font: '16px Microsoft YaHei',
          fill: '#333' // 颜色
        }
      },
    ],
    // 配置属性
    series: [
      {
        name: '数据',
        type: 'map',
        mapType: 'water',
        // roam: true,
        // zoom: 1.2,
        label: {
          normal: {
            show: true // 省份名称
          },
          emphasis: {
            show: false
          }
        },
        data: [],
      },
      // 比例尺图标
      {
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function(params, api) {
          return {
            type: 'myCustomShape',
            shape: {
              x: OFFSET + api.value(0),
              y: api.value(1),
              width: api.value(2),
              height: api.value(3)
            },
            style: {
              fill: '#000000',
              strokeWidth: 2,
              stroke: 'red'
            }
          };
        },
        data: [
          [left, top, width, height]
        ]
      },
      {
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function(params, api) {
          return {
            type: 'myCustomShape',
            shape: {
              x: OFFSET + api.value(0),
              y: api.value(1),
              width: api.value(2),
              height: api.value(3)
            },
            style: {
              fill: '#f2f2f2',
              stroke: 'red'
            }
          };
        },
        data: [
          [left + width, top, width, height]
        ]
      },
    ]
  }
  instance.value.setOption(options);

  const options2= {
    title: {
      text: 'Stacked Line',
      textStyle: {
        fontSize: 12,
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Email', 'Union Ads']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
    ]
  };
  instanceRight1.value.setOption(options2);
  instanceRight2.value.setOption(options2);
  instanceRight3.value.setOption(options2);
}


function run() {
  let setId = setInterval(() => {
    count = count + 1;
    const {minValue, maxValue, dataList} = props.dataList[count]
    console.log('set ~ ', `${count}/${total}`, setId, dataList.length, minValue, maxValue);
    instance.value.setOption({
      visualMap: {
        max: maxValue * 1.2,
        min: minValue * 1.4
      },
      series: [{
        data: dataList
      }]
    });

    if (count >= props.dataList.length - 1) {
      console.log('clear ~ ', setId);
      clearInterval(setId);
    }
  }, 1500);
}

function start() {
  count = INITIAL;
  console.log('reset ~ ', `${count}/${total}`);
  instance.value.setOption({
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
  console.log(`the component is now mounted.`, ddd);
  window.vm = this;



  init();

  // 动态调整图例大小（例如根据窗口大小）
  window.addEventListener('resize', function() {
    const clientWidth = document.documentElement.clientWidth;
    scale.value = clientWidth/2543;

    console.log('clientWidth', clientWidth, scale.value);
  });

});

</script>

<template>
  <div class="mid">
    <button @click="start" :style="{marginLeft: '20px'}">Start</button>

    <div class="large" id="chartsDOM"></div>
    <div class="nav">
      <midNav/>
    </div>
  </div>
  <div class="right">
    <div>数据一</div>
    <div id="chartsRightDOM1" style="width:150px;height: 200px;"></div>
    <div id="chartsRightDOM2" style="width:150px;height: 200px;"></div>
    <div id="chartsRightDOM3" style="width:150px;height: 200px;"></div>
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
  padding: 0px 0px 0px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  img{
    width: 300px;
    height: 200px;
    // margin-bottom: 20px;
  }
}
</style>
