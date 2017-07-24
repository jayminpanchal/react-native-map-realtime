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
        this.ds = deepstream('wss://035.deepstreamhub.com?apiKey=bfdc6fe2-4be7-415b-9eaa-80c59f062186').login({});
        this.ds.on('error', (err) => {
            console.log(err)
        });
        this.state = {
            value: '{"lat": 23.06618,"lng": 72.5317247}',
            eventsReceived: [],
            latlng: {
                latitude: 23.06618,
                longitude: 72.5317247
            }
        };
        this.event = this.props.event;

        this.ds.event.subscribe('event-data', data => {
            let latitude = JSON.parse(data).lat;
            let longitude = JSON.parse(data).lng;
            let newLatLng = {
                latitude: latitude,
                longitude: longitude,
            };
            this.setState({value: data});
            this.setState({latlng: newLatLng});
            this.setState({eventsReceived: [...this.state.eventsReceived, newLatLng]});
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
                    {/*{this.state.eventsReceived.map((row, val) => (
                        <MapView.Marker
                            key={val}
                            coordinate={{
                                latitude: JSON.parse(row).lat,
                                longitude: JSON.parse(row).lng,
                            }}/>
                    ))}*/}
                    <MapView.Polyline
                        strokeWidth={2}
                        strokeColor="#000"
                        coordinates={this.state.eventsReceived}/>
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
