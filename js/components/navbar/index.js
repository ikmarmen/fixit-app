import { View, Image, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';

export default class NavBar extends Component {
    render() {
        return (
            <View style={styles.background}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>{this.props.title}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={{ }}>
                        <Image source={require('../../../img/fb.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ }}>
                        <Image source={require('../../../img/fb.png')} />
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
        justifyContent: 'center',
        right: 20,
        width: 70
    }
};