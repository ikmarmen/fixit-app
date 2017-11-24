import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { observer } from 'mobx-react';


@observer
export default class AdvertsComments extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  _renderQuestion = (question) => {
    return (
      <View style={styles.qaContainer} key={question._id} >
        <View >
          <Text note style={styles.questionText} >{`Q: ${question.body}`}</Text>
        </View>
        {question.answer
          &&
          <View >
            <Text note style={styles.answerText}>{`A: ${question.answer.body}`}</Text>
          </View>
          ||
          null
        }
      </View>
    )
  }

  render() {
    return <View style={styles.container}>
      <Text style={styles.commentTitle} >QUESTIONS</Text>

      <View>
        <TextInput style={styles.textInput}
          multiline={true}
          numberOfLines={1}
          placeholder='Want to ask somethig?'
          onChangeText={this.store.addQuestionText}
          value={this.store.newQuestion} />
        <View style={styles.commentBottom} >
          <TouchableOpacity style={styles.btnContainer} activeOpacity={0.5} onPress={this.store.addQuestion} >
            <Text style={styles.btnText}>Send Question</Text>
          </TouchableOpacity >
        </View>
      </View>




      <View >
        {this.store.advert.questions
          ? this.store.advert.questions.map((question) => {
            return this._renderQuestion(question)
          })
          : null
        }
      </View>


    </View>
  }
}
const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: '#e0e0e0',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    marginLeft: 10,
    paddingBottom: 10,
    flexDirection: 'column',
  },
  commentTitle: {
    padding: 10,
    fontWeight: 'bold',
  },
  qaContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    width: '95%',
    marginLeft: 10,
    padding: 5,
  },
  questionText: {
    color: '#444',
  },
  answerText: {
    color: '#999',
  },
  textInput: {
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginLeft: 10,
    width: '95%',
  },
  commentBottom: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  btnContainer: {
    width: '75%',
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e642',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    padding: 20,
    color: 'white',
    fontWeight: '800',
  },


});