import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, TextInput, Picker } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import FloatingLabelInput from '../../../controls/floatingLabelInput';

@observer
export default class AdvertsFilter extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.5} style={styles.closeBtn} onPress={() => this.store.close()} >
            <MaterialCommunityIcons name='close' size={25} style={{ color: '#777777' }} />
          </TouchableOpacity >
        </View>
        <View style={styles.filterInputContainer}>
          <View style={styles.filterInput} >
            <FloatingLabelInput
              style={StyleSheet.flatten(styles.inputText)}
              label={"Max Distance km"}
              value={this.store.maxDistance}
              onChangeText={(text) => this.store.maxDistance = text} />
          </View>

          <View style={styles.filterInput} >
            <View style={styles.switchContainer}  >
              <Text>Search by zip</Text>
              <Switch
                value={this.store.isSearchByZip}
                onValueChange={() => this.store.isSearchByZip = !this.store.isSearchByZip} />
            </View>
            <FloatingLabelInput
              style={StyleSheet.flatten(styles.inputText)}
              label={"Zip code"}
              value={this.store.zip}
              disabled={!this.store.isSearchByZip}
              onChangeText={(text) => this.store.zip = text} />
          </View>
          <View style={styles.filterInput} >
            <Picker
              selectedValue={this.store.selectedOrder}
              onValueChange={(itemValue, itemIndex) => this.store.selectedOrder = itemValue}>
              {this.store.orderList.map((order => {
                {
                  return <Picker.Item label={order.label} value={order.value} key={order.value} />
                }
              }))}
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f2f2f2',
    height: 46,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    alignItems: 'flex-end',
    padding: 10,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  filterInputContainer: {
    alignItems: 'center',
  },
  filterInput: {
    backgroundColor: '#fff',
    width: '95%',
    marginTop: 5,
  },

});
