// postcss.config.js
export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75, // rootValue是常量，可以直接指定，不需要返回函数
      propList: ['*'],
    },
  },
};
