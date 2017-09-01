import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Body, Left, Right, Title, Icon, Tabs, Tab, TabHeading } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
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
        <Login />
      </Container>
    );
  }
}