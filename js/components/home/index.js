import React, { Component } from 'react';
import { Container, Content, Button, Icon, Left, Header, Input, Item } from 'native-base';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { AuthStore } from '../auth/authStore';
import Adverts from '../adverts/'

@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  _renderAccountOrLogin=()=>{
    if(AuthStore.isAuthenticated){
      return <Icon name='person' onPress={() => Actions.account({ type: ActionConst.PUSH })} />;
    }
    return <Icon name='log-in' onPress={() => Actions.auth({ type: ActionConst.PUSH })} />;
  }

  render() {
    return <Container>
      <Header searchBar rounded>
        <Left>
          <Button transparent>
            {this._renderAccountOrLogin()}
          </Button>
        </Left>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
      </Header>
      <Content>
        <Adverts />
      </Content>
    </Container>;
  }
}