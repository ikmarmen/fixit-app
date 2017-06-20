import Fetch from 'isomorphic-fetch';
import Config from '../../config.js'
import { Platform, AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Actions, ActionConst } from 'react-native-router-flux';

function parseJson(response) {
  return response.json();
}
function checkStatus(data) {
  if(data.error && data.error.status === 401){
    Actions.login({type:ActionConst.REPLACE});
    throw data.error;
  }else if(data.error){
     throw data.error;
  }else{
    return data;
  }
}

export default async function enhancedFetch(url, options) {
  let token = await AsyncStorage.getItem('TOKEN');
  options.headers = Object.assign({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'platform': Platform.OS,
    'app-version': Config.APP_VERSION,
    'device-id': '100123456789',//DeviceInfo.getUniqueID(),
    'token': token
  },
    options.headers);

  if (options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }

  return Fetch(`${Config.BASE_URL}${url}`, options)
    .then(parseJson)
    .then(checkStatus);
}