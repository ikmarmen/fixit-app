import React, { Component } from 'react';
import { Container, Content, Button, Icon, Footer, FooterTab, Fab, View, Badge, Text } from 'native-base';
import { observer } from 'mobx-react';
import NewAdvertStore from '../newAdvert/newAdvertStore'
import FabStore from './fabStore';
import ImagePicker from 'react-native-image-crop-picker';
import Display from '../display/';

@observer
export default class FabButton extends Component {
  constructor(props) {
    super(props);
    this.store = FabStore;
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

  render() {
    return (
      <Fab position="bottomRight"
        active={this.store.isFabActive}
        onPress={this.store.toggleFab}
        style={{ backgroundColor: '#264559' }}>
        <Icon name="add" />
        <Button style={{ backgroundColor: '#264559' }}
          onPress={this.onCamera}>
          <Icon name="camera" />
        </Button>
        <Button style={{ backgroundColor: '#264559' }}
          onPress={this.onSelectPhoto}>
          <Icon name="photos" />
        </Button>
      </Fab>
    )
  }
}