import { getData } from '../assets/carbonChartData.js';
import { fetchFn } from '../assets/carbonDataMapHandler.js';

const data_index_offset = 0;

const totalYear = 2; // 总运行年限

// 返回该场景下历年全部的数据
function getYearDataList(plantMode, sceneKey, yearIndex) {
  const year = 2020 + yearIndex

  const mapDataList = fetchFn(`carbonData${year}_${plantMode}`);
  
  const modeList = getData(1, plantMode);
  const sceneList = getData(1, sceneKey);
  
  const policyList = getData(2, sceneKey);


  return {
    maxValue: 0,
    minValue: 0,
    mapDataList,
    modeList,
    sceneList,
    policyList,
  };
}


export function fetchData(params) {
  const { systemName, carbonParams = {} } = params;
  let {
    plantMode, // 种植模式 1 2 3 稻虾
    carbonAmount, // 碳补贴 2 3 4
    nitrogenRatio, // 氮补贴  0.2 0.3 0.4
    slowRatio, // 缓释肥补贴  0.4 0.5 0.6
  } = carbonParams;
  let scene_key = '';
  if (carbonAmount) {
    scene_key = `C_${carbonAmount}`;
  } else if (nitrogenRatio) {
    scene_key = `D_${nitrogenRatio * 100}%`
  }  else if (slowRatio) {
    scene_key = `S_${slowRatio * 100}%`
  }
  // 先判断当前使用哪种场景(暂时按照第0种)，再取该年限的数据
  return Array(6).fill(1).map((item, index) => {
    return getYearDataList(plantMode, scene_key, index);
  })
}
