import React, { Component } from 'react';
import { Content, Spinner, List, View } from 'native-base';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import AdvertsListStore from './advertsStore';
import AdvertCard from './advertCard'
import LocationStore from '../../stores/locationStore';

@observer
export default class AdvertsList extends Component {
  constructor(props) {
    super(props);
    this.store = AdvertsListStore;
    this.state = {
      isFabVisible: false
    }
  }

  componentWillMount() {
    let coords = { longitude: LocationStore.location.longitude, latitude: LocationStore.location.latitude };
    AdvertsListStore.getAdverts({ coords: coords });
  }

  componentWillUnmount(){
    AdvertsListStore.cleanAdverts();
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
    </View>;
  }
}