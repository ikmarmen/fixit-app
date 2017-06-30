import React, { Component } from 'react';
import { Container, Content, Header, Item, Icon, Input, Text } from 'native-base';
import { observer } from 'mobx-react';

@observer
export default class MyAdvertsExplore extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Container>
      <Content>
        <Text>Notifications</Text>
      </Content>
    </Container>;
  }
}