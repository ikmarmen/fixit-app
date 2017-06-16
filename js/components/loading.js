import React, { Component } from 'react';
import { Container, Content, Spinner } from 'native-base';

export default class Loading extends Component {
  render() {
    return <Container>
        <Spinner />
    </Container>;
  }
}