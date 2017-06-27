import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Text, Left, Right, Icon, Item, Button, DeckSwiper, View } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { timeSince } from '../../utils/dateHelper';
import CardImage from './card-image';

export default class FixItCard extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.advert;
  }

  render() {
    return <Card>
      <CardItem>
        <Body>
          <Text>{this.store.advert.title}</Text>
        </Body>
      </CardItem>
      <CardItem cardBody>
        <CardImage imgId={this.store.advert.photos[0]._id}/>
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="cash" />
            <Text>{this.store.advert.bids.length.toString() + ' bids'}</Text>
          </Button>
          <Button transparent>
            <Icon active name="chatbubbles" />
            <Text>4 comments</Text>
          </Button>
        </Left>
        <Right>
          <Text>{this.store.advert.distance + ' miles'}</Text>
          <Text>{timeSince(this.store.advert.createdAt) + ' ago'}</Text>
        </Right>
      </CardItem>
    </Card>;
  }
}