import { getFirbaseApp } from "../firebaseHelper";
import {
    getAuth,
    createUserWithEmailAndPassword,
    singInWithEmailAndPassword
} from "firebase/auth";

import { child,getDatabase ,set,ref} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate } from "../../store/authSlice";


export const signUp =(fullName ,email,password) =>{
    return async (dispatch)=>{
        const app =getFirbaseApp();
        const auth =getAuth(app);

        try{
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(result);

            const { uid,ststTokenManager} = result.user
            const { accessToken, expirationTime} =ststTokenManager;
            const expiryDate =new Date(expirationTime);

            const userDate =await createUser(fullName,email,uid)

            dispatch(authenticate({ tokens:accessToken,userDate}));
            
            
            saveToDataStorage(accessToken,uid,expiryDate);


        }catch(error){
            console.log(error);

            const errorCode =error.code;
            let message ="Something went wrong"

            if(errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found"){
                message = "Wrong email or password"
            }

            throw new Error(message);

        }
    }
}

const createUser =async ( fullName,email,userId)=>{
    const userDate ={
        fullName,
        email,
        userId,
        signUpDate: new Date().toISOString(),
    }

    const dbRef = ref(getDatabase());
    const childRef = child(dbRef,`users/${userId}`)
    await set(childRef, userDate);
    return userDate;
}

const saveToDataStorage = (token,userId,expiryDate)=>{
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token,
            userId,
            expiryDate:expiryDate.toISOString(),
        }),
    )
}