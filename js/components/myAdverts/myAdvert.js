import React, { Component } from 'react';
import { Container, Content, Text, Button, Icon} from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import { observer } from 'mobx-react';

@observer
export default class MyAdvert extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Container>
      <Content>
        <Text>---------------My advert--------</Text>
      </Content>
      <Button transparent onPress={() => Actions.main({ type: ActionConst.RESET })}>
          <Icon name='close' />
        </Button>
    </Container>;
  }
}