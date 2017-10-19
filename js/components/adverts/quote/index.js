import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, Slider, CheckBox, TextInput, ScrollView, Modal } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SliderMarker from '../../../controls/sliderMarker';
import FixitModal from '../../../controls/modal';
import QuoteStore from './store';
import Config from '../../../../config.js';
import { timeSince } from '../../../utils/dateHelper';

@observer
export default class Quote extends Component {
    constructor(props) {
        super(props);
        this.store = QuoteStore;
    }
    _renderImage = () => {
        let id = this.store.advert.photos[0]._id;
        return (
            <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
        );
    }
    _renderContacts = () => {
        return this.store.contacts.map((item, index) => {
            return (<View style={styles.contact} key={index}>
                <CheckBox value={item.isSelected} onValueChange={(value => this.store.onContactSelectionChange(value, index))} />
                <MaterialCommunityIcons name={item.type == 'phone' ? 'phone' : 'email-outline'} style={styles.icon} />
                <Text style={styles.infoText}>{item.contact}</Text>
            </View>);
        })
    }
    _sliderValuesChange = (values, name) => {
        this.store.onValueChange(values, name);
    }
    render() {
        return (this.store.advert
            ? <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>MY QUOTE</Text>
                    <TouchableOpacity activeOpacity={0.5} style={styles.closeBtn} onPress={this.store.close} >
                        <MaterialCommunityIcons name='close' size={25} style={{ color: '#fff' }} />
                    </TouchableOpacity >
                </View>
                <View style={styles.viewContainer}>
                    <View style={styles.top}>
                        <View style={styles.image}>
                            {this._renderImage()}
                        </View>
                        <View style={styles.topRight}>
                            <Text style={styles.title}>{this.store.advert.title}</Text>
                            <Text style={styles.name}>{this.store.advert.createdBy}</Text>
                            <View style={styles.info}>
                                <Octicons name='location' style={styles.icon} />
                                <Text style={styles.infoText}>{this.store.advert.distance + 'km'}</Text>
                                <Ionicons name='md-time' style={styles.icon} />
                                <Text style={styles.infoText}>{`${timeSince(this.store.advert.createdAt)} ago`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.quoteValues}>
                        <Text style={{ width: '30%' }}>Amount($):</Text>
                        <MultiSlider
                            style={styles.slider}
                            min={10} max={1000}
                            values={this.store.amount.toJS()}
                            onValuesChangeFinish={(values) => this._sliderValuesChange(values, 'amount')}
                            selectedStyle={{ backgroundColor: '#46c6e9' }}
                            containerStyle={{ height: 0 }}
                            customMarker={SliderMarker} />
                    </View>
                    <View style={styles.quoteValues}>
                        <Text style={{ width: '30%' }}>Duration(day):</Text>
                        <MultiSlider
                            style={styles.slider}
                            min={1} max={30}
                            values={this.store.duration.toJS()}
                            onValuesChangeFinish={(values) => this._sliderValuesChange(values, 'duration')}
                            selectedStyle={{ backgroundColor: '#46c6e9' }}
                            containerStyle={{ height: 0 }}
                            customMarker={SliderMarker} />
                    </View>
                    <View style={styles.quoteValues}>
                        <Text>Your Message:</Text>
                    </View>
                    <TextInput
                        style={styles.TextInput}
                        multiline={true}
                        onChangeText={(text) => this._sliderValuesChange(text, 'message')}
                        numberOfLines={2}
                        underlineColorAndroid='#46c6e9'
                        selectionColor="#46c6e9" />
                    <Text style={styles.helperText}>You can write about the method of fixing, materials needed, etc.</Text>
                    <View style={styles.quoteValues}>
                        <Text>You can contact me by...</Text>
                    </View>
                    {this._renderContacts()}
                    <TouchableOpacity style={styles.contactAdd} onPress={() => this.store.openAddContact()}>
                        <Feather name='plus-circle' style={styles.icon} />
                        <Text style={styles.infoText}>Add new</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.btnContainer} activeOpacity={0.5} onPress={() => this.store.onQuote()}>
                        <Text style={styles.btnText}>QUOTE</Text>
                    </TouchableOpacity >
                </View>
                <FixitModal isVisible={this.store.isModalVisible}>
                    <TextInput value={this.store.newContact} onChangeText={this.store.onNewContactValueChange} />
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.store.addContact()}>
                        <Text>Add</Text>
                    </TouchableOpacity >
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.store.closeAddContact()}>
                        <Text>Close</Text>
                    </TouchableOpacity >
                </FixitModal>
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
    top: {
        width: '100%',
        height: '25%',
        backgroundColor: '#eeeeee',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: '48%',
        height: '100%',
    },
    topRight: {
        width: '50%',
    },
    title: {
        fontSize: 16,
        height: '55%',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 5,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        color: '#46c6e9',
        fontSize: 25,
    },
    infoText: {
        marginRight: 7,
        marginLeft: 8,
    },
    description: {
        height: 20,
    },
    quoteValues: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    slider: {

    },
    TextInput: {
        marginTop: 5,
        width: '95%',
        borderColor: '#cccccc',
        borderWidth: 1
    },
    helperText: {
        paddingLeft: 10,
        color: '#cccccc',
        fontStyle: 'italic',
    },
    contact: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactAdd: {
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnContainer: {
        width: '75%',
        height: 50,
        marginTop: 7,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: '#e5e642',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '800',
    }
}