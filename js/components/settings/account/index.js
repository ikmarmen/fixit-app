import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Item, Input, Label, Icon } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import AccountStore from './store';
import FixitModal from '../../../controls/modal';

@observer
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.store = AccountStore;
    }

    render() {
        return (<View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={Actions.pop}>
                    <MaterialCommunityIcons name='close' size={25} style={{ color: '#fff' }} />
                </TouchableOpacity >
            </View>
            <View style={styles.viewContainer}>
                <View style={styles.inputContainer}>
                    <View style={{ height: 140 }}>
                        <FloatLabelTextInput placeholder={"Name"}
                            value={this.store.authStore.user.name}
                            onChangeTextValue={(text) => this.store.authStore.setProp(text, 'name')} />
                        <FloatLabelTextInput placeholder={"Email"}
                            value={this.store.authStore.user.email}
                            onChangeTextValue={(text) => this.store.authStore.setProp(text, 'email')} />
                        <FloatLabelTextInput placeholder={"Phone"}
                            value={this.store.authStore.user.phone}
                            onChangeTextValue={(text) => this.store.authStore.setProp(text, 'phone')} />
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.store.authStore.update}>
                        <Text>Save</Text>
                    </TouchableOpacity >
                    <TouchableOpacity activeOpacity={0.5} onPress={this.store.open}>
                        <Text>Change Password</Text>
                    </TouchableOpacity >
                </View>
            </View>
            <FixitModal isVisible={this.store.isModalVisible} bodyStyle={{ width: 250, height: 250 }}>
                <View style={{ height: 140 }}>
                    <FloatLabelTextInput placeholder={"Old Password"}
                        secureTextEntry={true}
                        value={this.store.oldPassword}
                        onChangeTextValue={(value) => this.store.onValueChange(value, 'oldPassword')} />
                    <FloatLabelTextInput placeholder={"New Password"}
                        secureTextEntry={true}
                        value={this.store.newPassword}
                        onChangeTextValue={(value) => this.store.onValueChange(value, 'newPassword')} />
                    <FloatLabelTextInput placeholder={"Confirm New Password"}
                        secureTextEntry={true}
                        value={this.store.confirmNewPassword}
                        onChangeTextValue={(value) => this.store.onValueChange(value, 'confirmNewPassword')} />
                </View>
                <Text style={{ color: 'red' }}>{this.store.Validate}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={this.store.changePassword} disabled={!!this.store.Validate}>
                    <Text>Change</Text>
                </TouchableOpacity >
                <TouchableOpacity activeOpacity={0.5} onPress={this.store.close}>
                    <Text>Close</Text>
                </TouchableOpacity >
            </FixitModal>
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
    input: {
        height: 50,
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 12,
    },
    inputText: {
        fontSize: 18,
    },
    inputContainer: {
        width: '75%',
        height: 140,
        marginTop: '12%',
    }
}