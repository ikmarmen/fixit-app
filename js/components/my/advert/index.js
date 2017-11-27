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
import AnswerModal from './answerModal';
import AcceptModal from './acceptModal';


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

  async componentWillMount() {
    await this.store.loadQuestions();
    await this.store.loadQuotes();
  }

  _onAccepted = (data) => {
    data.userData = this.state.userData;
    this.store.acceptQuote(data);
    this.setState({ acceptModalIsVisible: false, userData: null })
  }
  _onAnswerd = (data) => {
    data.question = this.state.question;
    this.store.answer(data);
    this.setState({ answerModalIsVisible: false, question: null })
  }

  render() {
    const id = this.store.advert.photoIds[0];
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
                    <Text style={styles.infoText}>{`${parseInt(this.store.advert.distance / 1000)} km`}</Text>
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
                <Text style={styles.tabText}>{`${this.store.advert.bidsCount} QUOTES`}</Text>
                <Text style={styles.tabNewText}>(2 NEW)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={this.state.selectedTab == 'QUESTIONS' ? styles.tabMenuItemSelected : styles.tabMenuItem}
                onPress={() => this.setState({ selectedTab: 'QUESTIONS' })}>
                <Text style={styles.tabText}>{`${this.store.advert.questionsCount} QUESTIONS`}</Text>
                <Text style={styles.tabNewText}>(6 NEW)</Text>
              </TouchableOpacity>
            </View>
            {this.state.selectedTab == 'QUESTIONS'
              ? <View style={styles.questions}>
                <Faq
                  questions={this.store.questions}
                  onAnswered={(question) => { this.setState({ answerModalIsVisible: true, question: question }) }} />
              </View>
              : <View style={styles.quotes}>
                <Quote
                  quotes={this.store.quotes}
                  onAccepted={(quote) => this.setState({ acceptModalIsVisible: true, userData: quote })} />
              </View>
            }
          </View>
        </ScrollView>
        <AcceptModal isVisible={this.state.acceptModalIsVisible}
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
      {props.questions
        ? props.questions.map((question) => renderQuestion(question))
        : null}
    </View>
  );
}

const Quote = (props) => {
  const renderQuote = (quote) => {
    return (
      <View style={styles.quotesList} key={quote._id}>
        <View style={styles.quotesListTitle}>
          <View style={styles.quoteName}>
            <Text style={styles.qouteAuthtor}>{quote.createdBy}</Text>
            <View style={styles.rating}>
              <MaterialCommunityIcons name='star' style={styles.rate} />
              <MaterialCommunityIcons name='star' style={styles.rate} />
              <MaterialCommunityIcons name='star' style={styles.rate} />
              <MaterialCommunityIcons name='star-outline' style={styles.rate} />
              <MaterialCommunityIcons name='star-outline' style={styles.rate} />
            </View>
          </View>
          <Text>{`${timeSince(quote.createdAt)} ago`}</Text>
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
      {props.quotes
        ? props.quotes.map((quote) => renderQuote(quote))
        : null}
    </View>
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