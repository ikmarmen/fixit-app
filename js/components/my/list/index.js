import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { Actions, ActionConst } from 'react-native-router-flux';
import Card from './card'
import Tab from '../../../controls/tab'

@observer
export default class My extends Component {
    constructor(props) {
        super(props);
        this.store = props.store;
    }
    get Tabs() {
        return [{ key: 'new', title: 'NEW(5)', selected: true }, { key: 'inprogress', title: 'IN PROGRESS(3)' }, { key: 'completed', title: 'COMPLETED(1)' }];
    }

    onRefrash = () => {
        this.setState({ refreshing: !this.state.refreshing });
    }
    onEndReached = () => {
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const adverts = ds.cloneWithRows(this.store.adverts.toJS());
        return (
            <View style={{ flex: 1 }}>
                <Tab tabs={this.Tabs} />
                {this.store.adverts.length > 0 ? <View style={{ flex: 1 }}>
                    <ListView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.store.isRefreshing}
                                onRefresh={this.store.onRefresh}
                            />
                        }
                        onEndReachedThreshold={300}
                        onEndReached={this.store.onScrolePositionChange}
                        dataSource={adverts}
                        renderRow={(rowData) => <Card advert={rowData} />}
                    />
                </View>
                    : <Text>No data</Text>}
            </View>
        );
    }
}

const styles = {
};