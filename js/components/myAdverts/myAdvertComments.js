import React, { Component } from 'react';
import { Modal } from 'react-native';
import { Content, Text, View, Input, Button } from 'native-base';
import { observer } from 'mobx-react';

@observer
export default class AdvertsComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.store = props.store;
  }



  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _renderQuestion = (question) => {
    return (
      <View key={question._id} style={{ flex: 1, borderWidth: 0.5, margin: 1, borderColor: 'gray' }}>
        <View style={{ marginLeft: 2 }}>
          <Text note style={{ textAlign: 'left' }}>{`Q: ${question.body}`}</Text>
        </View>
        {question.answer
          &&
          <View style={{ marginLeft: 10 }}>
            <Text note style={{ textAlign: 'left' }}>{`A: ${question.answer.body}`}</Text>
          </View>
          ||
          <View style={{ marginLeft: 10 }}>
            <Button onPress={() => {
              this.setModalVisible(true)
            }}>
              <Text>Reply</Text>
            </Button>
          </View>
        }
      </View>
    )
  }

  render() {
    return <View style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2 }}>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => { alert("Modal has been closed.") }}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Hello World!</Text>

            <Button onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </Button>

          </View>
        </View>
      </Modal>
      <Text style={{ textAlign: 'left' }}>FAQ</Text>
      <View>
        {this.store.advert.questions.map((question) => {
          return this._renderQuestion(question)
        })}
      </View>
    </View>
  }
}