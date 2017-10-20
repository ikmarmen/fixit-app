import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, Slider, CheckBox, TextInput, ScrollView, Modal } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Config from '../../../config.js';
import { timeSince } from '../../utils/dateHelper';


@observer
export default class MyAdvert extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  _renderImage = () => {
    let id = this.store.advert.photos[0]._id;
    return (
      <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MY QUOTE</Text>
          <TouchableOpacity activeOpacity={0.5} style={styles.closeBtn} onPress={this.store.close} >
            <MaterialCommunityIcons name='close' size={25} style={{ color: '#fff' }} />
          </TouchableOpacity >
        </View>
        <ScrollView>
          <View style={styles.viewContainer}>
            <View style={styles.top}>
              <View style={styles.image}>
                {this._renderImage()}
              </View>
              <View style={styles.topRight}>
                <Text style={styles.title}>{this.store.advert.title}</Text>
                <Text style={styles.name}>{this.store.advert.createdBy}</Text>
                <View style={styles.info}>
                  <Octicons name='location' style={styles.icon} />
                  <Text style={styles.infoText}>{this.store.advert.distance + 'km'}</Text>
                  <Ionicons name='md-time' style={styles.icon} />
                  <Text style={styles.infoText}>{`${timeSince(this.store.advert.createdAt)} ago`}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );

  }
}
const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#264559',
    height: 46,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '800',
  },
  viewContainer: {
    alignItems: 'center',
  },
  top: {
    width: '100%',
    height: 180,
    backgroundColor: '#eeeeee',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: '48%',
    height: '100%',
  },
  topRight: {
    width: '50%',
  },
  title: {
    fontSize: 16,
    height: '55%',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    color: '#46c6e9',
    fontSize: 25,
  },
  infoText: {
    marginRight: 7,
    marginLeft: 8,
  },
}