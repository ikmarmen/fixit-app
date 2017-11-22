import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, Slider, CheckBox, TextInput, ScrollView, Modal } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import FloatingLabelInput from '../../../controls/floatingLabelInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Config from '../../../../config.js';
import { timeSince } from '../../../utils/dateHelper';
import FixitModal from '../../../controls/modal';


@observer
export default class MyAdvert extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {
      selectedTab: 'QUOTES',
      acceptModalIsVisible: false,
      answerModalIsVisible: false,

    }
  }

  _onAccepted = (data) => {
    this.store.acceptQuote(data);
    this.setState({ acceptModalIsVisible: false, userData: null })
  }
  _onAnswerd = (data) => {
    this.store.answer(data);
    this.setState({ answerModalIsVisible: false, question: null })
  }

  render() {
    const id = this.store.advert.photos[0]._id;
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
                <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
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
              <TouchableOpacity
                style={this.state.selectedTab == 'QUOTES' ? styles.tabMenuItemSelected : styles.tabMenuItem}
                onPress={() => this.setState({ selectedTab: 'QUOTES' })}>
                <Text style={styles.tabText}>{`${this.store.advert.bids.length} QUOTES`}</Text>
                <Text style={styles.tabNewText}>(2 NEW)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={this.state.selectedTab == 'QUESTIONS' ? styles.tabMenuItemSelected : styles.tabMenuItem}
                onPress={() => this.setState({ selectedTab: 'QUESTIONS' })}>
                <Text style={styles.tabText}>{`${this.store.advert.questions.length} QUESTIONS`}</Text>
                <Text style={styles.tabNewText}>(6 NEW)</Text>
              </TouchableOpacity>
            </View>
            {this.state.selectedTab == 'QUESTIONS'
              ? <View style={styles.questions}>
                <Faq questions={this.store.advert.questions} onAnswered={(question) => this.setState({ answerModalIsVisible: true, question: question })} />
              </View>
              : <View style={styles.quotes}>
                <Quote quotes={this.store.advert.bids} onAccepted={(quote) => this.setState({ acceptModalIsVisible: true, userData: quote })} />
              </View>
            }
          </View>
        </ScrollView>
        <AcceptModel isVisible={this.state.acceptModalIsVisible}
          advertDate={this.store.advert}
          userData={this.state.userData}
          onClose={() => this.setState({ acceptModalIsVisible: false, userData: null })}
          onAccepted={(data) => this._onAccepted(data)}
        />
        <AnswerModal isVisible={this.state.answerModalIsVisible}
          question={this.state.question}
          onClose={() => this.setState({ answerModalIsVisible: false, question: null })}
          onAnswerd={(data) => this._onAnswerd(data)}
        />
      </View>
    );

  }
}

const Faq = (props) => {
  const renderQuestion = (question) => {
    return (
      <View style={styles.questionsList} key={question._id}>
        <View style={styles.questionsListLeft}>
          <Text style={styles.question}>{`Q: ${question.body}`}</Text>
          {
            question.answer != null
              ? <Text style={styles.question}>{`A: ${question.answer.body}`}</Text>
              : null
          }
          <View style={styles.infoItem}>
            <Ionicons name='md-time' style={styles.icon} />
            <Text style={styles.infoText}>{`${timeSince(question.createdAt)} ago`}</Text>
          </View>
        </View>
        {
          question.answer == null
            ? <TouchableOpacity style={styles.btnContainer} onPress={() => props.onAnswered(question)}>
              <Text style={styles.btnText}>ANSWER</Text>
            </TouchableOpacity>
            : null
        }
      </View>
    );
  }

  return (
    <View>
      {props.questions.map((question) => renderQuestion(question))}
    </View>
  );
}

