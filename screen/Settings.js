import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ route, navigation }) {
  const { items, totalPrice } = route.params || {};
  const [discountCode, setDiscountCode] = useState('');
  const [finalPrice, setFinalPrice] = useState(totalPrice);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    setFinalPrice(totalPrice);
  }, [totalPrice]);

  const goToPayment = async () => {
    const pointsToAdd = items ? items.length : 0;
    let discountedPrice = finalPrice;

    if (discountCode === 'DISCOUNT1') {
      discountedPrice -= 10;
    } else if (discountCode === 'DISCOUNT4') {
      discountedPrice -= 40;
    } else if (discountCode === 'DISCOUNT5') {
      discountedPrice -= 50;
    } else if (discountCode === 'DISCOUNT6') {
      discountedPrice -= 60;
    } else if (discountCode === 'DISCOUNT10PERCENT') {
      discountedPrice *= 0.9;
    }

    discountedPrice = Math.max(discountedPrice, 0);

    try {
      const currentPoints = await AsyncStorage.getItem('points');
      const updatedPoints = (currentPoints ? parseInt(currentPoints) : 0) + pointsToAdd;
      await AsyncStorage.setItem('points', updatedPoints.toString());

      const redeemedItem = {
        title: `ส่วนลด ${discountCode}`,
        id: discountCode,
        requiredPoints: pointsToAdd,
      };
      const existingItems = JSON.parse(await AsyncStorage.getItem('redeemedItems')) || [];
      existingItems.push(redeemedItem);
      await AsyncStorage.setItem('redeemedItems', JSON.stringify(existingItems));

      Alert.alert(
        'สำเร็จ',
        `เพิ่ม ${pointsToAdd} คะแนน. คะแนนสะสมรวม: ${updatedPoints}\nราคาหลังส่วนลด: ${discountedPrice.toFixed(2)} บาท`,
        [{ text: 'OK', onPress: () => navigation.navigate('PaymentScreen', { totalPrice: discountedPrice, deliveryOption: selectedOption }) }]
      );
    } catch (error) {
      console.error('Failed to save points or redeemed item:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถบันทึกคะแนนหรือส่วนลดได้');
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>ราคา: {item.totalPrice} บาท</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>รวมทั้งหมด: {totalPrice} บาท</Text>
        
        <TextInput
          style={styles.discountInput}
          placeholder="ใส่รหัสส่วนลด"
          value={discountCode}
          onChangeText={setDiscountCode}
        />
        <TouchableOpacity 
          onPress={() => navigation.navigate('RedeemedItemsScreen')} 
          style={styles.redeemButton} 
        >
          <Text style={styles.redeemButtonText}>ดูโค้ดส่วนลด</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setModalVisible(true)} 
          style={styles.optionButton}
        >
          <Text style={styles.optionButtonText}>{selectedOption || 'เลือกวิธีการจัดส่ง'}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>เลือกวิธีการจัดส่ง</Text>
              <TouchableOpacity onPress={() => handleOptionSelect('ทานที่ร้าน')} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>ทานที่ร้าน</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOptionSelect('รับที่ร้าน')} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>รับที่ร้าน</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOptionSelect('จัดส่งปลายทาง')} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>จัดส่งปลายทาง</Text>
              </TouchableOpacity>
              <Button title="ปิด" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
        
        <TouchableOpacity 
          onPress={goToPayment} 
          style={styles.paymentButton} 
        >
          <Text style={styles.paymentButtonText}>ชำระเงิน</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#666',
  },
  totalContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  discountInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#333',
    fontSize: 16,
  },
  paymentButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#333',
  },
  redeemButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  redeemButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
