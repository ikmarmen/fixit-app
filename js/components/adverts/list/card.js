import React, { Component } from 'react';
import {StyleSheet,  Image, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { timeSince } from '../../../utils/dateHelper';
import Config from '../../../../config.js';

@observer
export default class FixItCard extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.advert;
  }

  _onClicked = () => {
    let store = this.store;
    Actions.advert({ type: ActionConst.PUSH, store: store });
  }

  _renderImage = () => {
    let id = this.store.advert.photos[0]._id;
    return (
      <Image key={id} resizeMode='stretch' style={{ height: 200, width: null, flex: 1, resizeMode: 'cover' }} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onClicked}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            {this._renderImage()}
            
              <View style={styles.card}>
                  <View style={styles.cardtitleContainer}>
                    <Text style={styles.cardTitle}>{this.store.advert.title}</Text>
                  </View>

                  <View style={styles.cardInfoTop}>
                    <Image source={require('../../../../img/location.png')} />
                    <Text style={styles.cardText}>{`${this.store.advert.distance} km`}</Text>
                    <Image source={require('../../../../img/date.png')} />
                    <Text style={styles.cardText}>{`${timeSince(this.store.advert.createdAt)} ago`}</Text>
                    <Image source={require('../../../../img/views.png')} />
                    <Text style={styles.cardTextRight}>{`5 views`}</Text>
                  </View>

                  <View style={styles.cardInfoBottom}>
                    <View style={styles.cardInfo}>

                      <TouchableOpacity activeOpacity={0.5} onPress={this.onFacebookLogin}>
                        <View >
                          <Text style={styles.cardInfoTextLeft}>{`${this.store.advert.bids.length} BIDS`}</Text>
                        </View>
                      </TouchableOpacity >

                      <TouchableOpacity activeOpacity={0.5} onPress={this.onFacebookLogin}>
                        <View>
                          <Text style={styles.cardInfoTextRight}>{`${this.store.advert.questions.length} QUESTIONS`}</Text>
                        </View>
                      </TouchableOpacity >

                    </View>

                    <TouchableOpacity  style={styles.btnContainer} activeOpacity={0.5} onPress={this.onLogin} >
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
    alignItems: 'center' ,
    marginBottom: 10,
  },
  cardInfoBottom: {
    width: '100%',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' ,    
  },
  cardInfo: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' ,
    width: '50%',
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
