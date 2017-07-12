import React, { Component } from 'react';
import { Image } from 'react-native';
import { observer } from 'mobx-react';
import { Card, CardItem, Thumbnail, Body, Text, Left, Right, Icon, Item, Button, ListItem, List, Content, View, Spinner } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { timeSince } from '../../utils/dateHelper';
import Config from '../../../config.js';

@observer
export default class FixItCard extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.advert;
  }

  _onClicked = () => {
    let store = this.store;
    Actions.advert({ type: ActionConst.PUSH, store: store });
  }

  _renderImage = () => {
    let id = this.store.advert.photos[0]._id;
    return (
      <Image key={id} resizeMode='stretch' style={{ height: 200, width: null, flex: 1, resizeMode: 'cover' }} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
    );
  }

  render() {
    return (
      <ListItem button={true} onPress={this._onClicked} style={{ height: 310 }}>
        <Content style={{ padding: 4, shadowColor: "#000", elevation: 4, backgroundColor: '#FFFFFF' }}>
          {this._renderImage()}
          <View style={{ marginLeft: 4, marginRight: 4 }}>
            <Text style={{ textAlign: 'left' }}>{this.store.advert.title}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{`${this.store.advert.distance} km`}</Text>
              <Text>{`${timeSince(this.store.advert.createdAt)} ago`}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button transparent style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0, paddingLeft: 0, height: 25 }}>
                <Icon active name="cash" />
                <Text>{`${this.store.advert.bids.length} bids`}</Text>
              </Button>
              <Button transparent style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0, paddingLeft: 0, height: 25 }}>
                <Icon active name="chatbubbles" />
                <Text>{`${this.store.advert.questions.length} questions`}</Text>
              </Button>
            </View>
          </View>
        </Content>
      </ListItem>
    );
  }
}