const Quote = (props) => {
  const renderQuote = (quote) => {
    return (
      <View style={styles.quotesList} key={quote._id}>
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
          <Text>2{`${timeSince(quote.createdAt)} ago`}</Text>
        </View>
        <View style={styles.quotesListTitle}>
          <View style={styles.quotesMessage}>
            <Text>{quote.message}</Text>
            <Text>{`$${quote.amount[0]}-${quote.amount[1]}, ${quote.duration[0]}-${quote.duration[1]} days`}</Text>
          </View>
          <TouchableOpacity style={styles.btnContainer}
            onPress={() => props.onAccepted(quote)}>
            <Text style={styles.btnText}>ACCEPT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View>
      {props.quotes.map((quote) => renderQuote(quote))}
    </View>
  );
}

class AnswerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: null,
      isPublic: false
    }
  }

  _onAnswer = () => {
    this.props.onAnswerd(this.state);
  }

  _onChange = (value, name) => {
    let state = Object.assign({}, this.state);
    state[name] = value
    this.setState(state);
  }

  render() {
    return (
      <FixitModal isVisible={this.props.isVisible} bodyStyle={{ width: 280, height: 280 }}>
        <View style={modalStyles.header}>
          <Text style={modalStyles.headerTitle}>ANSWER</Text>
        </View>
        <View style={modalStyles.container}>
          <Text>Can you fix this in a week?</Text>
          <View style={modalStyles.addContactInput} >
            <View>
              <Text>Your Message:</Text>
            </View>
            <TextInput
              onChangeText={(text) => this._onChange(text, 'answer')}
              style={modalStyles.TextInput}
              multiline={true}
              numberOfLines={2}
              underlineColorAndroid='#46c6e9'
              selectionColor="#46c6e9" />
          </View>
          <View style={modalStyles.publicCheck}>
            <Text>Is public</Text>
            <CheckBox  onValueChange={(value) => this._onChange(value, 'isPublic')} />
          </View>
        </View>
        <View style={modalStyles.modalButtons}>
          <TouchableOpacity style={modalStyles.modalButtonAdd} activeOpacity={0.5} onPress={this._onAnswer}>
            <Text>Answer</Text>
          </TouchableOpacity >
          <TouchableOpacity style={modalStyles.modalButtonClose} activeOpacity={0.5} onPress={() => this.props.onClose()}>
            <Text>Close</Text>
          </TouchableOpacity >
        </View>
      </FixitModal>);
  }
}

const AcceptModel = (props) => {
  const id = props.advertDate.photos[0]._id;
  return (
    <FixitModal isVisible={props.isVisible} bodyStyle={{ width: 320, height: 460 }}>
      <View style={modalStyles.header}>
        <Text style={modalStyles.headerTitle}>ACCEPTING QUOTE</Text>
      </View>
      <View style={modalStyles.top}>
        <View style={modalStyles.image}>
          <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
        </View>
        <View style={modalStyles.topRight}>
          <Text style={modalStyles.title}>{props.advertDate.title}</Text>
          <Text style={modalStyles.name}>{props.advertDate.createdBy}</Text>
          <View style={modalStyles.info}>
            <View style={modalStyles.infoItem}>
              <Ionicons name='md-time' style={modalStyles.icon} />
              <Text style={modalStyles.infoText}>{`${timeSince(props.advertDate.createdAt)} ago`}</Text>
            </View>
          </View>
        </View>
      </View>





      <View style={modalStyles.acceptQuote}>

        <View style={modalStyles.quoteValues}>
          <Text>Your Message:</Text>
        </View>
        <TextInput
          style={modalStyles.TextInput}
          multiline={true}
          numberOfLines={2}
          underlineColorAndroid='#46c6e9'
          selectionColor="#46c6e9" />
        <View style={modalStyles.quoteValues}>
          <Text>You can contact me by...</Text>
        </View>
        <View style={modalStyles.contact}>
          <CheckBox />
          <MaterialCommunityIcons name='phone' style={styles.icon} />
          <Text style={modalStyles.infoText}>stephan.henkel@gmail.com</Text>
        </View>
        <TouchableOpacity style={modalStyles.contactAdd}>
          <Feather name='plus-circle' style={styles.icon} />
          <Text style={modalStyles.infoText}>Add new</Text>
        </TouchableOpacity >

      </View>



      <View style={modalStyles.modalButtons}>
        <TouchableOpacity style={modalStyles.modalButtonAdd} activeOpacity={0.5} onPress={() => props.onAccepted({})}>
          <Text>Send</Text>
        </TouchableOpacity >
        <TouchableOpacity style={modalStyles.modalButtonClose} activeOpacity={0.5} onPress={() => props.onClose()}>
          <Text>Close</Text>
        </TouchableOpacity >
      </View>
    </FixitModal>
  );
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

const modalStyles = {
  header: {
    flexDirection: 'row',
    backgroundColor: '#264559',
    height: 46,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
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
    height: '40%',
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
    paddingTop: 10,
    paddingBottom: 10,
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
  },
  acceptQuote: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  quoteValues: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  publicCheck: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
}