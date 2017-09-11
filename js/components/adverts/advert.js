import React, { Component } from 'react';
import { Image, View, Text,TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { Icon } from 'native-base';
import Swiper from 'react-native-swiper'
import { Actions, ActionConst } from 'react-native-router-flux';
import Config from '../../../config.js';
import Comments from './advertComments';

@observer
export default class Advert extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }
  render() {
    return <View>
      <View>
        <View>
          <Swiper height={250}>
            {this.store.advert.photos.map((photo) => {
              return <Image key={photo._id} resizeMode='stretch' style={styles.image} source={{ uri: `${Config.BASE_URL}posts/photo/${photo._id}` }} />
            })}
          </Swiper>
        </View>
        <View style={styles.rowViewContainer} />
        <View>
          <Text>{this.store.advert.title}</Text>
          <Text note style={{ textAlign: 'center' }}>{this.store.advert.description}</Text>
        </View>
        <View style={styles.rowViewContainer} />
        <Comments store={this.store} />
      </View>
      <TouchableOpacity activeOpacity={0.5} style={{ position: 'absolute' }} onPress={() => Actions.pop()} >
        <View>
          <Icon name='close' />
        </View>
      </TouchableOpacity >
    </View>;
  }
}

const styles = {
  image: {
    flex: 1
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 2,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderColor: '#c9c9c9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    marginLeft: 15,
  },
}