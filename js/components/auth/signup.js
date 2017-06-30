import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Header, Body, Left, Right, Title, Toast } from 'native-base';
import { SignupStore } from './authStore';

@observer
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.store = new SignupStore();
  }

  render() {
    return <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>First Name</Label>
            <Input onChangeText={(text) => this.store.setProp(text, 'firstName')} />
          </Item>
          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input onChangeText={(text) => this.store.setProp(text, 'lastName')} />
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input onChangeText={(text) => this.store.setProp(text, 'email')} />
          </Item>
          <Item floatingLabel >
            <Label>Password</Label>
            <Input onChangeText={(text) => this.store.setProp(text, 'password')} />
          </Item>
          <Button block onPress={this.store.signup} disabled={(!this.store.isValid)}>
            <Text>Sign Up</Text>
          </Button>
        </Form>
      </Content>
    </Container>;
  }
}