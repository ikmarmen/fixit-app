import React, { Component } from 'react';
import { Content, Spinner, List, Fab, View, Icon, Button } from 'native-base';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import AdvertsListStore from './advertsStore';
import AdvertCard from './advertCard'

@observer
export default class AdvertsList extends Component {
  constructor(props) {
    super(props);
    this.store = AdvertsListStore;
  }
  render() {
    return <View style={{ flex: 1 }}>
      <Content>
        <List>
          {this.store.adverts.length > 0
            ? this.store.adverts.map((item, index) => {
              return <AdvertCard key={index} advert={item} />;
            })
            : <Spinner />}
        </List>
      </Content>  
        <Fab position="bottomLeft" active={false} style={{backgroundColor:'#38947a'}} onPress={()=>Actions.advertAdd({type:ActionConst.PUSH})}>
          <Icon name="add" />
        </Fab>
      </View>;
  }
}