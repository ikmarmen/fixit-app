import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Body, Left, Right, Title, Toast, Icon } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';

@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  _checkErrors = () => {
    return this.store.error
      ? Toast.show({
        supportedOrientations: ['portrait', 'landscape'],
        text: this.store.error,
        position: 'center',
        duration: 3000,
        buttonText: 'Ok'
      })
      : null;
  }

  render() {
    return <Container>
      <Content>
        <Left>
          <Button transparent>
            <Icon name='close' onPress={() => Actions.pop()} />
          </Button>
        </Left>
        {this._checkErrors()}
      </Content>
    </Container>;
  }
}