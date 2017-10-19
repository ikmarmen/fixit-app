import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { TextInput, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { observer } from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatLabelTextInput from 'react-native-floating-label-text-input';

@observer
export default class MyAdvertsExplore extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }
  render() {
    return (<ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MY QUOTE</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={() => Actions.pop()} >
          <MaterialCommunityIcons name='close' size={25} style={{ color: '#fff' }} />
        </TouchableOpacity >
      </View>
      <View style={styles.viewContainer}>
        <FloatLabelTextInput placeholder={"Title"}
          value={this.store.title}
          onChangeTextValue={(text) => this.store.setProp(text, 'title')} />
        <FloatLabelTextInput placeholder={"Description"}
          multiline={true}
          numberOfLines={3}
          value={this.store.description}
          onChangeTextValue={(text) => this.store.setProp(text, 'description')} />
        <TouchableOpacity activeOpacity={0.5} onPress={this.store.postAdvert} disabled={(!this.store.isValid)}>
          <Text>Post</Text>
        </TouchableOpacity >
      </View>
    </ScrollView>);
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
  }
}