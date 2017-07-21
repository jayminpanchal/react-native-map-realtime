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
import deepstream from 'deepstream.io-client-js';

export default class MapProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            value: null
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
            </View>
        );
    }

    componentDidMount() {
        this.ds = deepstream('wss://localhost:5250').login({});
        this.ds.on('error', (err) => {
            console.log(err);
        });
        this.setLatLng();
    }

    setLatLng() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                let location = {
                    lat: this.state.latitude,
                    lng: this.state.longitude
                };
                this.ds.event.emit('event-data', JSON.stringify(location));
                //this.sendLatLng();
            },
            (error) => this.setState({error: error.message}),
            {timeout: 20000, maximumAge: 1000},
        );
        window.setTimeout(() => {
            this.setLatLng();
        }, 5000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('MapProject', () => MapProject);
