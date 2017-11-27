import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, Slider, CheckBox, TextInput, ScrollView, Modal } from 'react-native';
import FixitModal from '../../../controls/modal';

export default class AnswerModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        answer: null,
        isPublic: false
      }
    }
  
    _onAnswer = () => {
      this.props.onAnswerd(this.state);
    }
  
    _onChange = (value, name) => {
      let state = Object.assign({}, this.state);
      state[name] = value
      this.setState(state);
    }
  
    render() {
      return (
        <FixitModal isVisible={this.props.isVisible} bodyStyle={{ width: 280, height: 280 }}>
          <View style={modalStyles.header}>
            <Text style={modalStyles.headerTitle}>ANSWER</Text>
          </View>
          <View style={modalStyles.container}>
            <Text>Can you fix this in a week?</Text>
            <View style={modalStyles.addContactInput} >
              <View>
                <Text>Your Message:</Text>
              </View>
              <TextInput
                onChangeText={(text) => this._onChange(text, 'answer')}
                style={modalStyles.TextInput}
                multiline={true}
                numberOfLines={2}
                underlineColorAndroid='#46c6e9'
                selectionColor="#46c6e9" />
            </View>
            <View style={modalStyles.publicCheck}>
              <Text>Is public</Text>
              <CheckBox onValueChange={(value) => this._onChange(value, 'isPublic')} />
            </View>
          </View>
          <View style={modalStyles.modalButtons}>
            <TouchableOpacity style={modalStyles.modalButtonAdd} activeOpacity={0.5} onPress={this._onAnswer}>
              <Text>Answer</Text>
            </TouchableOpacity >
            <TouchableOpacity style={modalStyles.modalButtonClose} activeOpacity={0.5} onPress={() => this.props.onClose()}>
              <Text>Close</Text>
            </TouchableOpacity >
          </View>
        </FixitModal>);
    }
  }

  const modalStyles = {
    header: {
      flexDirection: 'row',
      backgroundColor: '#264559',
      height: 46,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    container: {
      padding: 10,
    },
    headerTitle: {
      color: '#fff',
      fontWeight: '800',
    },
    top: {
      width: '100%',
      height: 130,
      backgroundColor: '#eeeeee',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    image: {
      width: '48%',
      height: '100%',
    },
    topRight: {
      width: '50%',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 16,
      height: '40%',
    },
    name: {
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 5,
      marginBottom: 5,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: '#46c6e9',
      fontSize: 25,
    },
    infoText: {
      marginRight: 7,
      marginLeft: 8,
    },
    addContactInput: {
      height: 80,
      paddingTop: 10,
      paddingBottom: 10,
    },
    modalButtons: {
      width: '100%',
      flexDirection: 'row',
      height: 50,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    modalButtonAdd: {
      width: '50%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 1,
      borderRightColor: '#ccc',
    },
    modalButtonClose: {
      width: '50%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    acceptQuote: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    quoteValues: {
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginRight: 10,
      paddingTop: 20,
      paddingRight: 40
    },
    TextInput: {
      marginTop: 5,
      width: '95%',
      borderColor: '#cccccc',
      borderWidth: 1
    },
    helperText: {
      paddingLeft: 10,
      color: '#cccccc',
      fontStyle: 'italic',
    },
    contact: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    contactAdd: {
      width: '85%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    publicCheck: {
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 20,
    },
  }