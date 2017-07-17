import React, { Component } from 'react';
import { Container, Content, Button, Icon, Footer, FooterTab, Fab, View, Badge, Text } from 'native-base';
import { observer } from 'mobx-react';
import NewAdvertStore from '../newAdvert/newAdvertStore'
import MainStore from './mainStore';
import ImagePicker from 'react-native-image-crop-picker';
import Display from '../display/';

@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = MainStore;
  }

  _renderContent = () => {
    for (let i = 0; i < this.store.tabs.length; i++) {
      let tab = this.store.tabs[i];
      if (tab.isActive)
        return <tab.component/>;
    }
  }

  addAdvert = (photos) => {
    let newAdvertStore = new NewAdvertStore();
    newAdvertStore.addPhotos(photos);
  }

  onSelectPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      compressImageMaxWidth: 1600,
      compressImageMaxHeight: 1200
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
      compressImageMaxWidth: 1600,
      compressImageMaxHeight: 1200
    })
      .then(image => {
        if (image) {
          this.addAdvert([image]);
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
    </Container>;
  }
}