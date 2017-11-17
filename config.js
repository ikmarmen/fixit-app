var _config = {
  production: { BASE_URL: '', APP_VERSION: '0.1.0' },
  staging: { BASE_URL: 'http://138.201.239.237:4000/', APP_VERSION: '0.1.0' },//Armen S. IP
  dev: { BASE_URL: 'http://192.168.10.116:4000/', APP_VERSION: '0.1.0' },
}

function getConfig() {
  //Todo: Make mechanism to recognize envirment
  return _config['dev']
}
var Config = getConfig();
export default Config