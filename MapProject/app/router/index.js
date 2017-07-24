import React from "react";
import {Platform, StatusBar} from "react-native";
import {StackNavigator} from "react-navigation";

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const NavNoLogin = StackNavigator({
    SignUp: {
        screen: Signup,
        navigationOptions: {
            title: "Sign Up",
            headerStyle
        }
    },
    SignIn: {
        screen: Login,
        navigationOptions: {
            title: "Sign In",
            headerStyle
        }
    }
});

export const NavAuthenticated = StackNavigator({
    SignUp: {
        screen: Home,
        navigationOptions: {
            title: "Home",
            headerStyle
        }
    }
});