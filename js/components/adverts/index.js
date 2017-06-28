import React, { Component } from 'react';
import { Content, Header, Left,Button , Item, Icon, Input, View, Container } from 'native-base';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import AdvertsListStore from './advertsStore';
import AdvertsList from './advertsList'

@observer
export default class AdvertsExplore extends Component {
  constructor(props) {
    super(props);
    this.store = AdvertsListStore;
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
    </Container>;
  }
}