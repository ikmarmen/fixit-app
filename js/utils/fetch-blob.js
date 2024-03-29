import Config from '../../config.js';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFetchBlob from 'react-native-fetch-blob';
import {AuthStore} from '../components/auth/store'

function checkStatus(data) {
  if(data.error){
     throw data;
  }else{
    return data;
  }
}

export default async function enhancedFetch(url, options, data) {

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

  return RNFetchBlob.fetch(options.method, `${Config.BASE_URL}${url}`, options.headers, data)
    .then(checkStatus);
}