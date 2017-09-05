import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { timeSince } from '../../utils/dateHelper';
import Config from '../../../config.js';

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
      <View button={true} onPress={this._onClicked} style={{ flex: 1, height: 310, padding: 4, shadowColor: "#000", elevation: 4, backgroundColor: '#FFFFFF' }}>
        {this._renderImage()}
        <View style={{ marginLeft: 4, marginRight: 4 }}>
          <Text style={{ textAlign: 'left' }}>{this.store.advert.title}</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{`${this.store.advert.distance} km`}</Text>
            <Text>{`${timeSince(this.store.advert.createdAt)} ago`}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity activeOpacity={0.5} onPress={this.onFacebookLogin}>
              <View>
                <Image source={require('../../../img/fb.png')} />
                <Text>{`${this.store.advert.bids.length} bids`}</Text>
              </View>
            </TouchableOpacity >
            <TouchableOpacity activeOpacity={0.5} onPress={this.onFacebookLogin}>
              <View>
                <Image source={require('../../../img/fb.png')} />
                <Text>{`${this.store.advert.questions.length} questions`}</Text>
              </View>
            </TouchableOpacity >
          </View>
        </View>
      </View>
    );
  }
}