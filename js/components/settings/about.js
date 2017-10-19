import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions, ActionConst } from 'react-native-router-flux';

export default class About extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>About</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={Actions.pop} >
                    <MaterialCommunityIcons name='close' size={25} style={{ color: '#fff' }} />
                </TouchableOpacity >
            </View>
            <View style={styles.viewContainer}>
                <Text>
                    Lorem Ipsum
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam leo tortor, egestas vitae justo id, eleifend ornare dolor. Nam luctus neque ut purus hendrerit vulputate. Sed sodales sodales laoreet. In sit amet arcu nec magna posuere ultrices laoreet in velit. Nunc eleifend ullamcorper elementum. In at velit ut tellus egestas efficitur sed eu justo. Sed euismod molestie orci ut posuere. Fusce condimentum, tortor nec varius feugiat, nunc enim dictum lacus, et consequat nibh dolor et dui. Maecenas vestibulum lectus sit amet mi venenatis elementum. Sed quis dapibus diam, eu aliquam arcu. In scelerisque enim eu magna semper gravida. Vestibulum euismod tincidunt lorem. Pellentesque id bibendum sapien. Duis a magna nec nunc tincidunt ultricies eu in nibh. Integer pellentesque eros a tempor sagittis.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus ante tellus, ac viverra massa posuere eget. Etiam semper nisl sed ipsum dictum congue. Fusce sed fringilla arcu, sed pellentesque enim. Fusce ornare quis neque id fringilla. Aliquam nec velit ut nisi suscipit dapibus et id mi. Proin leo neque, efficitur ut est sed, consequat pretium eros. Ut sagittis, elit non feugiat feugiat, felis lorem suscipit nisi, ut feugiat metus ligula vel mi. Donec quis erat blandit, sagittis nisl vitae, aliquam dui. Donec fringilla interdum magna sed convallis. Donec consectetur mi nec rhoncus malesuada. Proin in sapien sed felis volutpat accumsan. Etiam porttitor velit id sapien rutrum, nec rutrum mauris viverra. Sed ut nisi nec tellus posuere condimentum eget at lectus.

Proin in felis quis augue hendrerit auctor sit amet in velit. Donec posuere luctus turpis sit amet laoreet. Nunc iaculis nisl et blandit maximus. Curabitur nec mi non velit vulputate tincidunt. Suspendisse potenti. Aenean convallis erat nec erat iaculis, ac vehicula ligula iaculis. Curabitur efficitur erat id fringilla dapibus. Quisque in massa vitae nibh aliquet sodales. Sed arcu mauris, posuere nec aliquam vel, rutrum nec eros. Praesent ut porta libero. Cras ac diam vel ante semper rhoncus. Suspendisse nec imperdiet erat. Mauris scelerisque risus id aliquam consectetur. Phasellus eu magna lorem.

Integer sed imperdiet magna. Sed efficitur nulla at purus semper, vitae convallis velit ultricies. Vivamus commodo diam tempus, porttitor arcu vitae, blandit lorem. Cras consequat erat in erat cursus, imperdiet commodo felis tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a dui tortor. In condimentum magna vel dolor hendrerit pulvinar. Ut cursus nisi et sollicitudin aliquam. Nunc pretium sagittis auctor. Duis ex leo, fermentum vel lorem id, pulvinar rhoncus velit. Integer bibendum est a tortor eleifend, id congue mauris rutrum. Nunc eget enim at nibh volutpat porta.

Morbi at volutpat mi, id maximus nulla. Cras eu fermentum ipsum. Praesent ut interdum dui. Nulla ac nisi eget tortor rhoncus finibus non id leo. Nam id nisi in dolor aliquam accumsan. Donec vestibulum lacus at massa aliquet pellentesque at laoreet enim. Mauris tellus sapien, suscipit nec magna sit amet, pellentesque sollicitudin sapien. Duis auctor vestibulum massa, ornare aliquam dui pretium at. Sed a laoreet nisl. Quisque at molestie orci. Maecenas hendrerit tellus ut tincidunt sollicitudin. Etiam eros orci, dictum ac pharetra vitae, consequat semper orci. Vestibulum libero lorem, aliquam sagittis pellentesque vitae, porttitor luctus lorem. Nam dolor justo, porta sit amet semper dictum, mollis vehicula mi. Sed interdum tellus nec egestas faucibus. Quisque sed viverra enim.
                </Text>
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
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
}