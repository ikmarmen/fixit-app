import React, { Component } from 'react';
import { Container, Content, Text, Button, Body, Title, Icon, Left,Right, Header } from 'native-base';
import RouterStore from '../routerStore';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = RouterStore;
  }
  render() {
    return <Container>
      <Header backgroundColor="red">
        <Left />
        <Body>
           <Title>Home</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Button onPress={this.store.fetchUserInfo}>
          <Text>Load User info</Text>
        </Button>
      </Content>
    </Container>;
  }
}