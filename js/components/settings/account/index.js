import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingLabelInput from '../../../controls/floatingLabelInput';
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
                    <View style={{ height: 180 }}>
                        <FloatingLabelInput
                            label={"Name"}
                            value={this.store.authStore.user.name}
                            onChangeText={(text) => this.store.authStore.setProp(text, 'name')} />
                        <FloatingLabelInput
                            label={"Email"}
                            value={this.store.authStore.user.email}
                            onChangeText={(text) => this.store.authStore.setProp(text, 'email')} />
                        <FloatingLabelInput
                            label={"Phone"}
                            value={this.store.authStore.user.phone}
                            onChangeText={(text) => this.store.authStore.setProp(text, 'phone')} />
                    </View>
                    <View style={styles.LoginButtoncContainer}>
                        <TouchableOpacity style={styles.btnContainer} activeOpacity={0.5} onPress={this.store.authStore.update}>
                            <Text style={styles.btnText}>Save</Text>
                        </TouchableOpacity >
                        <TouchableOpacity activeOpacity={0.5} onPress={this.store.open}>
                            <Text>Change Password</Text>
                        </TouchableOpacity >
                    </View>
                </View>
            </View>


            <FixitModal isVisible={this.store.isModalVisible} bodyStyle={{ width: 280, height: 250 }}>
                <View style={styles.modalInputContainer}>
                    <FloatingLabelInput
                        label={"Old Password"}
                        password={true}
                        value={this.store.oldPassword}
                        onChangeText={(text) => this.store.onValueChange(text, 'oldPassword')} />
                    <FloatingLabelInput
                        label={"New Password"}
                        password={true}
                        value={this.store.newPassword}
                        onChangeText={(text) => this.store.onValueChange(text, 'newPassword')} />
                    <FloatingLabelInput
                        label={"Confirm New Password"}
                        password={true}
                        value={this.store.confirmNewPassword}
                        onChangeText={(text) => this.store.onValueChange(text, 'confirmNewPassword')} />
                </View>
                <Text style={styles.validation}>{this.store.Validate}</Text>



                <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.modalButtonAdd} activeOpacity={0.5} onPress={this.store.changePassword} disabled={!!this.store.Validate}>
                        <Text >Change</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.modalButtonAdd} activeOpacity={0.5} onPress={this.store.close}>
                        <Text>Close</Text>
                    </TouchableOpacity >
                </View>
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
        width: '100%',
        padding: 10,
    },
    LoginButtoncContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    btnContainer: {
        width: '60%',
        height: 40,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: '#e5e642',
        justifyContent: 'center',
        marginBottom: 10,
    },
    btnText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '800',
    },
    modalInputContainer: {
        height: 170,
        padding: 10,
    },
    validation: {
        color: 'red',
        marginLeft: 10,
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