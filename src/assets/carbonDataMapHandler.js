import carbonData2020_1 from '../assets/carbon_output/2020_1.json';
import carbonData2021_1 from '../assets/carbon_output/2021_1.json';
import carbonData2022_1 from '../assets/carbon_output/2022_1.json';
import carbonData2023_1 from '../assets/carbon_output/2023_1.json';
import carbonData2024_1 from '../assets/carbon_output/2024_1.json';
import carbonData2025_1 from '../assets/carbon_output/2025_1.json';
import carbonData2020_3 from '../assets/carbon_output/2020_3.json';
import carbonData2021_3 from '../assets/carbon_output/2021_3.json';
import carbonData2022_3 from '../assets/carbon_output/2022_3.json';
import carbonData2023_3 from '../assets/carbon_output/2023_3.json';
import carbonData2024_3 from '../assets/carbon_output/2024_3.json';
import carbonData2025_3 from '../assets/carbon_output/2025_3.json';


const dataMap = {
  carbonData2020_1,
  carbonData2021_1,
  carbonData2022_1,
  carbonData2023_1,
  carbonData2024_1,
  carbonData2025_1,
  carbonData2020_3,
  carbonData2021_3,
  carbonData2022_3,
  carbonData2023_3,
  carbonData2024_3,
  carbonData2025_3,
}

export function fetchFn(senceId) {
  const data = dataMap[senceId] || [];
  return data;
}