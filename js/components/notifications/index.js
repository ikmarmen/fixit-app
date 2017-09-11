import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { RefreshControl, View } from 'react-native';
import { Content, Spinner, List } from 'native-base';
import AlertCard from './alertCard'

@observer
export default class Notifications extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  const adverts = [{}, {}, {}, {}, {}, {}, {},{}, {}, {}];

    return <View style={{ flex: 1 }}>
      <Content scrollEventThrottle={300}
        refreshControl={
          <RefreshControl refreshing={false} />
        }
        removeClippedSubviews={true}>
        {adverts.length > 0
          ? <List dataArray={adverts}
            renderRow={(item) =>
              <AlertCard alert={item} />
            }>
          </List>
          : <Spinner />}
      </Content>
    </View>;
  }
}