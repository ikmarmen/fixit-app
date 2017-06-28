import React, { Component } from 'react';
import { Image } from 'react-native';
import { observer } from 'mobx-react';
import { Card, CardItem, Thumbnail, Body, Text, Left, Right, Icon, Item, Button, DeckSwiper, ListItem, List, Content, View, Spinner } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { timeSince } from '../../utils/dateHelper';

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
    let photo = this.store.mainPhoto;
    if (photo) {
      return <Image source={{ uri: photo }} style={{ height: 200, width: null, flex: 1 }} />;
    } else {
      return <Spinner style={{ height: 200, width: null, flex: 1 }} />;
    }
  }

  render() {
    return <List>
      <ListItem button={true} onPress={this._onClicked}>
        <Content>
          <Body>
            <Text>{this.store.advert.title}</Text>
          </Body>
          {this._renderImage()}
          <Body>
            <Left>
              <Button transparent>
                <Icon active name="cash" />
                <Text>{`${this.store.advert.bids.length} bids`}</Text>
              </Button>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>{`${this.store.comments.length} comments`}</Text>
              </Button>
            </Left>
            <Right>
              <Text>{`${this.store.advert.distance} km`}</Text>
              <Text>{`${timeSince(this.store.advert.createdAt)} ago`}</Text>
            </Right>
          </Body>
        </Content>
      </ListItem>
    </List>;
  }
}