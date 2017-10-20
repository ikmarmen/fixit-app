import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions, ActionConst } from 'react-native-router-flux';

export default class Help extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Help</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={Actions.pop} >
                    <MaterialCommunityIcons name='close' size={25} style={{ color: '#fff' }} />
                </TouchableOpacity >
            </View>
            <View style={styles.viewContainer}>
                <Text>Lorem Ipsum</Text>
                <Text>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</Text>
                <Text>"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
                <Text>Integer sed imperdiet magna. Sed efficitur nulla at purus semper, vitae convallis velit ultricies.</Text>
                <Text>Vivamus commodo diam tempus, porttitor arcu vitae, blandit lorem. </Text>
                <Text>Cras consequat erat in erat cursus, imperdiet commodo felis tincidunt.Morbi at volutpat mi, id maximus nulla. </Text>
                <Text>Cras eu fermentum ipsum. Praesent ut interdum dui. </Text>
                <Text>Nulla ac nisi eget tortor rhoncus finibus non id leo.</Text>
                <Text>Nam id nisi in dolor aliquam accumsan. Donec vestibulum lacus at massa aliquet pellentesque at laoreet enim.</Text>
                <Text>Mauris tellus sapien, suscipit nec magna sit amet, pellentesque sollicitudin sapien. Duis auctor vestibulum massa, ornare aliquam dui pretium at. </Text>
                <Text> Sed a laoreet nisl. Quisque at molestie orci. Maecenas hendrerit tellus ut tincidunt sollicitudin. Etiam eros orci, dictum ac pharetra vitae, consequat semper orci. </Text>
                <Text>Vestibulum libero lorem, aliquam sagittis pellentesque vitae, porttitor luctus lorem. Nam dolor justo, porta sit amet semper dictum, mollis vehicula mi. </Text>
                <Text>Sed interdum tellus nec egestas faucibus. Quisque sed viverra enim.</Text>               
            </View>
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
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        padding: 20,
    },
}