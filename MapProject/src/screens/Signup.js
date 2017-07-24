import React, {Component} from 'react';
import {
    View, TextInput, StyleSheet
} from 'react-native';
import {Card, Button, FormInput, FormLabel} from 'react-native-elements';

export default class Signup extends React.Component {
    render() {
        return (
            <View style={{paddingVertical: 20}}>
                <Card>
                    <FormLabel>Name</FormLabel>
                    <FormInput placeholder="Name..."/>
                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder="Email address..."/>
                    <FormLabel>Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Password..."/>

                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="#03A9F4"
                        title="SIGN UP"/>
                </Card>
            </View>
        );
    }
}