import React, { Component } from 'react';
import { Image } from 'react-native';
import { observer } from 'mobx-react';
import { Card, CardItem, Thumbnail, Body, Text, Left, Right, Icon, Item, Button, ListItem, List, Content, View, Spinner } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { timeSince } from '../../utils/dateHelper';
import Config from '../../../config.js';

@observer
export default class MyCard extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.advert;
  }

  _onClicked = () => {
    let store = this.store;
    Actions.myAdvert({ type: ActionConst.PUSH, store: store });
  }

  _renderImage = () => {
    let id = this.store.advert.photos[0]._id;
    return (
      <Thumbnail square large  source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
    );
  }

  render() {
    return (
      <ListItem button={true} onPress={this._onClicked}>
        {this._renderImage()}
        <Body>
          <Text style={{ textAlign: 'left' }}>{this.store.advert.title}</Text>
          <Text>{`${timeSince(this.store.advert.createdAt)} ago`}</Text>
          <Text>{`${this.store.advert.bids.length} bids`}</Text>
          <Text>{`${this.store.advert.questions.length} questions`}</Text>
        </Body>
      </ListItem>
    );
  }
}