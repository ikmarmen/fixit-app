import { View, Image, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class AdvertsNavBar extends Component {
    render() {
        return (
            <View style={styles.background}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>{this.props.title}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttons}>
                        <Icon name='magnify' color={'white'} size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Icon name='filter' color={'white'} size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Icon name='settings' color={'white'} size={30}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}
const styles = {
    background: {
        flexDirection: 'row',
        backgroundColor: '#264559',
        justifyContent: 'space-between',
    },
    labelContainer: {
        justifyContent: 'center',
        height: 50
    },
    label: {
        marginLeft: 15,
        color: 'white'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        right: 15,
        width: 120
    },
    buttons: {
        margin:3,
    }
};