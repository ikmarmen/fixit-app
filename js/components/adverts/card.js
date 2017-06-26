import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Text, Left, Right, Icon, Item, Button, DeckSwiper, View } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { timeSince } from '../../utils/dateHelper';

export default class FixItCard extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.advert;
  }

  _photo = (photos) => {
    try {
      if (photos.length > 0) {
        let chars = [];
        for (let i = 0; i < photos[0].data.data.length; i++) {
          chars.push(String.fromCharCode(photos[0].data.data[i]))
        }
        let base64str = btoa(chars.join(''));

        return 'data:image/jpeg;base64,' + base64str;
      }
    }
    catch (error) {
      let x = 54;
    }

    return null;

  }

  render() {
    return <Card>
      <CardItem>
        <Body>
          <Text>{this.store.advert.title}</Text>
        </Body>
      </CardItem>
      <CardItem cardBody>
        <Image source={{ uri: this._photo(this.store.advert.photos) }} style={{ height: 200, width: null, flex: 1 }} />
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