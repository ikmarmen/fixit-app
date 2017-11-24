import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { timeSince } from '../../../utils/dateHelper';
import Config from '../../../../config.js';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


@observer
export default class FixItCard extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.advert;
  }

  componentWillReceiveProps = (nextProps) => {
    this.store = nextProps.advert;
  }

  _onClicked = () => {
    let store = this.store;
    Actions.advert({ type: ActionConst.PUSH, store: store });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onClicked}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>

            <Image key={this.store.advert.photoIds[0]}
              resizeMode='cover'
              style={ styles.img }
              source={{ uri: `${Config.BASE_URL}posts/photo/${this.store.advert.photoIds[0]}` }} />

            <View style={styles.card}>
              <View style={styles.cardtitleContainer}>
                <Text style={styles.cardTitle}>{this.store.advert.title}</Text>
              </View>

              <View style={styles.cardInfoTop}>
                <SimpleLineIcons name='location-pin' style={styles.icon} />
                <Text style={styles.cardText}>{`${parseInt(this.store.advert.distance / 1000)} km`}</Text>
                <Ionicons name='md-time' style={styles.icon} />
                <Text style={styles.cardText}>{`${timeSince(this.store.advert.createdAt)} ago`}</Text>
                <Feather name='eye' style={styles.icon} />
                <Text style={styles.cardTextRight}>{`${this.store.advert.viewsCount} views`}</Text>
              </View>

              <View style={styles.cardInfoBottom}>
                <View style={styles.cardInfo}>

                  <TouchableOpacity activeOpacity={0.5} onPress={this.onFacebookLogin}>
                    <View >
                      <Text style={styles.cardInfoTextLeft}>{`${this.store.advert.bidsCount} QUOTES`}</Text>
                    </View>
                  </TouchableOpacity >

                  <TouchableOpacity activeOpacity={0.5} onPress={this.onFacebookLogin}>
                    <View>
                      <Text style={styles.cardInfoTextRight}>{`${this.store.advert.questionsCount} QUESTIONS`}</Text>
                    </View>
                  </TouchableOpacity >

                </View>

                <TouchableOpacity style={styles.btnContainer} activeOpacity={0.5} onPress={this.store.openQuote} >
                  <View>
                    <Text style={styles.btnText}>QUOTE</Text>
                  </View>
                </TouchableOpacity >

              </View>

            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    height: 320,
    flex: 1,
    margin: 10,
    shadowColor: 'black',
  },
  card: {
    flex: 0.75,
    padding: 15,
    paddingTop: 5,
  },
  cardtitleContainer: {
    height: 55,
  },
  img:{
    height: 200, 
    width: null, 
    flex: 1, 
    resizeMode: 'cover'
  },
  cardTitle: {
    flex: 1,
    fontSize: 20,
    color: '#aaaaaa',
    marginBottom: 5,
  },
  cardText: {
    paddingRight: 5,
    paddingLeft: 5,
    color: '#bbbbbb',
    borderRightWidth: 1,
    borderRightColor: '#cccccc',
    marginRight: 5,
  },
  cardTextRight: {
    paddingRight: 5,
    paddingLeft: 5,
    color: '#bbbbbb'
  },
  cardInfoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardInfoBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
  iconLocation: {
    color: '#46c6e9',
    fontSize: 27,
  },
  icon: {
    color: '#46c6e9',
    fontSize: 25,
  },
  cardInfoTextLeft: {
    fontSize: 16,
    color: '#aaaaaa',
  },
  cardInfoTextRight: {
    fontSize: 16,
    paddingLeft: 10,
    color: '#aaaaaa',
  },
  btnContainer: {
    width: '30%',
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
});
