import { observable, computed, action, autorun } from 'mobx';
import { PermissionsAndroid, Platform, BackAndroid, AsyncStorage } from 'react-native';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

class LocationStore {
  @observable location = null;
  @observable error = null;

  constructor() {
    autorun(() => this.showErrors());

    //Ugly hack .BackgroundGeolocation doesn't fire location even after  react-native reloading
    AsyncStorage.getItem('LOCATION', (err, result) => {
      if (result) {
        this.location = JSON.parse(result);
      }
    });
    const that = this;
    BackgroundGeolocation.isLocationEnabled(function (enabled) {
      
      if (enabled) {
        that.checkPermission().then((hasPermission) => {
          if (hasPermission) {
            that.startLocationTracking();
          } else {
            BackAndroid.exitApp();
          }

        });
      } else {
        BackgroundGeolocation.showLocationSettings();
      }
    });
  }

  async checkPermission() {
    var hesPermission;
    if (Platform.OS === 'android') {
      var granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      }
      hesPermission = granted === PermissionsAndroid.RESULTS.GRANTED
    } else {
      hesPermission = true;
    }

    return new Promise((resolve, reject) => {
      resolve(hesPermission);
    })
  }

  startLocationTracking() {
    BackgroundGeolocation.configure({
      startForeground:false,
      debug: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      mode: 0
    });
    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });
    BackgroundGeolocation.start(() => {
      BackgroundGeolocation.getLogEntries(100, printAndroidLogs);
    });
    BackgroundGeolocation.on('location', (location) => {
      this.location = location;
      this.saveLocation(location);
    });

    BackgroundGeolocation.on('error', (error) => {
      this.error = error;
    });
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  saveLocation(location){
    AsyncStorage.setItem('LOCATION', JSON.stringify(location))
  }
}

const locationStore = new LocationStore();
export default locationStore;

function padLeft(nr, n, str) {
  return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

function printLogs(logEntries, logFormatter, COLORS, MAX_LINES) {
  MAX_LINES = MAX_LINES || 100; // maximum lines to print per batch
  var batch = Math.ceil(logEntries.length / MAX_LINES);
  var logLines = Array(MAX_LINES); //preallocate memory prevents GC
  var logLinesColor = Array(MAX_LINES * 2);
  for (var i = 0; i < batch; i++) {
    var it = 0;
    var logEntriesPart = logEntries.slice((i * MAX_LINES), (i + 1) * MAX_LINES);
    for (var j = 0; j < logEntriesPart.length; j++) {
      var logEntry = logEntriesPart[j];
      logLines[j] = logFormatter(logEntry);
      logLinesColor[it++] = ('background:white;color:black');
      logLinesColor[it++] = (COLORS[logEntry.level]);
    }
    if (logEntriesPart.length < MAX_LINES) {
      console.log.apply(console, [logLines.slice(0, logEntriesPart.length).join('\n')]
        .concat(logLinesColor.slice(0, logEntriesPart.length * 2)));
    } else {
      console.log.apply(console, [logLines.join('\n')].concat(logLinesColor));
    }
  }
}

function printAndroidLogs(logEntries) {
  var COLORS = Object();
  COLORS['ERROR'] = 'background:white;color:red';
  COLORS['WARN'] = 'background:black;color:yellow';
  COLORS['INFO'] = 'background:white;color:blue';
  COLORS['TRACE'] = 'background:white;color:black';
  COLORS['DEBUG'] = 'background:white;color:black';

  var logFormatter = function (logEntry) {
    var d = new Date(logEntry.timestamp * 1);
    var dateStr = [d.getFullYear(), padLeft(d.getMonth() + 1, 2), padLeft(d.getDate(), 2)].join('/');
    var timeStr = [padLeft(d.getHours(), 2), padLeft(d.getMinutes(), 2), padLeft(d.getSeconds(), 2)].join(':');
    return ['%c[', dateStr, ' ', timeStr, '] %c', logEntry.logger, ':', logEntry.message].join('');
  }

  return printLogs(logEntries, logFormatter, COLORS);
}

function printIosLogs(logEntries) {
  var COLORS = Array();
  COLORS[1] = 'background:white;color:red';
  COLORS[2] = 'background:black;color:yellow';
  COLORS[4] = 'background:white;color:blue';
  COLORS[8] = 'background:white;color:black';
  COLORS[16] = 'background:white;color:black';

  var logFormatter = function (logEntry) {
    var d = new Date(logEntry.timestamp * 1000);
    var dateStr = [d.getFullYear(), padLeft(d.getMonth() + 1, 2), padLeft(d.getDate(), 2)].join('/');
    var timeStr = [padLeft(d.getHours(), 2), padLeft(d.getMinutes(), 2), padLeft(d.getSeconds(), 2)].join(':');
    return ['%c[', dateStr, ' ', timeStr, '] %c', logEntry.logger, ':', logEntry.message].join('');
  }

  return printLogs(logEntries, logFormatter, COLORS);
}