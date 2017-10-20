import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthStore } from '../auth/authStore';

//import SettingsStore from './store';

@observer
export default class SettingsMain extends Component {
    constructor(props) {
        super(props);
        //this.store = SettingsStore;
    }
    logout=()=>{
        AuthStore.logout(); 
        //Actions.pop();
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

                <TouchableOpacity activeOpacity={0.5} onPress={()=>Actions.account({ type: ActionConst.PUSH })}  style={styles.listContainer}>
                    <MaterialCommunityIcons name='account' size={35} style={styles.icon} />
                    <Text>Account Information</Text>
                </TouchableOpacity >
                <TouchableOpacity activeOpacity={0.5} onPress={()=>Actions.settings({ type: ActionConst.PUSH })} style={styles.listContainer}>
                    <MaterialCommunityIcons name='settings' size={35} style={styles.icon} />
                    <Text>Settings</Text>
                </TouchableOpacity >

                <TouchableOpacity activeOpacity={0.5} onPress={()=>Actions.about({ type: ActionConst.PUSH })} style={styles.listContainer}>
                    <MaterialCommunityIcons name='information' size={35} style={styles.icon} />
                    <Text>About</Text>
                </TouchableOpacity >

                <TouchableOpacity activeOpacity={0.5} onPress={()=>Actions.help({ type: ActionConst.PUSH })} style={styles.listContainer}>
                    <MaterialCommunityIcons name='help-box' size={35} style={styles.icon} />
                    <Text>Help</Text>
                </TouchableOpacity >

                <TouchableOpacity  style={styles.listContainer} activeOpacity={0.5} onPress={()=>this.logout()}  >
                    <MaterialCommunityIcons name='logout' size={35} style={styles.icon} />
                    <Text>Logout</Text>
                </TouchableOpacity >

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
        padding: 10,
    },
   listContainer: {
       flexDirection: 'row',
       width: '100%',
       padding: 5,
       alignItems: 'center',
       borderBottomWidth: 1,
       borderBottomColor: '#eee',
   },
   icon: {
        color: '#46c6e9', 
        marginRight: 10,
   },
}