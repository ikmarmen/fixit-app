import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, Slider, CheckBox, TextInput } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QuoteStore from './store';
import Config from '../../../config.js';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

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
                                <Text style={styles.title}>My dishwasher drains under my sink and water flows all over my floor. do i need a plumber?</Text>
                                <Text style={styles.name}>Serita Collington</Text>
                                <View style={styles.info}>              
                                    <Octicons name='location' style={styles.icon} />
                                    <Text style={styles.infoText}>21km</Text>
                                    <Ionicons name='md-time' style={styles.icon} />
                                    <Text style={styles.infoText}>20min ago</Text>
                                </View>
                            </View>
                        </View>
                        
                   



                    <View style={styles.quoteValues}>
                        <Text>Amount:</Text>
                        <Slider  style={styles.slider} maximumValue={50} minimumValue={5} />
                    </View>
                    <View style={styles.quoteValues}>
                        <Text>Duration:</Text>
                        <Slider  style={styles.slider} maximumValue={50} minimumValue={5} />
                    </View>
                    <View style={styles.quoteValues}>
                        <Text>Your Message:</Text>
                    </View>
                    <TextInput style={styles.TextInput}  />
                    <Text  style={styles.helperText}>You can write about the method of fixing, materials needed, etc.</Text>
                    
                    <View style={styles.quoteValues}>
                        <Text>You can contact me by...</Text>
                    </View>
                    <View style={styles.contact}>
                        <CheckBox />
                        <MaterialCommunityIcons name='email-outline' style={styles.icon} />
                        <Text style={styles.infoText}>stephan.henkel@gmail.com</Text>
                    </View>
                    <View style={styles.contact}>
                        <CheckBox />
                        <Feather name='phone' style={styles.icon} />
                        <Text style={styles.infoText}>(226) 906-2721</Text>
                    </View>
                    <TouchableOpacity  style={styles.contactAdd}>
                        <Feather name='plus-circle' style={styles.icon} />
                        <Text style={styles.infoText}>Add new</Text>
                    </TouchableOpacity >
                    

                    <TouchableOpacity   style={styles.btnContainer} activeOpacity={0.5} >         
                        <Text style={styles.btnText}>QUOTE</Text>                    
                    </TouchableOpacity >

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
        width: '40%',
        height: '100%',
    },
    topRight: {
        width: '45%',
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
        marginTop: 20,
    },
    slider: {
        width: '75%',
    },
    TextInput: {
        marginTop: 5,
        width: '95%',
        height: '10%',
        borderColor: '#cccccc',
        borderWidth: 1,
    },
    helperText: {
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
        marginTop: 10,
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