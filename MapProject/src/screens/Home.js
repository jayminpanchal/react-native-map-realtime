import React, {Component} from 'react';
import {Card, Button, Text} from 'react-native-elements';
import deepstream from 'deepstream.io-client-js';
import {WS_URL} from "../constant";
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {getUser} from '../auth';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            circleCenter: {
                latitude: 37.78825,
                longitude: -122.4324
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.region}>
                    <MapView.Circle
                        radius={1000}
                        fillColor="rgba(0,188,212,0.5)"
                        strokeColor="#00bcd4"
                        center={this.state.circleCenter}/>
                </MapView>
            </View>
        );
    }

    componentDidMount() {
        getUser().then(data => {
            this.userId = JSON.parse(data).id;
            this.startConnection();
        });
    }

    startConnection() {
        console.log("Home user Id:" + this.userId);
        this.ds = deepstream(WS_URL);
        this.ds.on('error', (err, event, topic) => {
            console.log("Error ws");
            console.log(err);
            console.log(event);
            console.log(topic);
        });
        this._initialize();
    }

    _initialize() {
        console.log("initialized");
        // here we create the record if it doesn't exist, or get the record if it
        //exists.
        this.record = this.ds.record.getRecord('user/' + this.userId);
        // the whenReady() method, ensures the record is fully loaded before
        // continuing, and takes a callback.
        this.record.whenReady(this._onRecordCheckComplete.bind(this));
    }

    _onRecordCheckComplete(record) {
        console.log("record check completed");
        // the set() method allows us to now set data.
        this.record.set('username', this.userId);
        this.callback(true);
        alert("on record check");
        navigator.geolocation.watchPosition(this.onPositionUpdate.bind(this));
    }

    onPositionUpdate(position) {
        console.log("Position updated");
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

        let region = this.state.region;
        region.latitude = position.coords.latitude;
        region.longitude = position.coords.longitude;
        region.latitudeDelta = 0.0922;
        region.longitudeDelta = 0.0421;

        let circleCenter = this.state.circleCenter;
        circleCenter.latitude = position.coords.latitude;
        circleCenter.longitude = position.coords.longitude;

        this.setState({region: region});
        this.setState({circleCenter: circleCenter});

        console.log(JSON.stringify(this.state.region));

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