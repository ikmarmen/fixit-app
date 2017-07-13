import React, { Component } from 'react';
import { Container, Content, Header, Item, Icon, Input, Text, Button } from 'native-base';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import MyAdvertsList from './myAdvertsList'

@observer
export default class MyAdverts extends Component {
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
      <MyAdvertsList/>
    </Container>;
  }
}