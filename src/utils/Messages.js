/*
  错误提示框
*/
 export function showToast(message, type = "green") {
    // 创建一个新的提示框
    const toast = document.createElement("div");
    toast.className = "toast"; // 为动态提示框定义样式
    toast.textContent = message;
  
    // 设置提示框的背景颜色
    const backgroundColor =
      type === "error"
        ? "#e53935" // 红色
        : type === "warning"
          ? "#FD7435" // 黄色
          : "#43a047"; // 绿色，默认
    toast.style.backgroundColor = backgroundColor;
  
    // 插入到页面的最外层容器中
    document.body.appendChild(toast);
  
    // 添加显示动画
    setTimeout(() => {
      toast.classList.add("show");
    }, 10); // 延迟生效
  
    // 在显示一段时间后移除提示框
    setTimeout(() => {
      toast.classList.remove("show"); // 移除显示动画
      setTimeout(() => {
        document.body.removeChild(toast); // 完全移除 DOM 元素
      }, 500); // 动画结束后再移除
    }, 3000); // 显示持续 3 秒
  }
  