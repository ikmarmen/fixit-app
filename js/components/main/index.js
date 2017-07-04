import React, { Component } from 'react';
import { Container, Content, Button, Icon, Footer, FooterTab, Fab, View, Badge, Text } from 'native-base';
import { observer } from 'mobx-react';
import NewAdvertStore from '../newAdvert/newAdvertStore'
import MainStore from './mainStore';
import ImagePicker from 'react-native-image-crop-picker';

@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = MainStore;
  }

  _renderTabs = (tab, index) => {
    return (
      <Button key={index} badge={tab.badgeCount > 0} vertical active={(tab === this.store.activeTab)} onPress={() => this.store.selectTab(tab)}>
        {tab.badgeCount > 0 ? <Badge><Text>{tab.badgeCount}</Text></Badge> : null}
        {tab.icon ? <Icon name={tab.icon} /> : null}
        {tab.text ? <Text>{tab.text}</Text> : null}
      </Button>
    );
  }

  _renderContent = () => {
    return this.store.activeTab.component;
  }

  addAdvert = (photos) => {
    let newAdvertStore = new NewAdvertStore();
    newAdvertStore.addPhotos(photos);
  }

  onSelectPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true
    })
      .then(images => {
        if (images.length > 0) {
          this.addAdvert(images);
        }
      })
      .catch(err => {
        this.store.error = err.message
      });
  }

  onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    })
      .then(images => {
        if (images.length > 0) {
          this.addAdvert(images);
        }
      })
      .catch(err => {
        this.store.error = err.message
      });
  }

  _renderAddBtn = () => {
    return (
      <Fab position="bottomLeft"
        active={this.store.isFabActive}
        onPress={this.store.toggleFab}
        style={{ backgroundColor: '#38947a' }}>
        <Icon name="add" />
        <Button style={{ backgroundColor: '#38947a' }}
          onPress={this.onCamera}>
          <Icon name="camera" />
        </Button>
        <Button style={{ backgroundColor: '#38947a' }}
          onPress={this.onSelectPhoto}>
          <Icon name="photos" />
        </Button>
      </Fab>
    )
  }

  render() {
    return <Container>
      <View style={{ flex: 1 }}>
        {this._renderContent()}
        {this._renderAddBtn()}
      </View>
      <Footer>
        <FooterTab>
          {this.store.tabs.map((tab, index) => this._renderTabs(tab, index))}
        </FooterTab>
      </Footer>
    </Container>;
  }
}