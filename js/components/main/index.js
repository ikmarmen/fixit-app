import React, { Component } from 'react';
import { Container, Content, Button, Icon, Left, Header, Input, Item, Footer, FooterTab, Badge, Text, View } from 'native-base';
import { observer } from 'mobx-react';
import MainStore from './mainStore';
import { Actions, ActionConst } from 'react-native-router-flux';

@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = MainStore;
  }

  _renderTabs = (tab, index) => {
    return (
      <Button key={index} badge={tab.badgeCount > 0} vertical active={tab.isAvtive} onPress={() => this.store.selectTab(index)}>
        {tab.badgeCount > 0 ? <Badge><Text>{tab.badgeCount}</Text></Badge> : null}
        {tab.icon ? <Icon name={tab.icon} /> : null}
        {tab.text ? <Text>{tab.text}</Text> : null}
      </Button>
    );
  }

  _renderContent = () => {
    let activeTabs = this.store.tabs.filter((tab) => {
      if (tab.isAvtive)
        return tab;
    })
    return activeTabs[0].component;
  }

  render() {
    return <Container>
      {this._renderContent()}
      <Footer>
        <FooterTab>
          {this.store.tabs.map((tab, index) => this._renderTabs(tab, index))}
        </FooterTab>
      </Footer>
    </Container>;
  }
}