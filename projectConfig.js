export const configMap = {
  water:{
    minify: true,
    pages: [
      {
        filename: 'water', // filename 默认是template文件名，就是beijing.html
        entry: 'src/views/water/main.js',
        template: 'index.html',
      },
    ],
  },
  home:{
    minify: true,
    pages: [
      {
        filename: 'home',
        entry: 'src/main.js',
        template: 'index.html',
      },
    ],
  }
}

