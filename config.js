const version = process.env.NODE_ENV;
const build_time = process.env.BUILD_TIME;
window.console.log(`%c${version}:${build_time}`, 'color:#1496DD');
const config = {
  server: version === 'development' ? 'http://localhost:9000/' : 'http://123.207.142.127:9000/',
};
export default config;
