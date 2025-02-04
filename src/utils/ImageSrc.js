import { getDatasetsByPredictionId } from "@/api/getImages";

// 发送请求并解析 Base64 图片
export async function checkParams3(Params3, cropType, imageList) {
  if (cropType === "1") {
    try {
      const response = await getDatasetsByPredictionId(Params3);
      console.log("请求成功:", response);

      const base64Images = response?.data?.base64Images || [];
      imageList.value = base64Images.length > 0 ? base64Images.map(resetImageSrc) : [];
    } catch (error) {
      console.error("请求失败:", error);
    }
  } else {
    console.log("cropType 不等于 1，无需发送请求");
  }
}



// 处理 Base64 图片（支持 GIF & PNG）
export function resetImageSrc(base64String) {
  if (isGif(base64String)) {
    return base64ToBlobUrl(base64String, "image/gif");
  }
  return `data:image/png;base64,${base64String}`;
}

// 判断是否是 GIF
export function isGif(base64String) {
  const base64Data = base64String.split(",")[1] || base64String;
  return base64Data.startsWith("R0lGODlh") || base64Data.startsWith("R0lGODdh");
}

// Base64 转 Blob URL（适用于 GIF）
export function base64ToBlobUrl(base64, mimeType) {
  const byteCharacters = atob(base64.split(",")[1] || base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  return URL.createObjectURL(blob);
}
