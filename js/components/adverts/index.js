import React, { Component } from 'react';
import { Content } from 'native-base';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import AdvertsListStore from './advertsStore';
import FixItCard from './card'

@observer
export default class AdvertsList extends Component {
  constructor(props) {
    super(props);
    this.store = AdvertsListStore;
  }
  render() {
    return <Content>
        {this.store.adverts.map((item, index)=>{
          return <FixItCard key={index} advert={item}/>;
        })}
      </Content>;
  }
}