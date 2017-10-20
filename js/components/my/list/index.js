import React, { Component } from 'react';
import { View, ListView, RefreshControl,  Text, TouchableOpacity } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Tab from '../../../controls/tab'


export default class My extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            refreshing: false,
            dataSource: ds.cloneWithRows([{ key: 'new', title: 'NEW(5)', selected: true }, { key: 'inprogress', title: 'IN PROGRESS(3)' }, { key: 'completed', title: 'COMPLETED(1)' }]),
        }
    }
    get Tabs() {
        return [{ key: 'new', title: 'NEW(5)', selected: true }, { key: 'inprogress', title: 'IN PROGRESS(3)' }, { key: 'completed', title: 'COMPLETED(1)' }];
    }

    onRefrash=()=>{
        this.setState({refreshing:!this.state.refreshing});
    }
    onEndReached=()=>{
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Tab tabs={this.Tabs} />
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefrash}
                        />
                    }
                    onEndReachedThreshold={300}
                    onEndReached={()=> null}
                    dataSource={ this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData.title}</Text>}
                />
            </View>
        );
    }
}

const styles = {
};