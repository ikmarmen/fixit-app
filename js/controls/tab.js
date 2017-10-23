import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import renderIf from '../utils/renderIf'


export default class Tab extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.tabBarContainer}>
                    {
                        this.props.tabs.map((tab, index) => {
                            return (<TouchableOpacity key={tab.key} activeOpacity={0.5} style={styles.buttonContainer} onPress={() => this.props.onSelect(tab.key)} >
                                <Text>{tab.title}</Text>
                                {renderIf(tab.selected)(<View style={styles.selectedUnderline}></View>)}
                            </TouchableOpacity>);
                        })
                    }
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