import Config from '../../config.js';
import { Platform, AsyncStorage } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Actions, ActionConst } from 'react-native-router-flux';
import { AuthStore } from '../components/auth/store'

function checkStatus(data) {
  if (data.error && data.error.status === 401) {
    //Ugly Hack
    alert(JSON.stringify(data.error));
  } else if (data.error) {
    alert(JSON.stringify(data));
  } else {
    return data;
  }
  return data;
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

  if (options.body && typeof options.body !== 'string' && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
  }
  const response = await fetch(`${Config.BASE_URL}${url}`, options);
  const json = await response.json();

  return checkStatus(json);
}