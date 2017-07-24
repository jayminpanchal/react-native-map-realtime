import React, {Component} from 'react';
import {Card, Button, Text} from 'react-native-elements';

export default class Home extends React.Component {
    render() {
        return (
            <View style={{paddingVertical: 20}}>
                <Card>
                    <Text style={{marginBottom: 10}}>
                        Welcome TO Map App
                    </Text>
                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="#00bcd4"
                        title="LOG OUT"/>
                </Card>
            </View>
        );
    }
}