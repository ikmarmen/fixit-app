import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, Slider, CheckBox, TextInput, ScrollView, Modal } from 'react-native';
import FixitModal from '../../../controls/modal';
import Config from '../../../../config.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { timeSince } from '../../../utils/dateHelper';
import { AuthStore } from '../../auth/store';

export default class AcceptModel extends Component {
  constructor(props) {
    super(props);

    let contacts = []
    contacts.push({ isSelected: false, contact: AuthStore.user.email, type: 'email' });
    if (AuthStore.user.phone) {
      contacts.push({ isSelected: false, contact: AuthStore.user.phone, type: 'phone' });
    }

    this.state = {
      contacts: contacts,
      message: null
    }
  }

  _onContactSelectionChange = (value, index) => {
    let contacts = this.state.contacts.slice();
    contacts[index].isSelected = value;
    this.setState({ contacts: contacts });
  }

  _renderContacts = () => {
    return this.state.contacts.map((item, index) => {
      return (<View style={modalStyles.contact} key={index}>
        <CheckBox value={item.isSelected} onValueChange={(value => this._onContactSelectionChange(value, index))} />
        <MaterialCommunityIcons name={item.type == 'phone' ? 'phone' : 'email-outline'} style={modalStyles.icon} />
        <Text style={modalStyles.infoText}>{item.contact}</Text>
      </View>);
    })
  }
  _textValuesChange = (message) => {
    this.setState({ message: message });
  }
  _onAccepte = ()=>{
    let contacts = this.state.contacts.filter(item => item.isSelected);
    this.props.onAccepted({message: this.state.message, contacts: contacts });
  }

  render() {
    const id = this.props.advertData.photoIds;
    return (
      <FixitModal isVisible={this.props.isVisible} bodyStyle={{ width: 320, height: 460 }}>
        <View style={modalStyles.header}>
          <Text style={modalStyles.headerTitle}>ACCEPTING QUOTE</Text>
        </View>
        <View style={modalStyles.top}>
          <View style={modalStyles.image}>
            <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
          </View>
          <View style={modalStyles.topRight}>
            <Text style={modalStyles.title}>{this.props.advertData.title}</Text>
            <Text style={modalStyles.name}>{this.props.advertData.createdBy}</Text>
            <View style={modalStyles.info}>
              <View style={modalStyles.infoItem}>
                <Ionicons name='md-time' style={modalStyles.icon} />
                <Text style={modalStyles.infoText}>{`${timeSince(this.props.advertData.createdAt)} ago`}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={modalStyles.acceptQuote}>

          <View style={modalStyles.quoteValues}>
            <Text>Your Message:</Text>
          </View>
          <TextInput
            style={modalStyles.TextInput}
            multiline={true}
            onChangeText={(text) => this._textValuesChange(text)}
            numberOfLines={2}
            underlineColorAndroid='#46c6e9'
            selectionColor="#46c6e9" />
          <View style={modalStyles.quoteValues}>
            <Text>You can contact me by...</Text>
          </View>
          {this._renderContacts()}
          <TouchableOpacity style={modalStyles.contactAdd}>
            <Feather name='plus-circle' style={modalStyles.icon} />
            <Text style={modalStyles.infoText}>Add new</Text>
          </TouchableOpacity >

        </View>
        <View style={modalStyles.modalButtons}>
          <TouchableOpacity style={modalStyles.modalButtonAdd} activeOpacity={0.5} onPress={() => this._onAccepte()}>
            <Text>Send</Text>
          </TouchableOpacity >
          <TouchableOpacity style={modalStyles.modalButtonClose} activeOpacity={0.5} onPress={() => this.props.onClose()}>
            <Text>Close</Text>
          </TouchableOpacity >
        </View>
      </FixitModal>
    );
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
  icon: {
    color: '#46c6e9',
    fontSize: 25,
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