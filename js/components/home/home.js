import React, { Component } from 'react';
import { Container, Content, Text, Button } from 'native-base';
import RouterStore from '../routerStore';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = RouterStore;
  }
  render() {
    return <Container>
      <Content padder>
        <Text>Text Example</Text>
        <Button onPress={this.store.fetchUserInfo}>
          <Text>Load User info</Text>
        </Button>
      </Content>
    </Container>;
  }
}