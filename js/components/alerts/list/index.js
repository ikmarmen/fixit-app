import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import AlertCard from './card'

@observer
export default class AlertsList extends Component {
    constructor(props) {
        super(props);
        this.store = props.store;
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const alerts = ds.cloneWithRows(this.store.alerts.toJS());
        return (
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
                    dataSource={alerts}
                    renderRow={(rowData) => <AlertCard alert={rowData} />}
                />
            </View>
        );
    }
}

const styles = {
};