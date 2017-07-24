import React from "react";
import {Platform, StatusBar} from "react-native";
import {StackNavigator} from "react-navigation";

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';

export const NavNotAuthenticated = StackNavigator({
    SignIn: {
        screen: Login,
        navigationOptions: {
            title: "Sign In"
        }
    },
    SignUp: {
        screen: Signup,
        navigationOptions: {
            title: "Sign Up"
        }
    }
});

export const NavAuthenticated = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: "Home"
        }
    }
});

export const createRootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            NavAuthenticated: {
                screen: NavAuthenticated,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            NavNotAuthenticated: {
                screen: NavNotAuthenticated,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        },
        {
            headerMode: "none",
            mode: "card",
            initialRouteName: signedIn ? "NavAuthenticated" : "NavNotAuthenticated"
        }
    );
};