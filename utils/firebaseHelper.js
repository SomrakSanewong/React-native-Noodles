import { getApp, getApps, initializeApp } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"

let firebaseApp;

export const getFirbaseApp =() =>{
    if(firebaseApp){
        return firebaseApp
    }
    //Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDJ6eA7T-fM1Q1sQcYt5-hmnFrvUQppk78",
      authDomain: "datalogin-cd101.firebaseapp.com",
      projectId: "datalogin-cd101",
      storageBucket: "datalogin-cd101.appspot.com",
      messagingSenderId: "194091460918",
      appId: "1:194091460918:web:cdf89959f04367ed3f6b97",
      measurementId: "G-D9VX4HK4CR"
    };

    const app =getApps().length === 0 ? initializeApp(firebaseConfig): getApp();
action
    // Intailize Firebase Auth with React Native  persistence
    initializeAuth(app,{
        persistence:getReactNativePersistence(ReactNativeAsyncStorage)
    })
uesrDspatch
    firebaseApp = app;
Dispatch
    return app;
}
