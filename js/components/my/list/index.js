import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Tab from '../../../controls/tab'


export default class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: this.props.tabs
        };
    }
    componentWillReceiveProps(nextProps, nextState){
        this.setState({ tabs: nextProps.tabs})
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Tab tabs={[{key:'new', title:'NEW(5)', selected:true}, {key:'inprogress', title:'IN PROGRESS(3)'}, {key:'completed', title:'COMPLETED(1)'}]}/>
            </View>
        );
    }
}

const styles = {
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#f6f7ed',
        justifyContent: 'space-around',
        height: 30
    },
    buttonContainer: {
        flex: 1,
        margin: 2,
        backgroundColor: '#e2e2d9',
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    selectedUnderline: {
        height: 5,
        width: '100%',
        backgroundColor: '#292c30'
    }
};