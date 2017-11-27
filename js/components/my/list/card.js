import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { timeSince } from '../../../utils/dateHelper';
import Config from '../../../../config.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

export default class MyCard extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.advert;
  }

  componentWillReceiveProps = (nextProps) => {
    this.store = nextProps.advert;
  }

  _onClicked = () => {
    let store = this.store;
    Actions.myAdvert({ type: ActionConst.PUSH, store: store });
  }

  _renderImage = () => {
    let id = this.store.advert.photoIds[0];
    return (
      <Image resizeMode='stretch' style={{ flex: 1, height: 200, width: 200 }} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._onClicked}>
          <View style={styles.myfixit}>
            <View style={styles.myfixitImage}>
              {this._renderImage()}
            </View>
            <View style={styles.myfixitText}>
              <View>
                <Text style={styles.myfixitTitle}>{this.store.advert.title}</Text>
                <View style={styles.myfixitQuotes} >
                  <Ionicons name='md-time' style={styles.icon} />
                  <Text style={styles.cardTextRight}>{`${timeSince(this.store.advert.createdAt)} ago`}</Text>
                  <Feather name='eye' style={styles.icon} />
                  <Text style={styles.cardTextRight}>{`${this.store.advert.viewsCount} views`}</Text>
                </View>
              </View>
              <View style={styles.cardInfo}>
                <TouchableOpacity activeOpacity={0.5} onPress={this.onFacebookLogin}>
                  <View style={styles.myfixitQuotes} >
                    <Text style={styles.cardInfoTextLeft}>{`${this.store.advert.bidsCount} QUOTES`}</Text>
                    <Text style={styles.cardInfonew}>(8new)</Text>
                  </View>
                </TouchableOpacity >
                <TouchableOpacity activeOpacity={0.5} onPress={this.onFacebookLogin}>
                  <View style={styles.myfixitQuotes}>
                    <Text style={styles.cardInfoTextRight}>{`${this.store.advert.questionsCount} QUESTIONS`}</Text>
                    <Text style={styles.cardInfonew}>(3new)</Text>
                  </View>
                </TouchableOpacity >
              </View>
              {this.store.advert.status == 'inprogress'
                ? <TouchableOpacity  style={styles.btnContainer} activeOpacity={0.5} onPress={this.onFacebookLogin}>
                  <Text style={styles.btnText}>CLOSE & RATE</Text>
                </TouchableOpacity >
                : null
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
  myfixit: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  icon: {
    color: '#46c6e9',
    fontSize: 25,
  },
  myfixitImage: {
    height: 150,
    flex: 1,
  },
  myfixitText: {
    flex: 1.5,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 10,
    justifyContent: 'space-between',
  },
  myfixitTitle: {
    fontSize: 18,
    marginBottom: 5,
    maxHeight: 100,
  },
  myfixitQuotes: {
    flexDirection: 'row',
  },
  cardTextRight: {
    paddingRight: 5,
    paddingLeft: 5,
    color: '#bbbbbb'
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 110,
  },
  myfixitQuotes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInfoTextLeft: {
    fontSize: 14,
    paddingRight: 2,
    color: '#aaaaaa',

  },
  cardInfoTextRight: {
    fontSize: 14,
    paddingLeft: 5,
    paddingRight: 2,
    color: '#aaaaaa',
    borderLeftWidth: 1,
    borderLeftColor: '#cccccc',
  },
  cardInfonew: {
    fontSize: 11,
    marginRight: 5,
    color: '#46c6e9',
    fontWeight: '800',
  },
  btnContainer: {
    width: '100%',
    height: 30,
    marginTop: 7,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#e5e642',
    justifyContent: 'center',
  },
  btnText: {
      fontSize: 15,
      color: '#fff',
      fontWeight: '800',
  },



});
