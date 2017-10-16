import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { observer } from 'mobx-react';

@observer
export default class AdvertsComments extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  _renderQuestion = (question) => {
    return (
      <View key={question._id} style={{ borderWidth: 0.5, margin: 1, borderColor: 'gray' }}>
        <View style={{ marginLeft: 2 }}>
          <Text note style={{ textAlign: 'left' }}>{`Q: ${question.body}`}</Text>
        </View>
        {question.answer
          &&
          <View style={{ marginLeft: 10 }}>
            <Text note style={{ textAlign: 'left' }}>{`A: ${question.answer.body}`}</Text>
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
        {this.store.advert.questions.map((question) => {
          return this._renderQuestion(question)
        })}
      </View>
      <View>
        <TextInput style={{ margin: 2, borderColor: 'gray', borderWidth: 0.5 }}
          multiline={true}
          numberOfLines={3}
          placeholder='Enter youre question.'
          onChangeText={this.store.addQuestionText}
          value={this.store.newQuestion} />
        <TouchableOpacity activeOpacity={0.5} onPress={this.store.addQuestion} >
          <View >
            <Text >Send Question</Text>
          </View>
        </TouchableOpacity >
      </View>
    </View>
  }
}