import React, { Component } from 'react';
import { Content, Header, Left,Button , Item, Icon, Input, View, Container } from 'native-base';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import AdvertsList from './advertsList'
import FabButton from '../fab/'

@observer
export default class AdvertsExplore extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
      </Header>
      <AdvertsList/>
      <FabButton/>
    </Container>;
  }
}