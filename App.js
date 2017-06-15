import React from 'react';
import { Router, Scene } from 'react-native-mobx';

import Main from './js/main';

export default class App extends React.Component {
  render() {
    return (<Router>
              <Scene key="root">
                <Scene key="main" component={Main}/>
              </Scene>
            </Router>
    );
  }
}




