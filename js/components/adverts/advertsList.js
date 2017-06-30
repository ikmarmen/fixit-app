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
    this.state = {
      isFabVisible: false
    }
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
      <Fab position="bottomLeft" style={{ backgroundColor: '#38947a' }}
        active={this.state.isFabVisible}
        onPress={() => this.setState({ isFabVisible: !this.state.isFabVisible })}>
        <Icon name="add" />
        <Button style={{ backgroundColor: '#38947a' }}
          onPress={() => Actions.camera({ type: ActionConst.PUSH })}>
          <Icon name="camera" />
        </Button>
        <Button style={{ backgroundColor: '#38947a' }}>
          <Icon name="photos" />
        </Button>
      </Fab>
    </View>;
  }
}