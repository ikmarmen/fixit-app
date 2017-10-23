import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, Slider, CheckBox, TextInput, ScrollView, Modal } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

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
                <ScrollView>
                    <View style={styles.viewContainer}>
                        <View style={styles.top}>
                            <View style={styles.image}>
                                {this._renderImage()}
                            </View>
                            <View style={styles.topRight}>
                                <Text style={styles.title}>{this.store.advert.title}</Text>
                                <Text style={styles.name}>{this.store.advert.createdBy}</Text>
                                <View style={styles.info}>
                                    <SimpleLineIcons name='location-pin' style={styles.icon} />
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
                                trackStyle={{height: 3 }}
                                markerContainerStyle={{ height: 55, width: 55 }}
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
                                trackStyle={{height: 3 }}
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
                </ScrollView>

                <FixitModal isVisible={this.store.isModalVisible}>
                    
                <View style={styles.addContactInput} >
                    <FloatLabelTextInput  placeholder={"New Contact"}/>
                </View>

                <View style={styles.modalButtons}>
                    <TouchableOpacity  style={styles.modalButtonAdd} activeOpacity={0.5} onPress={() => this.store.addContact()}>
                        <Text>Add</Text>
                    </TouchableOpacity >
                    <TouchableOpacity   style={styles.modalButtonClose}  activeOpacity={0.5} onPress={() => this.store.closeAddContact()}>
                        <Text>Close</Text>
                    </TouchableOpacity >
                </View>


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
    },
    top: {
        width: '100%',
        height: 180,
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
    quoteValues: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginRight: 10,
        paddingTop: 20,
        paddingRight: 40
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
        marginBottom: 7,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: '#e5e642',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '800',
    },
    addContactInput: {
        height: 80,
        padding: 10,
    },
    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    modalButtonAdd: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
    modalButtonClose: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
}