import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const firebaseConfig = {
    apiKey: "AIzaSyASBpMD4Jt5gA8TBjVHAR4q1Z_0mdz6OtY",
    authDomain: "fir-auth-30181.firebaseapp.com",
    projectId: "fir-auth-30181",
    storageBucket: "fir-auth-30181.appspot.com",
    messagingSenderId: "5178374650",
    appId: "1:5178374650:web:7d97d27fb94841dffe0c43",
    measurementId: "G-HNGT7DH5PZ"
  };

const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, name, setName, phone, setPhone, isLogin, setIsLogin, handleAuthentication, navigation }) => {
    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}>{isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</Text>
            {!isLogin && (
                <>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="ชื่อเต็ม"
                    />
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="เบอร์โทรศัพท์"
                        keyboardType="phone-pad"
                    />
                </>
            )}
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            {!isLogin && (
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry
                />
            )}
            <View style={styles.buttonContainer}>
                <Button title={isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'} onPress={handleAuthentication} buttonStyle={styles.buttonStyle} />
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'ไปยังหน้าสมัครสมาชิก' : 'ไปยังหน้าเข้าสู่ระบบ'}
                </Text>
            </View>
        </View>
    );
};

const AuthenticatedScreen = ({ user, handleAuthentication, name, phone, address, setAddress, navigation }) => {
    const [isAddressConfirmed, setIsAddressConfirmed] = useState(false); 
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const handleAddressConfirmation = () => {
        if (address.trim() !== '') {
            setIsAddressConfirmed(true);
            setIsEditingAddress(false);
            console.log('Address confirmed:', address);
        } else {
            Alert.alert('Error', 'Please enter an address.');
        }
    };

    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}>ยินดีต้อนรับ</Text>
            <Text style={styles.emailText}>อีเมล: {user.email}</Text>
            {name ? <Text style={styles.infoText}>ชื่อ: {name}</Text> : null}
            {phone ? <Text style={styles.infoText}>เบอร์โทรศัพท์: {phone}</Text> : null}
            
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="ที่อยู่"
                multiline={true}
                numberOfLines={3}
                editable={!isAddressConfirmed || isEditingAddress}
            />

            {isAddressConfirmed && !isEditingAddress ? (
                <Button 
                    title="แก้ไขที่อยู่" 
                    onPress={() => setIsEditingAddress(true)} 
                    buttonStyle={styles.editButtonStyle} 
                />
            ) : (
                <Button 
                    title="ยืนยันที่อยู่" 
                    onPress={handleAddressConfirmation} 
                    buttonStyle={styles.confirmButtonStyle} 
                />
            )}

            <Button 
                title="ออกจากระบบ" 
                onPress={handleAuthentication} 
                buttonStyle={styles.logoutButtonStyle} 
            />
            <View style={styles.buttonNext}>
                <Button title="ไปหน้าถัดไป" onPress={() => navigation.navigate('MainContainer')} buttonStyle={styles.buttonStyle} />
            </View>
        </View>
    );
};

const Login4 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState(''); 
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const auth = getAuth(app);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleAuthentication = async () => {
        try {
            if (user) {
                console.log('User logged out');
                await signOut(auth);
                setUser(null); 
                setName(''); 
                setPhone(''); 
                setAddress(''); 
            } else {
                if (isLogin) {
                    await signInWithEmailAndPassword(auth, email, password);
                    console.log('User signed in');
                    
                    if (email === "admin@example.com" && password === "Non123") {
                        navigation.navigate('AdminDashboard'); 
                    } else {
                        navigation.navigate('MainContainer'); 
                    }
                } else {
                    if (password === confirmPassword) {
                        await createUserWithEmailAndPassword(auth, email, password);
                        console.log('User created');
                        navigation.navigate('MainContainer');
                    } else {
                        Alert.alert('Error', 'Passwords do not match');
                    }
                }
            }
        } catch (error) {
            console.error('Authentication Error:', error.code, error.message);
            Alert.alert('Authentication Error', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../img/1.jpg')}
                    style={styles.logo}
                />
                <Text style={styles.logoText}>ก๋วยเตี๋ยวรัตนา</Text>
            </View>
            {user ? (
                <AuthenticatedScreen 
                    user={user} 
                    handleAuthentication={handleAuthentication} 
                    name={name}
                    phone={phone}
                    address={address} 
                    setAddress={setAddress} 
                    navigation={navigation} 
                />
            ) : (
                <AuthScreen
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    handleAuthentication={handleAuthentication}
                    navigation={navigation}
                />
            )}
        </ScrollView>
    );
};

export default Login4;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#e0f7fa',
    },
    authContainer: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginTop: 10,
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
        textAlign: 'center',
        color: '#00796b'
    },
    input: {
        height: 45,
        borderColor: '#b0bec5',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#eceff1',
    },
    buttonContainer: {
        marginBottom: 20,
    },
    buttonNext: {
        marginBottom: 20,
        marginTop: 10,
    },
    toggleText: {
        color: '#0288d1',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    buttonStyle: {
        backgroundColor: '#00796b',
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonStyle: {
        backgroundColor: '#d32f2f',
        padding: 10,
        borderRadius: 5,
    },
    confirmButtonStyle: {
        backgroundColor: '#388e3c',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    editButtonStyle: {
        backgroundColor: '#1976d2',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    logoText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00796b',
        textAlign: 'center',
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#455a64',
    },
    emailText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#00796b',
        fontWeight: 'bold',
    },
});
