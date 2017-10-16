import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Body, Left, Right, Title, Toast, Icon } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { AuthStore } from '../auth/authStore';

@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.store = AuthStore;
  }

  render() {
    return (
      this.store.user 
      ? <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>First Name</Label>
            <Input onChangeText={(text) => this.store.setProp(text, 'firstName')} value={this.store.user.firstName} />
          </Item>
          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input onChangeText={(text) => this.store.setProp(text, 'lastName')} value={this.store.user.lastName} />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(text) => this.store.setProp(text, 'email')} value={this.store.user.email} />
          </Item>
          <Button block onPress={this.store.update} disabled={(!this.store.isValid)}>
            <Text>Save</Text>
          </Button>
          <Button block onPress={() => {
            this.store.logauth();
            Actions.pop();
          }}>
            <Text>Log Out</Text>
          </Button>
        </Form>
      </Content>
    </Container>
    : null );
  }
}