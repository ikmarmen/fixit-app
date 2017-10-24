import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, TextInput, Picker } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';

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
            <Icon name='close' style={{ color: '#777777' }} />
          </TouchableOpacity >
        </View>
        <View  style={styles.filterInputContainer}>
          <View style={styles.filterInput} >
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
