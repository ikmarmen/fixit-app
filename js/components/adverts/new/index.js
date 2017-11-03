import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { TextInput, ScrollView, View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react';
import Swiper from 'react-native-swiper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingLabelInput from '../../../controls/floatingLabelInput';
import FixitModal from '../../../controls/modal';

@observer
export default class NewAdvert extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }
  render() {
    return (<ScrollView style={styles.scroll}>
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
          <FloatingLabelInput
            label={"Title"}
            value={this.store.title}
            onChangeText={(text) => this.store.setProp(text, 'title')} />

          <FloatingLabelInput
            multiline={true}
            numberOfLines={3}
            label={"Description"}
            value={this.store.description}
            onChangeText={(text) => this.store.setProp(text, 'description')} />

          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity style={styles.btnContainer} activeOpacity={0.5} onPress={this.store.postAdvert} disabled={(!this.store.isValid)}>
              <Text style={styles.btnText}>Post</Text>
            </TouchableOpacity >
            <TouchableOpacity activeOpacity={0.5} onPress={Actions.pop}>
              <Text>Cancel</Text>
            </TouchableOpacity >
          </View>
        </View>
      </View>
      <FixitModal isVisible={this.store.isUploading} bodyStyle={{ width: 150, height: 150, backgroundColor: 'transparent', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#fff' />
        <Text style={{ backgroundColor: 'transparent', color: 'white', alignItems: 'center' }}>Posting...</Text>
      </FixitModal>
    </ScrollView>);
  }
}

const styles = {
  scroll: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
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
    paddingTop: 0,
    paddingBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  viewContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  bottomButtonsContainer: {
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
}