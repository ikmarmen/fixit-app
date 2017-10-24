import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, Slider, CheckBox, TextInput, ScrollView, Modal } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Config from '../../../../config.js';
import { timeSince } from '../../../utils/dateHelper';


@observer
export default class MyAdvert extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  _renderImage = () => {
    let id = this.store.advert.photos[0]._id;
    return (
      <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MY FIXIT</Text>
          <TouchableOpacity activeOpacity={0.5} style={styles.closeBtn} onPress={Actions.pop} >
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
                  <View style={styles.infoItem}>
                    <SimpleLineIcons name='location-pin' style={styles.icon} />
                    <Text style={styles.infoText}>{this.store.advert.distance + 'km'}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name='md-time' style={styles.icon} />
                    <Text style={styles.infoText}>{`${timeSince(this.store.advert.createdAt)} ago`}</Text>
                  </View>
                </View>
              </View>
            </View>
{/* Tab menu */}
          <View style={styles.tabMenu}>
            <TouchableOpacity style={styles.tabMenuItemSelected}>
              <Text style={styles.tabText}>9 QUOTES</Text>
              <Text style={styles.tabNewText}>(2 NEW)</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.tabMenuItem}>
              <Text style={styles.tabText}>15 QUESTIONS</Text>
              <Text style={styles.tabNewText}>(6 NEW)</Text>
            </TouchableOpacity> 
          </View>

{/* Questions Tab */}

          <View style={styles.questions}>
            <View style={styles.questionsList}>
              <View style={styles.questionsListLeft}>
                  <Text style={styles.question}>Are you including the 1 and the area code when texting?</Text>
                  <View style={styles.infoItem}>
                    <Ionicons name='md-time' style={styles.icon} />
                    <Text style={styles.infoText}>45 minutes ago</Text>
                  </View>
              </View>
              <TouchableOpacity style={styles.btnContainer}>
                <Text style={styles.btnText}>ANSWER</Text>
              </TouchableOpacity>
            </View>        
            <View style={styles.questionsList}>
              <View style={styles.questionsListLeft}>
                  <Text style={styles.question}>Is call forwarding activated?</Text>
                  <View style={styles.infoItem}>
                    <Ionicons name='md-time' style={styles.icon} />
                    <Text style={styles.infoText}>3 hours ago</Text>
                  </View>
              </View>
              <TouchableOpacity style={styles.btnContainer}>
                <Text style={styles.btnText}>ANSWER</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.quotes}>
            <View style={styles.quotesList}>
              <View style={styles.quotesListTitle}>
                <View style={styles.quoteName}>
                  <Text style={styles.qouteAuthtor}>Archie Tempel</Text> 
                  <View style={styles.rating}>
                    <MaterialCommunityIcons name='star' style={styles.rate} />
                    <MaterialCommunityIcons name='star' style={styles.rate} />
                    <MaterialCommunityIcons name='star' style={styles.rate} />
                    <MaterialCommunityIcons name='star-outline' style={styles.rate} />
                    <MaterialCommunityIcons name='star-outline' style={styles.rate} />
                  </View>
                </View>
                <Text>2 hours ago</Text> 
              </View> 
              <View style={styles.quotesListContact}>
                  <Feather name='phone' style={styles.contactIcon} />
                  <Text style={styles.contactInfo}>(226) 906-2721</Text> 
                  <SimpleLineIcons name='location-pin' style={styles.contactIcon} />
                  <Text style={styles.contactInfo}>123 6th St. Melbourne, FL 32904</Text> 
              </View> 
              <View style={styles.quotesListTitle}>
                  <View style={styles.quotesMessage}>
                    <Text>$60 for fixing the problem</Text> 
                    <Text>$60, 2-3 days</Text> 
                  </View>
                  <TouchableOpacity style={styles.btnContainer}>
                    <Text style={styles.btnText}>ACCEPT</Text>
                  </TouchableOpacity> 
              </View>           
            </View>
                <View style={styles.quotesList}>
                <View style={styles.quotesListTitle}>
                  <View style={styles.quoteName}>
                    <Text style={styles.qouteAuthtor}>Archie Tempel</Text> 
                    <View style={styles.rating}>
                      <MaterialCommunityIcons name='star' style={styles.rate} />
                      <MaterialCommunityIcons name='star' style={styles.rate} />
                      <MaterialCommunityIcons name='star' style={styles.rate} />
                      <MaterialCommunityIcons name='star-outline' style={styles.rate} />
                      <MaterialCommunityIcons name='star-outline' style={styles.rate} />
                    </View>
                  </View>
                  <Text>2 hours ago</Text> 
                </View> 
                <View style={styles.quotesListContact}>
                    <Feather name='phone' style={styles.contactIcon} />
                    <Text style={styles.contactInfo}>(226) 906-2721</Text> 
                    <SimpleLineIcons name='location-pin' style={styles.contactIcon} />
                    <Text style={styles.contactInfo}>123 6th St. Melbourne, FL 32904</Text> 
                </View> 
                <View style={styles.quotesListTitle}>
                    <View style={styles.quotesMessage}>
                      <Text>I need to see the phone to  understand the problem.</Text> 
                      <Text>$50, 7-10 days</Text> 
                    </View>
                    <TouchableOpacity style={styles.btnContainer}>
                      <Text style={styles.btnText}>ACCEPT</Text>
                    </TouchableOpacity> 
                </View>           
              </View>
          </View> */}

          </View>
        </ScrollView>
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
  quotes: {
    width: '100%',
    backgroundColor: '#eeeeee',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  quotesList: {
    width: '95%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2, 
    paddingTop: 10,
    paddingBottom: 10,
  },
  quoteName: {
    flexDirection: 'row',    
    alignItems: 'center',
  },
  qouteAuthtor: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',    
    alignItems: 'center',
    marginLeft: 10,
  },
  rate: {
    fontSize: 20,
    color: '#46c6e9'
  },
  quotesListTitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  quotesListContact: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 2,
  },
  contactIcon: {
    fontSize: 15,
    marginRight: 2,
    color: '#46c6e9'
  },
  contactInfo: {
    fontSize: 12,
    marginRight: 5,
    color: '#999'
  },
  quotesMessage: {
    width: '70%',
  },
  btnContainer: {
    width: '25%',
    height: 40,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e642',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '800',
  },
  tabMenu: {
    width: '100%',
    flexDirection: 'row',
  },
  tabMenuItemSelected: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    borderBottomColor: '#46c6e9',
    borderBottomWidth: 6,
  },
  tabMenuItem: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 6,
  },
  tabText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tabNewText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4bcbe9',
    marginLeft: 2,
  },
  questions: {
    width: '100%',
    backgroundColor: '#eeeeee',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  questionsList: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2, 
    paddingTop: 10,
    paddingBottom: 10,
  },
  questionsListLeft: {
    width: '70%',
  },
  question: {
    fontSize: 17,
  },
}