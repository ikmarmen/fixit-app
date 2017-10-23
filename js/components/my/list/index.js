import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import Card from './card'
import Tab from '../../../controls/tab'
import MyAdvertFilterConst from '../../../constants/myAdvertFilterConst';

@observer
export default class My extends Component {
    constructor(props) {
        super(props);
        this.store = props.store;
    }
    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const adverts = ds.cloneWithRows(this.store.visibleAdverts);
        return (
            <View style={{ flex: 1 }}>
                <Tab tabs={this.store.tabs} onSelect={(tabKey) => { this.store.selectTab(tabKey) }} />
                <View style={{ flex: 1 }}>
                    <ListView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.store.isRefreshing}
                                onRefresh={this.store.onRefresh}
                            />
                        }
                        enableEmptySections={true}
                        onEndReachedThreshold={300}
                        onEndReached={this.store.onScrolePositionChange}
                        dataSource={adverts}
                        renderRow={(rowData) => <Card advert={rowData} />}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
};