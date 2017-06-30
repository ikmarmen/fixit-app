import Config from '../../config.js';
import { Platform, AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Actions, ActionConst } from 'react-native-router-flux';
import {AuthStore} from '../components/auth/authStore'


function parseJson(response) {
  return response.json();
}
function checkStatus(data) {
  if(data.error && data.error.status === 401){
    //Ugly Hack
    throw data.error;
  }else if(data.error){
     throw data;
  }else{
    return data;
  }
}

export default async function enhancedFetch(url, options) {
  options.headers = Object.assign({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'platform': Platform.OS,
    'app-version': Config.APP_VERSION,
    'device-id': DeviceInfo.getUniqueID(),
    'token': AuthStore.token
  },
    options.headers);

  if (options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }

  return fetch(`${Config.BASE_URL}${url}`, options)
    .then(parseJson)
    .then(checkStatus);
}