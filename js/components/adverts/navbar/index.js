import { View, Image, Text, TouchableOpacity, TextInput, Animated, Easing, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FilterStore from '../list/filter/store/'

import AdvertsListStore from '../store'

export default class AdvertsNavBar extends Component {
    constructor(props) {
        super(props);

        let screenWidth = Dimensions.get('window').width;
        this.state = {
            expanded: false,
            animation: new Animated.Value(screenWidth),
            screenWidth: screenWidth
        };
        this.store = AdvertsListStore;
    }

    _toggleSeacrhBar = () => {
        let value = this.state.expanded ? this.state.screenWidth : 0;

        if (this.state.expanded) {
            this.refs.SearchInput.blur();
        }else{
            this.refs.SearchInput
            this.refs.SearchInput.focus();
        }

        this.setState({
            expanded: !this.state.expanded
        });

        Animated.timing(
            this.state.animation,
            {
                duration: 500,
                toValue: value
            }
        ).start();
    }
    _clearText=()=>{
        this.refs.SearchInput.clear();
        this.store.onSearch();
    }
    _search=(e)=>{
       this.store.onSearch(e.nativeEvent.text);
    }
    _filter = () => {
        FilterStore.open();
    }

    render() {
        let { animation } = this.state;
        return (
            <View style={styles.background}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>{this.props.title}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttons} onPress={this._toggleSeacrhBar}>
                        <Icon name='magnify' color={'white'} size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Icon name='filter' color={'white'} size={30} onPress={this._filter}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Icon name='settings' color={'white'} size={30} />
                    </TouchableOpacity>
                </View>
                <Animated.View style={[styles.searchArea, { marginLeft: animation }]}>
                    <TouchableOpacity style={styles.buttons} onPress={this._toggleSeacrhBar}>
                        <Icon name='arrow-left' color={'white'} size={30} />
                    </TouchableOpacity>
                    <TextInput style={styles.search} ref='SearchInput' returnKeyType={'search'} onSubmitEditing={this._search}>
                    </TextInput>
                    <TouchableOpacity style={styles.buttons} onPress={this._clearText}>
                        <Icon name='window-close' color={'white'} size={30} />
                    </TouchableOpacity>
                </Animated.View>
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
        margin: 3,
    },
    searchArea: {
        width: '100%',
        backgroundColor: '#264559',
        position: 'absolute',
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