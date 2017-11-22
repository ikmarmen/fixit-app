import React, { Component } from 'react';
import { RefreshControl, View, ListView, Text } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import Card from './card'

@observer
export default class AdvertsList extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const adverts = ds.cloneWithRows(this.store.adverts.toJS());

    return <View style={{ flex: 1 }}>
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.store.isRefreshing}
            onRefresh={this.store.onRefresh}
          />
        }
        enableEmptySections={true}
        onEndReachedThreshold={300}
        onEndReached={this.store.onScrolePositionChange}
        dataSource={adverts}
        renderRow={(rowData) => <Card advert={rowData} />}
      />
    </View>;
  }
}