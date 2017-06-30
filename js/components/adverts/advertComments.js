import React, { Component } from 'react';
import { Content, Text, View, Input, Button } from 'native-base';
import { observer } from 'mobx-react';

@observer
export default class AdvertsComments extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  _renderComment = (comment) => {
    return (
      <View key={comment._id} style={{ flex: 1, borderWidth: 0.5, margin: 1, borderColor: 'gray' }}>
        <View style={{ marginLeft: 2 }}>
          <Text note style={{ textAlign: 'left' }}>{`Q: ${comment.body}`}</Text>
        </View>
        {comment.children && comment.children.length > 0
          &&
          <View style={{ marginLeft: 10 }}>
            <Text note style={{ textAlign: 'left' }}>{`A: ${comment.children[0].body}`}</Text>
          </View>
          ||
          null
        }
      </View>
    )
  }

  render() {
    return <View style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2 }}>
      <Text style={{ textAlign: 'left' }}>FAQ</Text>
      <View>
        {this.store.comments.map((comment) => {
          return this._renderComment(comment)
        })}
      </View>
      <View>
        <Input style={{ margin: 2, borderColor: 'gray', borderWidth: 0.5 }}
          multiline={true}
          numberOfLines={3}
          placeholder='Enter youre question.' />
        <Button>
          <Text>Send Question</Text>
        </Button>
      </View>
    </View>
  }
}