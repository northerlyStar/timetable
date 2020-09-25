module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/vue_website/' : '/',
  assetsDir: 'static',
  lintOnSave: false
}