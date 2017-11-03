import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { timeSince } from '../../../utils/dateHelper';
import FixitModal from '../../../controls/modal';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import Config from '../../../../config.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class AcceptModel extends Component {
    constructor(props) {
        super(props);
    }

    _renderImage = () => {
        let id = this.props.advertDate.photos[0]._id;
        return (
            <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
        );
    }

    render() {
        return (
            <FixitModal isVisible={this.props.isVisible} bodyStyle={{ width: 280, height: 320 }}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>ACCEPTING QUOTE</Text>
                </View>
                <View style={styles.top}>
                    <View style={styles.image}>
                        {this._renderImage()}
                    </View>
                    <View style={styles.topRight}>
                        <Text style={styles.title}>{this.props.advertDate.title}</Text>
                        <Text style={styles.name}>{this.props.advertDate.createdBy}</Text>
                        <View style={styles.info}>
                            <View style={styles.infoItem}>
                                <Ionicons name='md-time' style={styles.icon} />
                                <Text style={styles.infoText}>{`${timeSince(this.props.advertDate.createdAt)} ago`}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.addContactInput} >
                    <FloatLabelTextInput placeholder={"Your Message"} />
                </View>

                <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.modalButtonAdd} activeOpacity={0.5} onPress={() => this.props.onAccepted({})}>
                        <Text>Send</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.modalButtonClose} activeOpacity={0.5} onPress={() => this.props.onClose()}>
                        <Text>Close</Text>
                    </TouchableOpacity >
                </View>

            </FixitModal>
        );

    }
}
const styles = {
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
    top: {
        width: '100%',
        height: 130,
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
        justifyContent: 'space-between',
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
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#46c6e9',
        fontSize: 25,
    },
    infoText: {
        marginRight: 7,
        marginLeft: 8,
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