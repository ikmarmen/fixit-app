import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
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


                <View style={styles.searchArea}>
                    <TouchableOpacity style={styles.buttons}>
                        <Icon name='arrow-left' color={'white'} size={30}/>
                    </TouchableOpacity>
                    <TextInput  style={styles.search}>
                    </TextInput>
                    <TouchableOpacity style={styles.buttons}>
                        <Icon name='window-close' color={'white'} size={30}/>
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
    },
    searchArea: {
        backgroundColor: '#264559',
        position: 'absolute',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,

    },
    search: {
        width: '80%',
        height: 40,
        backgroundColor: '#1a303e',
        color: '#ffffff',
        fontSize: 18,
    }

};