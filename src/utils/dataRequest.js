import waterJson from '../assets/waterJson.json';
import waterData from '../assets/waterData.json';

const data_index_offset = 2;

const totalYear = 10; // 总运行年限
function getYearDataList(list, sceneIndex, yearIndex) {
  const offset = sceneIndex * totalYear + 2;

  const dataList = list.map((it, index) => {
    return {
      name: `${index}_${it[0]}`,
      value: it[offset + yearIndex],
    }
  })

  const maxValue = Math.max(...dataList.map(it => it.value));
  const minValue = Math.min(...dataList.map(it => it.value));

  return {
    maxValue,
    minValue,
    dataList,
    waterList: [{
      base: 200000000, // 基准用水量
      used: 200000000, // 用水量
    }]
  };
}

const dataMap = {

};

export function fetchData(params) {
  // 76个区域，21种情景*10年的数据 场景1*10(0, 9)，场景2*10(10, 19)，
  const fullListData = waterData.map(item => {
    return item;
  });
  const { systemName, waterParams = {} } = params;
  const {
    policySubsidyRadio, // 政策补贴比例
    subsidyScope, // 补贴范围
    subsidyObject, // 补贴对象
    waterGrad, // 水价档次
    waterPriceStandard, // 水价标准
    waterLimit, // 水价限额
    runYear, // 运行年限
  } = waterParams;
  // 先判断当前使用哪种场景(暂时按照第0种)，再取该年限的数据
  if (runYear && runYear > 1) {
    return Array(10).fill(1).map((item, index) => {
      return getYearDataList(fullListData, 0, index);
    })
  } else {
    return [getYearDataList(fullListData, 0, 0)];
  }
}
