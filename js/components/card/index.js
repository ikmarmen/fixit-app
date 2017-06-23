import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Text, Left, Icon, Button, DeckSwiper, View } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import {timeSince} from '../../utils/dateHelper';

export default class FixItCard extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.advert;
  }
  render() {
    return <Card>
      <CardItem>
        <Left>
          <Thumbnail source={{ uri: this.store.advert.photos[0] }} />
          <Body>
            <Text>{this.store.advert.title}</Text>
            <Text note>{this.store.advert.userName}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image source={{ uri: this.store.advert.photos[0] }} style={{ height: 200, width: null, flex: 1 }} />
      </CardItem>
      <CardItem>
        <Button transparent>
          <Icon active name="cash" />
          <Text>{this.store.advert.bids.length + ' bids'}</Text>
        </Button>
        <Button transparent>
          <Icon active name="chatbubbles" />
          <Text>4 Comments</Text>
        </Button>
        <Text>{timeSince(this.store.advert.createdAt)}</Text>
      </CardItem>
    </Card>;
  }
}