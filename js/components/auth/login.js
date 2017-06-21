import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Body, Left, Right, Title, Toast } from 'native-base';
import { LoginStore } from './authStore';

@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.store = new LoginStore();
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
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(text) => this.store.setProp(text, 'email')} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input onChangeText={(text) => this.store.setProp(text, 'password')} />
          </Item>
          <Button block onPress={this.store.login} disabled={(!this.store.isValid)}>
            <Text>Log In</Text>
          </Button>
        </Form>
        {this._checkErrors()}
      </Content>
    </Container>;
  }
}