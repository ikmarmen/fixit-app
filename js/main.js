import React, { Component } from 'react';
import {observer} from 'mobx-react';
import { Container, Content, Text, Button } from 'native-base';
import MainStore from './mainStore';

@observer
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.store = MainStore;
  }

  render() {
    return this.store.isFontsLoaded 
    ? <Container>
      <Content padder>
        <Text>Text Example</Text>
        <Button onPress={this.store.fetchUserInfo}>
          <Text>Load User info</Text>
        </Button>
      </Content>
    </Container>
    : null;
  }
}