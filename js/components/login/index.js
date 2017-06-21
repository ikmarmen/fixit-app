import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Body, Left, Right, Title } from 'native-base';
import LoginStore from './loginStore';

@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.store = LoginStore;
  }

  render() {
    return <Container>
        <Content>
          <Form>
            {
              this.store.error
                ? <Item error>
                  <Text>{this.store.error}</Text>
                </Item>
                : null
            }
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={this.store.setUserName} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={this.store.setPassword} />
            </Item>
            <Button block onPress={this.store.login}>
              <Text>Sign In</Text>
            </Button>
          </Form>
        </Content>
      </Container>;
  }
}