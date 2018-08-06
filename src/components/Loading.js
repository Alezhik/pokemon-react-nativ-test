import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default () => (
    <View style={[styles.containerLoader, styles.horizontalLoader]}>
        <ActivityIndicator size="large" color="#00ff00" />
    </View>
);

const styles = StyleSheet.create({
    containerLoader: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontalLoader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})
