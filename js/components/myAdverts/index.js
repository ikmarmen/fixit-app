import React, { Component } from 'react';
import { Container, Content, Header, Item, Icon, Input, Text,Button } from 'native-base';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';

@observer
export default class MyAdvertsExplore extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
      </Header>
      <Content>
        <Text>My adverts</Text>
        <Button transparent onPress={() => Actions.myAdvert({ type: ActionConst.RESET })}>
          <Icon name='open' />
        </Button>
      </Content>
    </Container>;
  }
}