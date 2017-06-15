import Fetch from 'isomorphic-fetch';
import Config from '../../config.js'
import { Platform, AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';

function parseJson(response) {
  return response.json();
}
function checkStatus(data) {
  debugger;
  if(data.error && data.error.status === 401){
    //redirect to login page
  }else if(data.error){
     throw data.error;
  }else{
    return data;
  }
}

export default  function enhancedFetch(url, options) {
  //let token = AsyncStorage.getItem('TOKEN');

  options.headers = Object.assign({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'platform': Platform.OS,
    'app-version': Config.APP_VERSION,
    'device-id': '0123456789',//DeviceInfo.getUniqueID(),
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2RlcklkIjoiNTkzN2JjYTQwMjkxNWYxMDY4Mjk2YTVlIiwiaWF0IjoxNDk2ODI0OTk2LCJhdWQiOiIxMjM0NTY3ODkifQ.QSRs65nihfWceLpLPa3-v7N6pzWCbYoE1S0p4DLCTPg'//token
  },
    options.headers);

  if (options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }

  return Fetch(`${Config.BASE_URL}${url}`, options)
    .then(parseJson)
    .then(checkStatus);
}