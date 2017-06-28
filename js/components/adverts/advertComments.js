import React, { Component } from 'react';
import { Content, Text, View } from 'native-base';
import { observer } from 'mobx-react';

@observer
export default class AdvertsComments extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    return <View>
      <Text style={{ textAlign: 'left' }}>Comments</Text>
      {this.store.comments.map((comment, index) => {
        return <Text key={index} style={{ textAlign: 'left' }}>{comment.body}</Text>;
      })}
    </View>
  }
}