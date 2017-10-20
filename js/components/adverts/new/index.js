import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { TextInput, ScrollView, View, TouchableOpacity, Text, Image, ActivityIndicator  } from 'react-native';
import { observer } from 'mobx-react';
import Swiper from 'react-native-swiper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import FixitModal from '../../../controls/modal';

@observer
export default class MyAdvertsExplore extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }
  render() {
    return (<ScrollView>
      <View>
        <View height={250} width='100%' >
          <Swiper>
            {this.store.photos.map((photo, index) => {
              return <Image key={index} resizeMode='cover' style={styles.image} source={{ uri: photo.path }} />
            })}
          </Swiper>
        </View>
        <View style={styles.rowViewContainer} />
        <View style={styles.viewContainer}>
          <FloatLabelTextInput placeholder={"Title"}
            value={this.store.title}
            onChangeTextValue={(text) => this.store.setProp(text, 'title')} />
          <FloatLabelTextInput placeholder={"Description"}
            multiline={true}
            numberOfLines={3}
            value={this.store.description}
            onChangeTextValue={(text) => this.store.setProp(text, 'description')} />
          <TouchableOpacity activeOpacity={0.5} onPress={this.store.postAdvert} disabled={(!this.store.isValid)}>
            <Text>Post</Text>
          </TouchableOpacity >
          <TouchableOpacity activeOpacity={0.5} onPress={Actions.pop}>
            <Text>Cancel </Text>
          </TouchableOpacity >
        </View>
      </View>
      <FixitModal isVisible={this.store.isUploading} bodyStyle={{ width: 150, height: 150, backgroundColor:'transparent' }}>
        <ActivityIndicator size='large'/>
        <Text style={{backgroundColor:'transparent', color:'white', alignItems: 'center'}}>Posting...</Text>
      </FixitModal>
    </ScrollView>);
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
  image: {
    flex: 1
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 2,
    paddingBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
}