import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Item, Input, Label, Icon } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import { AuthStore } from '../auth/authStore';
import FixitModal from '../../controls/modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.store = AuthStore;
    this.state = {
      isModalVisible: false
    }
  }

  render() {
    return (<View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={Actions.pop}>
          <MaterialCommunityIcons name='close' size={25} style={{ color: '#fff' }} />
        </TouchableOpacity >
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.inputContainer}>
          <Item style={styles.input} floatingLabel>
            <Label style={styles.inputLabel}>Name</Label>
            <Icon name='person' style={{ color: 'white' }} />
            <Input style={styles.inputText} onChangeText={(text) => this.store.setProp(text, 'name')} value={this.store.user.name} />
          </Item>
          <Item style={styles.input} floatingLabel>
            <Label style={styles.inputLabel}>Email</Label>
            <Icon name='lock' style={{ color: 'white' }} />
            <Input style={styles.inputText} onChangeText={(text) => this.store.setProp(text, 'email')} value={this.store.user.email} />
          </Item>
          <Item style={styles.input} floatingLabel>
            <Label style={styles.inputLabel}>Phone</Label>
            <Icon name='lock' style={{ color: 'white' }} />
            <Input style={styles.inputText} onChangeText={(text) => this.store.setProp(text, 'phone')} value={this.store.user.phone} />
          </Item>
          <TouchableOpacity activeOpacity={0.5} onPress={this.store.update}>
            <Text>Save</Text>
          </TouchableOpacity >
          <TouchableOpacity activeOpacity={0.5} onPress={() => { this.setState({ isModalVisible: true }) }}>
            <Text>Change Password</Text>
          </TouchableOpacity >
        </View>
      </View>
      <FixitModal isVisible={this.state.isModalVisible}>
        <TextInput value={this.store.newContact} onChangeText={this.store.onNewContactValueChange} />
        <TouchableOpacity activeOpacity={0.5} onPress={() => { this.setState({ isModalVisible: false }) }}>
          <Text>close</Text>
        </TouchableOpacity >
      </FixitModal>
    </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#264559',
    height: 46,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '800',
  },
  viewContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  input: {
    height: 50,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 12,
  },
  inputText: {
    fontSize: 18,
  },
  inputContainer: {
    width: '75%',
    height: 140,
    marginTop: '12%',
  }
}