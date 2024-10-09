import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Monu({ route }) {
  const { items, totalPrice } = route.params || { items: [], totalPrice: 0 };
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const existingOrders = await AsyncStorage.getItem('orderHistory');
        if (existingOrders) {
          setOrderHistory(JSON.parse(existingOrders));
        }
      } catch (error) {
        console.error('Failed to fetch order history:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleDeleteItem = async (index) => {
    Alert.alert(
      'ลบรายการ',
      'คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ลบ',
          onPress: async () => {
            try {
              const updatedOrders = [...orderHistory];
              updatedOrders.splice(index, 1); 
              await AsyncStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
              setOrderHistory(updatedOrders);
            } catch (error) {
              console.error('Failed to delete order:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteAll = async () => {
    Alert.alert(
      'ลบทั้งหมด',
      'คุณแน่ใจหรือไม่ว่าต้องการลบประวัติทั้งหมด?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ลบทั้งหมด',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('orderHistory');
              setOrderHistory([]);
            } catch (error) {
              console.error('Failed to delete all orders:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>
        รายการ: {item.items && Array.isArray(item.items) ? item.items.map(i => i.title).join(', ') : 'ไม่มีข้อมูล'}
      </Text>
      <Text style={styles.details}>ราคา: {item.totalPrice} บาท</Text>
      <Text style={styles.details}>วันที่: {item.date}</Text>
      <Text style={styles.details}>เวลา: {item.time}</Text>

      {item.deliveryInfo && (
        <>
          <Text style={styles.deliveryHeader}>ข้อมูลการจัดส่ง:</Text>
          <Text style={styles.details}>ชื่อผู้รับ: {item.deliveryInfo.recipientName}</Text>
          <Text style={styles.details}>ที่อยู่: {item.deliveryInfo.address}</Text>
          <Text style={styles.details}>เบอร์โทร: {item.deliveryInfo.phoneNumber}</Text>
        </>
      )}

      {item.discount && (
        <Text style={styles.details}>ส่วนลด: {item.discount} บาท</Text>
      )}

      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(index)}
      >
        <Text style={styles.deleteButtonText}>ลบรายการ</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>รายการสั่งซื้อ</Text>
      <FlatList
        data={orderHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>ไม่มีรายการ</Text>}
      />
      <Text style={styles.totalText}>รวมทั้งหมด: {totalPrice} บาท</Text>
      <TouchableOpacity 
        style={styles.deleteAllButton}
        onPress={handleDeleteAll}
      >
        <Text style={styles.deleteAllButtonText}>ลบทั้งหมด</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
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
  deliveryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteAllButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  deleteAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
