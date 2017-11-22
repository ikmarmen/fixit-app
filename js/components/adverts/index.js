import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {NewAdvertStore} from './store'
import ListStore from './store';
import List from './list/';
import Navbar from '../../controls/navBar';


@observer
export default class AdvertsExplore extends Component {
  constructor(props) {
    super(props);
    this.store = ListStore;
  }
  componentWillMount() {
    ListStore.initialize();
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
    const btnColor = "rgba(38,69,89,0.65)";

    return (
      <View style={{ flex: 1 }}>
        <Navbar title='Home'
          onClearText={() => this.store.onSearch()}
          onSearch={(text) => this.store.onSearch(text)}
          onOpenFilter={() => this.store.openFilters()} />
        <List store={this.store} />

        <ActionButton buttonColor={btnColor}>
          <ActionButton.Item buttonColor="rgba(38,69,89,0.9)" onPress={this.onCamera}>
            <Icon name="camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="rgba(38,69,89,0.9)" onPress={this.onSelectPhoto}>
            <Icon name="image-album" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>);
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});