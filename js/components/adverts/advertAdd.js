import React, { Component } from 'react';
import { Container, Content, Header, Item, Icon, Input, Text, Button, View } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { observer } from 'mobx-react';

@observer
export default class MyAdvertsExplore extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Container>
      <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between', maxHeight: 70 }}>
        <View>
          <Button transparent style={{ position: 'absolute' }}>
            <Icon name='close' onPress={() => Actions.pop()} />
          </Button>  
        </View>
        <View>
          <Text>Add new advert</Text>
        </View>
      </View>
    </Container>;
  }
}