import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { LoginStore, AuthStore } from './authStore';

@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.store = new LoginStore();
  }

  onLogin = () => {
    let request = { email: this.store.email, password: this.store.password }
    AuthStore.login(request)
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
          <Button block onPress={this.onLogin} disabled={(!this.store.isValid)}>
            <Text>Log In</Text>
          </Button>
        </Form>
      </Content>
    </Container>;
  }
}