import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { observer } from 'mobx-react';
import AddContactStore from './store';


@observer
export default class AddContact extends Component {
    constructor(props) {
        super(props);
        this.store = AddContactStore;
    }
    _onAdd = () => {
        this.props.onAdd(this.store.contact);
        this.store.close();
    }
    render() {
        return (<Modal animationType="slide"
            transparent={true}
            visible={this.store.isVisible}
            onRequestClose={() => { }}
        ><View style={styles.container}>
                <View style={styles.modalBody}>
                    <TextInput value={this.store.contact} onChangeText={this.store.onValueChange}/>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this._onAdd()}>
                        <Text>Add</Text>
                    </TouchableOpacity >
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.store.close()}>
                        <Text>Close</Text>
                    </TouchableOpacity >
                </View>
            </View>
        </Modal>
        );
    }
}

const styles = {
    container: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBody: {
        backgroundColor: 'white',
        width: 300,
        height: 300
    }
}