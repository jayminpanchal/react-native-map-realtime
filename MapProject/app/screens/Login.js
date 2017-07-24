import React, {Component} from 'react';
import {
    View, TextInput, StyleSheet
} from 'react-native';
import {Card, Button, FormInput, FormLabel} from 'react-native-elements';

export default class Login extends React.Component {
    render() {
        return (
            <View style={{paddingVertical: 20}}>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder="Email address..."/>
                    <FormLabel>Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Password..."/>

                    <Button
                        buttonStyle={{marginTop: 20}}
                        backgroundColor="#03A9F4"
                        title="SIGN IN"/>
                </Card>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        padding: 20
    },
    form_control: {
        height: 40
    }
});