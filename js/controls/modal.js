import React from 'react';
import { View,  Modal } from 'react-native';

export default (props) => {
    const bodyStyle =Object.assign({},styles.modalBody, props.bodyStyle); 
    return (<Modal animationType="slide"
        transparent={true}
        visible={props.isVisible}
        onRequestClose={() => { }}
    ><View style={styles.container}>
            <View style={bodyStyle}>
                {props.children}
            </View>
        </View>
    </Modal>
    );
}

const styles = {
    container: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBody: {
        backgroundColor: 'white',
        width: 300,
        height: 300
    }
};