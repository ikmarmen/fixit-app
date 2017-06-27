import React, { Component } from 'react';
import { Image } from 'react-native';
import { observer } from 'mobx-react';
import { Container, Content, Button, Text, Body, Title, Toast, Icon, View } from 'native-base';
import Swiper from 'react-native-swiper'
import { Actions, ActionConst } from 'react-native-router-flux';
import Config from '../../../config.js';

const styles = {
  image: {
    flex: 1
  }
}

@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  _checkErrors = () => {
    return this.store.error
      ? Toast.show({
        supportedOrientations: ['portrait', 'landscape'],
        text: this.store.error,
        position: 'center',
        duration: 3000,
        buttonText: 'Ok'
      })
      : null;
  }
  _renderCloseBtn = (id) => {
    return (
      <Image key={id} resizeMode='stretch' style={styles.image} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
    );
  }

  render() {
    const photo = this.store.mainPhoto;
    return <Container>
      <Content>
        <View>
          <Swiper height={250}>
            {this.store.advert.photos.map((photo) => {
              return this._renderCloseBtn(photo._id);
            })}
          </Swiper>
          <Button transparent style={{ position: 'absolute' }}>
            <Icon name='close' onPress={() => Actions.pop()} />
          </Button>
        </View>
        <Body>
          <Text>{this.store.advert.title}</Text>
          <Text note style={{textAlign  :'center' }}>{this.store.advert.description}</Text>
        </Body>
        {this._checkErrors()}
      </Content>
    </Container>;
  }
}