/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import MapView from 'react-native-maps';
import deepstream from 'deepstream.io-client-js';

export default class MapReceiverProject extends Component {
    constructor(props) {
        super(props);
        this.ds = deepstream('wss://localhost:5250').login({});
        this.ds.on('error', (err) => {
            console.log(err)
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 23.06618,
                        longitude: 72.5317247,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.002,
                    }}>
                </MapView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('MapReceiverProject', () => MapReceiverProject);
