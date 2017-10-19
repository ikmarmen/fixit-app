import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import SettingsStore from './store';

@observer
export default class SettingsMain extends Component {
    constructor(props) {
        super(props);
        //this.store = SettingsStore;
    }
    render() {
        return (<View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={Actions.pop} onPress={Actions.pop}>
                    <MaterialCommunityIcons name='close' size={25} style={{ color: '#fff' }}/>
                </TouchableOpacity >
            </View>
            <View style={styles.viewContainer}>
                <View>
                    <MaterialCommunityIcons name='account' size={35} style={{ color: 'black' }} />
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>Actions.account({ type: ActionConst.PUSH })}>
                        <Text>Account Information</Text>
                    </TouchableOpacity >
                </View>
                <View>
                    <MaterialCommunityIcons name='settings' size={35} style={{ color: 'black' }} />
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>Actions.settings({ type: ActionConst.PUSH })}>
                        <Text>Settings</Text>
                    </TouchableOpacity >
                </View>
                <View>
                    <MaterialCommunityIcons name='information' size={35} style={{ color: 'black' }} />
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>Actions.about({ type: ActionConst.PUSH })}>
                        <Text>About</Text>
                    </TouchableOpacity >
                </View>
                <View>
                    <MaterialCommunityIcons name='help-box' size={35} style={{ color: 'black' }} />
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>Actions.help({ type: ActionConst.PUSH })}>
                        <Text>Help</Text>
                    </TouchableOpacity >
                </View>
            </View>
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
}