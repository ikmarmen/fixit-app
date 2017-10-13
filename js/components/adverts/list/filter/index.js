import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, TextInput, Picker } from 'react-native';
import { Item, Icon, Input, Label } from 'native-base'
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import FilterStore from './store'

@observer
export default class AdvertsFilter extends Component {
  constructor(props) {
    super(props);

    this.store = FilterStore;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.5} style={styles.closeBtn} onPress={() => FilterStore.close()} >
            <Icon name='close' style={{ color: 'black' }} />
          </TouchableOpacity >
        </View>
        <View>
          <View>
            <Item floatingLabel>
              <Label >Max Distance km</Label>
              <Icon name='person' style={{ color: 'white' }} />
              <Input
                onChangeText={(text) => this.store.maxDistance = text }
                value={this.store.maxDistance} />
            </Item>
          </View>
          <View>
            <Text>Search by zip</Text>
            <Switch
              value={this.store.isSearchByZip}
              onValueChange={() => this.store.isSearchByZip= !this.store.isSearchByZip } />
            <Item floatingLabel>
              <Label >ZIP</Label>
              <Icon name='person' style={{ color: 'white' }} />
              <Input
                onChangeText={(text) => this.store.zip= text }
                value={this.store.zip} 
                disabled={!this.store.isSearchByZip}/>
            </Item>
          </View>
          <View>
            <Picker
              selectedValue={this.store.selectedOrder}
              onValueChange={(itemValue, itemIndex) => this.store.selectedOrder= itemValue }>
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
    flexDirection: 'column'
  },
  header: {
    height: 35,
    backgroundColor: '#bfbfbf'
  },
  closeBtn: {
    marginLeft: 6,
    marginTop: 4,
  }
});
