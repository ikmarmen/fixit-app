import React, { Component } from 'react';
import { Container, Content, Header, Item, Icon, Input, Text } from 'native-base';
import { observer } from 'mobx-react';

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
      </Content>
    </Container>;
  }
}