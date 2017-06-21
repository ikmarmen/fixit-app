import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Body, Left, Right, Title, Icon, Tabs, Tab, TabHeading } from 'native-base';
import AuthStore from './authStore';

import Login from './login';
import Signup from './signup';

@observer
export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.store = AuthStore;
  }

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent>
              <Icon name='close' />
            </Button>
          </Left>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Tabs>
          <Tab heading={<TabHeading><Text>Log In</Text></TabHeading>}>
            <Login />
          </Tab>
          <Tab heading={<TabHeading><Text>Sign Up</Text></TabHeading>}>
            <Signup />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}