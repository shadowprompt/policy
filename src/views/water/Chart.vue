<script setup>
import { onMounted, ref, defineExpose } from 'vue';
import * as echarts from 'echarts';
import waterMap from '../../assets/waterMap.json';
import waterData from '../../assets/water_mapData.json'; // 买个地方N年各种场景的数据
import { fetchData } from '@/utils/waterDataRequest.js'

const props = defineProps(['dataList', 'xxx'])
console.log('props ~ ', props)
const CLIENT_WIDTH = 1940;

const OFFSET = 50;
const INITIAL = 0
let count = INITIAL;

let mapInstance = ref(null);
let instanceRight1 = ref(null);
let instanceRight2 = ref(null);
let instanceRight3 = ref(null);
let instanceRight4 = ref(null);

let mapInstanceOptions = ref(null);
let instanceRight1Options = ref(null);
let instanceRight2Options = ref(null);
let instanceRight3Options = ref(null);
let instanceRight4Options = ref(null);

let setId = ref(null);


let scale = ref(1);

function getMapGroup (indexList, source) {
  return indexList.map(item => source[item])
}
// 返回累加数组[1, 3, 4] => [1], [1, 4]  [1, 4, 8]
function calcTotalList (list, itemIndex, count) {
  return list.slice(0, count + 1).reduce((acc, item) => {
    const preTotal = acc[acc.length - 1] || 0;
    return [...acc, preTotal + item[itemIndex]];
  }, [0]); // 初始值为2023年的0
}

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

  const listFull = new Array(69).fill(1).map((item, index) => index);
  const list1 = [56, 24, 61, 0, 43, 57, 51, 52, 5, 50, 27, 13];
  const list2 = [1, 7, 49, 34, 44, 10, 11, 41, 3, 25, 60, 54, 31, 46, 37, 9];
  const list3 = [66, 4, 14, 55, 47, 20, 48, 59, 42, 6, 28 , 40];
  const list4 = [35, 2, 33, 65, 29, 18, 16, 19, 26, 8, 58, 68, 53, 17, 39, 30, 12, 63, 62, 45, 15, 22, 38, 36, 23, 32, 21, 67, 64];


  const geoJson = {
    "type": "FeatureCollection",
    "features": getMapGroup(listFull, waterMap.geometries).map((item, index) => ({
      "type": "Feature",
      "properties":
          {
            // "name": `${index}_${waterData[index][0]}`,
            "name": `${waterData[index][0]}`,
          },
      geometry: item
    })),
  };
  const geoJson1 = {
    "type": "FeatureCollection",
    "features": getMapGroup(list1, waterMap.geometries).map((item, index) => ({
      "type": "Feature",
      "properties":
        {
          "name": `${index}`,
        },
      geometry: item
    })),
  };
  const geoJson2 = {
    "type": "FeatureCollection",
    "features": getMapGroup(list2, waterMap.geometries).map((item, index) => ({
      "type": "Feature",
      "properties":
          {
            "name": `${index}`,
          },
      geometry: item
    })),
  };
  const geoJson3 = {
    "type": "FeatureCollection",
    "features": getMapGroup(list3, waterMap.geometries).map((item, index) => ({
      "type": "Feature",
      "properties":
          {
            "name": `${index}`,
          },
      geometry: item
    })),
  };
  const geoJson4 = {
    "type": "FeatureCollection",
    "features": getMapGroup(list4, waterMap.geometries).map((item, index) => ({
      "type": "Feature",
      "properties":
          {
            "name": `${index}`,
          },
      geometry: item
    })),
  };
  console.log('init eoJson ~ ', geoJson, props.dataList);
  echarts.registerMap('waterMap', {
    geoJSON: geoJson
  });
  echarts.registerMap('waterMap1', {
    geoJSON: geoJson1
  });
  echarts.registerMap('waterMap2', {
    geoJSON: geoJson2
  });
  echarts.registerMap('waterMap3', {
    geoJSON: geoJson3
  });
  echarts.registerMap('waterMap4', {
    geoJSON: geoJson4
  });

  mapInstance.value = echarts.init(document.getElementById('chartsDOM'))
  instanceRight1.value = echarts.init(document.getElementById('chartsRightDOM1'))
  instanceRight2.value = echarts.init(document.getElementById('chartsRightDOM2'))
  instanceRight3.value = echarts.init(document.getElementById('chartsRightDOM3'))
  instanceRight4.value = echarts.init(document.getElementById('chartsRightDOM4'))

  mapInstanceOptions.value = {
    title: {
      top: '2%',
      left: 'center',
      text: '内蒙古自治区鄂托克前旗玉米灌溉用水量：2023年',
      textStyle: {
        fontSize: 24,
      }
    },
    tooltip: {
      trigger: 'item',
      // valueFormatter: (...rest) => {
      //   // console.log('rest ~ ', rest);
      //   return rest;
      // }
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
      splitNumber: 10,
      inRange: {
        color: [
          '#F2CDD6',
          '#E3EEF8',
          '#EDF1F9',
          '#E3EEF8',
          '#CAD7EB',
          '#B6C7E4',
          '#AEBBCF',
          '#88A2D0',
          '#88A2D0',
          '#7190C7'
        ]
      }
    },
    graphic: [
      // 比例尺文字
      {
        type: 'text', // 类型
        left: (OFFSET + left - 5) * scale.value, // 位置
        top: (top + height + 5) * scale.value,
        style: {
          text: '0',
          font: '16px Microsoft YaHei',
          fill: '#333' // 颜色
        }
      },
      {
        type: 'text', // 类型
        left: (OFFSET + left + width - 10) * scale.value, // 位置
        top: (top + height + 5) * scale.value,
        style: {
          text: '20',
          font: '16px Microsoft YaHei',
          fill: '#333' // 颜色
        }
      },
      {
        type: 'text', // 类型
        left: (OFFSET + left + width * 2 - 10) * scale.value, // 位置
        top: (top + height + 5) * scale.value,
        style: {
          text: '40',
          font: '16px Microsoft YaHei',
          fill: '#333' // 颜色
        }
      },
      {
        type: 'text', // 类型
        left: (OFFSET + left + width * 2 + 10) * scale.value, // 位置
        top: top * scale.value,
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
        mapType: 'waterMap',
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
      // {
      //   name: '数据',
      //   type: 'map',
      //   mapType: 'waterMap1',
      //   // roam: true,
      //   // zoom: 1.2,
      //   label: {
      //     normal: {
      //       show: true // 省份名称
      //     },
      //     emphasis: {
      //       show: false
      //     }
      //   },
      //   data: [],
      //   z: 1, zlevel: 1
      // },
      // {
      //   name: '数据',
      //   type: 'map',
      //   mapType: 'waterMap2',
      //   // roam: true,
      //   // zoom: 1.2=；‘’
      //   label: {
      //     normal: {
      //       show: true // 省份名称
      //     },
      //     emphasis: {
      //       show: false
      //     }
      //   },
      //   data: [],
      //   z: 2, zlevel: 2
      // },
      // 比例尺图标
      {
        type: 'custom',
        coordinateSystem: 'none',
        renderItem: function(params, api) {
          return {
            type: 'myCustomShape',
            shape: {
              x: (OFFSET + api.value(0)) * scale.value,
              y: api.value(1) * scale.value,
              width: api.value(2) * scale.value,
              height: api.value(3) * scale.value,
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
              x: (OFFSET + api.value(0)) * scale.value,
              y: api.value(1) * scale.value,
              width: api.value(2) * scale.value,
              height: api.value(3) * scale.value,
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

  instanceRight1Options.value= {
    title: {
      top: '5%',
      text: '用水量和基准水量',
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
      data: ['用水量', '基准水量'],
    },
    yAxis: {
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

  instanceRight2Options.value= {
    title: {
      top: '5%',
      text: '技术采纳比例',
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
          name: '采纳'
        }, {
          value: 0,
          name: '未采纳',
        }]
      }
    ],
  };

  instanceRight3Options.value= {
    title: {
      top: '5%',
      text: '产值与基准产值',
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
      data: ['产值', '基准产值'],
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      bottom: '15%',
    },
    series: [
      {
        type: 'bar',
        data: [{
          value: 1,
          itemStyle: {
            color: '#4682B4'
          }
        }, 1]
      }
    ]
  };


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
    const {minValue, maxValue, mapDataList, list1, list2, list3} = props.dataList[count]
    console.log('set ~ ', `${count}/${props.dataList.length}`, setId.value, 'data=', props.dataList[count]);
    mapInstance.value.setOption({
      title: {
        text: `内蒙古自治区鄂托克前旗玉米灌溉用水量：${2024 + count}年`,
      },
      // visualMap: {
      //   max: maxValue * 1.2,
      //   min: minValue * 1.4
      // },
      series: [{
        data: mapDataList
      }]
    });

    const currentList1 = list1[count];
    const currentList2 = list2[count];
    const currentList3 = list3[count];
    
    if (listLength <= 1) { // 其实只有一年
      instanceRight1.value.setOption({
        series: [{
          data: currentList1
        }]
      });

      instanceRight2.value.setOption({
        series: [{
          data: [{
            value: currentList2[0],
            name: '采纳'
          }, {
            value: currentList2[1],
            name: '未采纳',
          }]
        }],
      });

      instanceRight3.value.setOption({
        series: [{
          data: currentList3
        }]
      });
    } else { // 多年 全部用折线图
      const fullList1_0 = calcTotalList(list1, 0, count);
      const fullList1_1 = calcTotalList(list1, 1, count);
      
      const fullList2_0 = calcTotalList(list2, 0, count);
      const fullList2_1 = calcTotalList(list2, 1, count);


      const fullList3_0 = calcTotalList(list3, 0, count);
      const fullList3_1 = calcTotalList(list3, 1, count);

      console.log('fullList1 ~ ', fullList1_0, fullList1_1);

      instanceRight1.value.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: new Array(listLength + 1).fill(1).map((item, index) => index + 2023)
        },
        series: [{
          name: '用水量',
          type: 'line',
          data: fullList1_0
        }, {
          name: '基准用水量',
          type: 'line',
          data: fullList1_1
        }]
      });

      instanceRight2.value.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: new Array(listLength + 1).fill(1).map((item, index) => index + 2023)
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          bottom: '15%',
        },
        series: [{
          name: '采纳',
          type: 'line',
          data: fullList2_0
        }, {
          name: '未采纳',
          type: 'line',
          data: fullList2_1
        }],
      });

      instanceRight3.value.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: new Array(listLength + 1).fill(1).map((item, index) => index + 2023)
        },
        series: [{
          name: '产值',
          type: 'line',
          data: fullList3_0
        }, {
          name: '基准产值',
          type: 'line',
          data: fullList3_1
        }]
      });
    }
    
    

    
    

    count = count + 1;

    if (count >= props.dataList.length - 1) {
      console.log('clear ~ ', setId.value);
      clearInterval(setId.value);
    }
  }, 1500);
}

function start() {
  count = INITIAL;
  console.log(`reset ~ to ${count}`);
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
