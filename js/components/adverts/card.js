import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Text, Left, Right, Icon, Item, Button, DeckSwiper, ListItem, List, Content, View } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { timeSince } from '../../utils/dateHelper';
import CardImage from './card-image';

export default class FixItCard extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.advert;
  }

  _onClicked = () => {
    let store = this.store ;
    Actions.advert({ type: ActionConst.PUSH, store: store });
  }

  render() {
    return <List>
      <ListItem button={true} onPress={this._onClicked}>
        <Content>
          <Body>
            <Text>{this.store.advert.title}</Text>
          </Body>
          <CardImage imgId={this.store.advert.photos[0]._id} />
          <Body>
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
          </Body>
        </Content>
      </ListItem>
    </List>;
  }
}