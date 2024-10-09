import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import qrCodeImage from '../img/8.jpg'; 

const { width } = Dimensions.get('window'); 

export default function PaymentScreen({ route }) {
  const { totalPrice, items, selectedOption, discountCode } = route.params || {};
  const navigation = useNavigation();
  const [paymentSlip, setPaymentSlip] = useState(null);

  const selectPaymentSlip = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('ยกเลิก', 'การเลือกภาพถูกยกเลิก');
      } else if (response.errorCode) {
        Alert.alert('ข้อผิดพลาด', `เกิดข้อผิดพลาด: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        setPaymentSlip(response.assets[0].uri);
      }
    });
  };

  const handleConfirmPayment = async () => {
    if (paymentSlip) {
      try {
        const existingOrders = await AsyncStorage.getItem('orderHistory');
        const orders = existingOrders ? JSON.parse(existingOrders) : [];

        const newOrder = {
          items,
          totalPrice,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          selectedOption, 
          discountCode, 
        };

        orders.push(newOrder);
        await AsyncStorage.setItem('orderHistory', JSON.stringify(orders));

        navigation.navigate('monu');
      } catch (error) {
        console.error('Failed to save order history:', error);
        Alert.alert('ข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลการสั่งซื้อได้');
      }
    } else {
      Alert.alert('ข้อผิดพลาด', 'กรุณาแนบสลิปการชำระเงิน');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.navigationContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={30} color="gray" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>ชำระเงินโดยการสแกน QR Code</Text>
        
        {!paymentSlip && (
          <Image source={qrCodeImage} style={styles.qrCodeImage} />
        )}
        
        <Text style={styles.totalText}>รวมทั้งหมด: {totalPrice} บาท</Text>

        <TouchableOpacity style={styles.selectSlipButton} onPress={selectPaymentSlip}>
          <Text style={styles.selectSlipButtonText}>แนบสลิปโอนเงิน</Text>
        </TouchableOpacity>

        {paymentSlip && (
          <Image source={{ uri: paymentSlip }} style={styles.paymentSlipImage} />
        )}

        <TouchableOpacity 
          style={[styles.confirmButton, !paymentSlip && styles.disabledButton]} 
          onPress={handleConfirmPayment}
          disabled={!paymentSlip}
        >
          <Text style={styles.confirmButtonText}>ยืนยันการชำระเงิน</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 40,
    left: 0,
  },
  backButton: {
    opacity: 0.7,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 70,
  },
  qrCodeImage: {
    width: width * 0.8, 
    height: width * 0.8, 
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectSlipButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  selectSlipButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  paymentSlipImage: {
    width: width * 0.9, 
    height: 400, 
    resizeMode: 'contain',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10, 
  },
  confirmButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});
