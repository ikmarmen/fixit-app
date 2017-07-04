import React, { Component } from 'react';
import { Container, Content, Item, Icon, Input, Text, Button, View, Form, Label } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { TextInput } from 'react-native';
import { observer } from 'mobx-react';

@observer
export default class MyAdvertsExplore extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }
  render() {
    return <Container>
      <Content>
        <View style={{marginTop:40}}>
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input onChangeText={(text) => this.store.setProp(text, 'title')} value={this.store.title} />
            </Item>
            <Item floatingLabel>
              <Label>Description</Label>
              <Input multiline={true}
                numberOfLines={3}
                style={{ height: 120 }}
                onChangeText={(text) => this.store.setProp(text, 'description')}
                value={this.store.description} />
            </Item>
            <Button block onPress={this.store.postAdvert} disabled={(!this.store.isValid)}>
              <Text>Post</Text>
            </Button>
          </Form>
        </View>
      </Content>
      <Button transparent style={{ position: 'absolute' }} onPress={() => Actions.pop()}>
        <Icon name='close' />
      </Button>
    </Container>;
  }
}