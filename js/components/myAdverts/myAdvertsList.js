import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { Content, Spinner, List, View } from 'native-base';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import MyAdvertsListStore from './myAdvertsStore';
import MyAdvertCard from './myAdvertCard'

@observer
export default class AdvertsList extends Component {
  constructor(props) {
    super(props);
    this.store = MyAdvertsListStore;
  }

  componentWillMount() {
    MyAdvertsListStore.initialize();
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
              <MyAdvertCard advert={item} />
            }>
          </List>
          : <Spinner />}
      </Content>
    </View>;
  }
}