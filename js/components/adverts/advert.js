import React, { Component } from 'react';
import { Image } from 'react-native';
import { observer } from 'mobx-react';
import { Container, Content, Button, Text, Body, Title, Toast, Icon, View, H1 } from 'native-base';
import Swiper from 'react-native-swiper'
import { Actions, ActionConst } from 'react-native-router-flux';
import Config from '../../../config.js';
import Comments from './advertComments';

const styles = {
  image: {
    flex: 1
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 2,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderColor: '#c9c9c9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    marginLeft: 15,
  },
}

@observer
export default class Advert extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }
  
  _renderImages = (id) => {
    return (
      <Image key={id} resizeMode='stretch' style={styles.image} source={{ uri: `${Config.BASE_URL}posts/photo/${id}` }} />
    );
  }

  render() {
    return <Container>
      <Content>
        <View>
          <Swiper height={250}>
            {this.store.advert.photos.map((photo) => {
              return this._renderImages(photo._id);
            })}
          </Swiper>
        </View>
        <View style={styles.rowViewContainer} />
        <Body>
          <Text>{this.store.advert.title}</Text>
          <Text note style={{ textAlign: 'center' }}>{this.store.advert.description}</Text>
        </Body>
        <View style={styles.rowViewContainer} />
        <Comments store={this.store} />
      </Content>
      <Button transparent style={{ position: 'absolute' }} onPress={() => Actions.pop()}>
        <Icon name='close' />
      </Button>
    </Container>;
  }
}