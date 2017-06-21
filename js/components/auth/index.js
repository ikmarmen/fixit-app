import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Body, Left, Right, Title, Icon } from 'native-base';
import LoginStore from './loginStore';

@observer
export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.store = LoginStore;
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='cog' />
            </Button>
          </Left>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    );
  }
}