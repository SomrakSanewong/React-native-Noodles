import { View, Text, StyleSheet, Touchable, Alert } from 'react-native'
import React, { useCallback, useReducer, useState } from 'react'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { signUp } from '../utils/actions/authActions'



const isTestMode =true; 

const initiaState={
    inputValues:{
        fullName: isTestMode ? "John Smith":"",
        email: isTestMode ? "example@xamp.com":"",
        password: isTestMode ? "*********": "",
    },
    inputValidities:{
        fullName: false,
        email: false,
        password: false,
    },
    formIsValid:false,
}

const Singup = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formState, dispatchFormState]= useReducer(reducer,initiaState);
 const dispatch= useD

    const inputChangedHandler = useCallback((inputId,inputValue )=>{
        const result = validateInput(inputId,inputValue);
        dispatchFormState({inputId,validationResult:result,inputValue});
    },[dispatchFormState])

    const authHandler = async ()=>{
        try{
            setIsLoading(true);
            const action = signUp(
                formState.inputValues.fullName,
                formState.inputValues.email,
                formState.inputValues.password
            );

            await dispatch(action);
            
            Alert.alert("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            setError(null);
            setIsLoading(false);

        }catch{error}{
            console.log(error);
            setIsLoading(false);
            setError(error.message);
        }
    }
  return (
    <View style={{ marginVertical:22}}>
        <Input
            id="fullName"
            placeholder="Name"
            errorText={formState.inputValidities["fullName"]}
            onInputChanged={inputChangedHandler}
            
        />
        <Input
            id="email"
            placeholder="Email Address"
            errorText={formState.inputValidities["email"]}
            onInputChanged={inputChangedHandler}
        />
        <Input
            id="password"
            placeholder="Password"
            errorText={formState.inputValidities["password"]}
            onInputChanged={inputChangedHandler}
        />
        <Button
            title="SINGUP"
            onPress={authHandler}
            isLoading={isLoading}
            buttonColor='black'
            style={{
                width:-32,
                marginVertical:8
            }}
            >Singup</Button>
        <View style={styles.bottomContainer}>
            <Text>
                askdaksdkaskd ?
            </Text>
            <TouchableOpacity
                onPress={()=>navigation.navigate("Login2")}
            >
                <Text>{""} Login</Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}
const styles= StyleSheet.create({
    bottomContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginVertical:2
    }
})


export default Singup