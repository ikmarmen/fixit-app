import React, { Component } from 'react';
import { Image } from 'react-native';
import FetchBlob from '../../utils/fetch-blob';
import { Content, Spinner } from 'native-base';

export default class FixItCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgId: this.props.imgId,
      isLoaded: false,
      base64Img: null
    };
  }

  componentWillMount() {
    FetchBlob(`posts/photo/${this.state.imgId}`, { method: 'GET' })
      .then(response => {
        this.setState({ isLoaded: true, base64Img: `data:image/jpeg;base64,${response.data}` });
      })
      .catch(error => {
        console.warn(error.message);
      });
  }

  render() {
    if (this.state.isLoaded) {
      return <Image source={{ uri: this.state.base64Img }} style={{ height: 200, width: null, flex: 1 }} />;
    } else {
      return <Spinner style={{ height: 200, width: null, flex: 1 }} />;
    }
  }
}
