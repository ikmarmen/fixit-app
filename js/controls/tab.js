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
                                <Text style={styles.tabText}>{tab.title}</Text>
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
        justifyContent: 'space-around',
        height: 50,
    },
    buttonContainer: {
        flex: 1,
        paddingTop: 10,
        height: 50,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    tabText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
    },
    selectedUnderline: {
        height: 5,
        marginTop: 10,
        width: '100%',
        backgroundColor: '#46c6e9'
    }
};