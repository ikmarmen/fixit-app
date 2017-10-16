import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, Slider, CheckBox  } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QuoteStore from './store';
import Config from '../../../config.js';

@observer
export default class Quote extends Component {
    constructor(props) {
        super(props);
        this.store = QuoteStore;
    }
    _renderImage = () => {
        let id = this.store.advert.photos[0]._id;
        return (
            <Image resizeMode='stretch' style={{ flex: 1, height: 200, width: 200 }} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
        );
    }
    render() {
        return ( this.store.advert 
            ? <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.closeBtn} onPress={this.store.close} >
                        <MaterialCommunityIcons name='close' size={25} style={{ color: '#777777' }} />
                    </TouchableOpacity >
                </View>
                <View style={styles.viewContainer}>
                {this._renderImage()}
                <Slider maximumValue={50} minimumValue={5}/>
                <CheckBox />
                </View>
            </View>
            : null
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
        backgroundColor: '#f2f2f2',
        height: 46,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        alignItems: 'flex-end',
        padding: 10,
        marginBottom: 20,
    },
    viewContainer: {
        alignItems: 'center',
    },
}