import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
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
  }

  componentWillMount() {
    let coords = { longitude: LocationStore.location.longitude, latitude: LocationStore.location.latitude };
    AdvertsListStore.initialize({ coords: coords });
  }

  render() {
    const adverts = this.store.adverts.toJS();

    return <View style={{ flex: 1 }}>
      <Content scrollEventThrottle={300}
        refreshControl={
          <RefreshControl onRefresh={this.store.onRefresh}
            refreshing={this.store.isRefreshing} />
        }
        removeClippedSubviews={true}
        onScroll={this.store.onScrolePositionChange}>
        {adverts.length > 0
          ? <List dataArray={adverts}
            renderRow={(item) =>
              <AdvertCard advert={item} />
            }>
          </List>
          : <Spinner />}
      </Content>
    </View>;
  }
}