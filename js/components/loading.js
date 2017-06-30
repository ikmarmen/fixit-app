import React, { Component } from 'react';
import { Container, Content, Spinner } from 'native-base';
import {AuthStore} from './auth/authStore';

export default class Loading extends Component {
  componentDidMount() {
    AuthStore.canStart = true;
  }

  render() {
    return <Container>
      <Spinner />
    </Container>;
  }
}