import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const Splash = ({ navigation }) => {
    const onPress = () => {
        navigation.navigate('Login4')
    }
    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={require('../img/1.jpg')} style={styles.image}></Image>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>กดเพื่อเข้าสู่ระบบ</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    imageContainer: {
        flex: 0.95,
        justifyContent: 'center',
    },
    image: {
        width: 400,
        height: 400,
        borderRadius: 10, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3, 
        shadowRadius: 4.65,
        elevation: 8, 
    },
    textContainer: {
        flex: 0.10,
    },
    text: {
        fontSize: 30,
        color: "red",
    },
})

export default Splash
