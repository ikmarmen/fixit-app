import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import Swiper from 'react-native-swiper'
import { Actions, ActionConst } from 'react-native-router-flux';
import Config from '../../../../config.js';
import Comments from './comments';
import { timeSince } from '../../../utils/dateHelper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

@observer
export default class Advert extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }
  render() {
    return (
      <ScrollView>
        <View>
          <View height={250} width='100%' >
            <Swiper>
              {this.store.advert.photoIds.map((photoId) => {
                return <Image key={photoId}
                  resizeMode='cover'
                  style={styles.image}
                  source={{ uri: `${Config.BASE_URL}posts/photo/${photoId}` }} />
              })}
            </Swiper>
          </View>
          <View style={styles.rowViewContainer} />
          <View style={styles.postTitle}>
            <Text style={styles.postMainTitle}>{this.store.advert.title}</Text>
            <Text style={styles.name}>{this.store.advert.userName}</Text>
            <View style={styles.info}>

              <View style={styles.infoLeft}>

                <SimpleLineIcons name='location-pin' style={styles.icon} />
                <Text style={styles.infoText}>{parseInt(this.store.advert.distance / 1000) + 'km'}</Text>
                <Ionicons name='md-time' style={styles.icon} />
                <Text style={styles.infoText}>{`${timeSince(this.store.advert.createdAt)} ago`}</Text>

                <TouchableOpacity><Text style={styles.mapLink}>View on map</Text></TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.btnContainer} activeOpacity={0.5} onPress={this.store.openQuote} >
                <View>
                  <Text style={styles.btnText}>QUOTE</Text>
                </View>
              </TouchableOpacity >
            </View>
            <Text note style={styles.description}>{this.store.advert.description != "null" ? this.store.advert.description : ''}</Text>
          </View>
          <View style={styles.rowViewContainer} />
          <Comments store={this.store} />
        </View>
        <TouchableOpacity activeOpacity={0.5} style={{ position: 'absolute' }} onPress={() => Actions.pop()} >
          <View>
            <Icon name='close' color={'white'} size={30} />
          </View>
        </TouchableOpacity >
      </ScrollView>);
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTitle: {
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-between',
  },
  postMainTitle: {
    fontSize: 20,
    color: '#444444',
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
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    marginRight: 7,
    marginLeft: 2,
  },
  mapLink: {
    fontWeight: 'bold',
  },
  btnContainer: {
    width: '25%',
    height: 40,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e642',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '800',
  },
  description: {
    fontSize: 16,
    color: '#444444',
  },
}