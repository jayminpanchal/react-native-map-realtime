import React from "react";
import {Platform, StatusBar} from "react-native";
import {StackNavigator} from "react-navigation";

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

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
            title: "Home",
            headerStyle
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