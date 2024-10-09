import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { ProgressViewIOS } from 'react-native'

const Input = () => {
     const onChangeText = (text) =>{
            props.onInputChanged(props.id, text)
     }
  return (
    <View style ={StyleSheet.container}>
      <View
      style={[styles.inputContainer]}>
        <TextInput
            {...props}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            style={styles.input}
            autoCapitalize='none'
            onChangeText={onChangeText}
        />
      </View>
      { 
        props.errorText &&(
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{props.errorText[0]}</Text>
            </View>

        )
      }
    </View>
  )
}
const styles = StyleSheet.create({
    container:{

    },
    inputContainer:{
      width: '100',
      paddingHorizontal: SIZES.padding,
      paddingVertical: SIZES.padding2,
      borderRadius:12,
      borderBottomWidth:1,
      borderBottomColor: 'red',
      marginVertical:16,
      flexDirection:"row"
    },
    input:{
      color :"brack",
      flex :1,
      fontFamily:"regular",
      paddingTop:0,
      fontSize:18
    },
    errorContainer:{
      marginVertical:4
    },
    errorText:{
      color:"red",
      fontSize:12
    }
})

export default Input