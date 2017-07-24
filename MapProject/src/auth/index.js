import {AsyncStorage} from "react-native";

export const USER_KEY = "user-auth";
export const onSignIn = (data) => {
    console.log("IN auth" + JSON.stringify(data));
    AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
};

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};
export const getUser = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
            .then(data => {
                resolve(data);
            })
            .catch(err => reject(err));
    });
};