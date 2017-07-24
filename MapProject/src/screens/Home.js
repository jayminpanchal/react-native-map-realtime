import React, {Component} from 'react';
import {Card, Button, Text} from 'react-native-elements';
import deepstream from 'deepstream.io-client-js';
import {WS_URL} from "../constant";
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

export default class Home extends React.Component {
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

    componentDidMount() {
        /*this.ds = deepstream(WS_URL);
        this.ds.on('error', (err) => {
            alert(err);
        });
        this._initialize();*/
    }

    _initialize() {
        // here we create the record if it doesn't exist, or get the record if it
        //exists.
        this.record = this.ds.record.getRecord('user/' + this.username);
        // the whenReady() method, ensures the record is fully loaded before
        // continuing, and takes a callback.
        this.record.whenReady(this._onRecordCheckComplete.bind(this));
    }

    _onRecordCheckComplete(record) {
        // the set() method allows us to now set data.
        this.record.set('username', this.username);
        this.callback(true);
        navigator.geolocation.watchPosition();
    }

    onPositionUpdate(position) {
        this.pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        this.record.set('position', this.pos);
        //creates the list that contains our latitude and longitude
        this.list = ds.record.getList('users_within_radius/' + this.pos.lat + '/' + this.pos.lng + '/' + 1 + '/' + this.username)
        this.list.subscribe(this._onGetEntries.bind(this));
        //setCenter is a method called to find the center for the map,
        //that was created with google maps api
        this.map.setCenter(this.pos);
        this.circle.setCenter(this.pos);

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
        ...StyleSheet.absoluteFillObject
    },
});