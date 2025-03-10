import axios from 'axios'


const service = axios.create({
    baseURL: 'http://8.148.20.105:9090',
    timeout: 20000,
    // withCredentials: true
  });


// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。

    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。

    return Promise.reject(error);
  });

  export default service
