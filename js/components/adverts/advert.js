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
        <View  style={styles.postTitle}>
          <Text  style={styles.postMainTitle}>{this.store.advert.title}</Text>
          <Text style={styles.name}>Serita Collington</Text>



          <View style={styles.info}>
            <Image source={require('../../../img/location.png')} />
            <Text style={styles.infoText}>21km</Text>
            <Image source={require('../../../img/date.png')} />
            <Text style={styles.infoText}>2 hours ago</Text>
           
            <TouchableOpacity><Text style={styles.mapLink}>View on map</Text></TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5} onPress={this.onLogin} >
                <View style={styles.btnContainer}>
                  <Text style={styles.btnText}>QUOTE</Text>
                </View>
              </TouchableOpacity >



          </View>



          <Text note  style={styles.description}>{this.store.advert.description}</Text>
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
  },
  infoText: {
    marginRight: 5,
    marginLeft: 5,
  },
  mapLink: {
    fontWeight: 'bold',
  },
  btnContainer: {
    width: 120,
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