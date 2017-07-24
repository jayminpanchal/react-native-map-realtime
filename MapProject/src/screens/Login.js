import React, {Component} from 'react';
import {
    View, TextInput, StyleSheet
} from 'react-native';
import {Card, Button, FormInput, FormLabel} from 'react-native-elements';
import deepstream from 'deepstream.io-client-js';
import {onSignIn} from "../auth";
import {WS_URL} from "../constant";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <View style={{paddingVertical: 20}}>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder="Email address..."
                               onChangeText={(text) => this.setState({email: text})}/>
                    <FormLabel>Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Password..."
                               onChangeText={(text) => this.setState({password: text})}/>

                    <Button onPress={this.login.bind(this)}
                            buttonStyle={{marginTop: 20}}
                            backgroundColor="#03A9F4"
                            title="SIGN IN"/>
                    <Button
                        buttonStyle={{marginTop: 20}}
                        onPress={() => this.props.navigation.navigate('SignUp')}
                        backgroundColor="#00BCD4"
                        title="SIGN UP"/>
                </Card>
            </View>
        );
    }

    login() {
        alert(this.state.email + " " + this.state.password);
        this.ds = deepstream(WS_URL).login({
            email: this.state.email,
            password: this.state.password
        }, (success, data) => {
            if (success) {
                onSignIn(data);
                this.props.navigation.navigate('NavAuthenticated');
            }
            alert(JSON.stringify(data));
        });
        this.ds.on('error', (err) => {
            alert("Login Page" + JSON.stringify(err));
        });
    }
}