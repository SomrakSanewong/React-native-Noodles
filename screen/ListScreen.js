import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ListScreen({ route, navigation }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (route.params?.newItem) {
      setList(prevList => [...prevList, route.params.newItem]);
    }
  }, [route.params?.newItem]);

  const handleDeleteItem = (id) => {
    Alert.alert(
      'ยืนยันการลบ',
      'คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ลบ',
          onPress: () => {
            setList(prevList => prevList.filter(item => item.id !== id));
            Alert.alert('ลบสำเร็จ', 'รายการถูกลบออกจากรายการแล้ว.');
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const getTotalPrice = () => {
    return list.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleOrder = () => {
    if (list.length > 0) {
      navigation.navigate('Settings', { items: list, totalPrice: getTotalPrice() });
    }
  };

  const handleAddMore = () => {
    navigation.navigate('Home');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.title}</Text>
        {item.details && <Text style={styles.details2}>รายละเอียด: {item.details}</Text>}
        {item.level && <Text style={styles.details}>ระดับ: {item.level}</Text>}
        {item.additions && <Text style={styles.details}>เพิ่มเติม: {item.additions.join(', ')}</Text>}
        <Text style={styles.details}>ราคา: {item.totalPrice} บาท</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>รวมทั้งหมด: {getTotalPrice()} บาท</Text>
        <TouchableOpacity 
          onPress={handleOrder} 
          style={[styles.orderButton, list.length === 0 && styles.disabledButton]} 
          disabled={list.length === 0}
        >
          <Text style={styles.orderButtonText}>สั่งซื้อ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddMore} style={styles.addMoreButton}>
          <Text style={styles.addMoreButtonText}>สั่งเพิ่ม</Text>
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
  details2: {
    fontSize: 16,
    color: 'red',
  },
  deleteButton: {
    marginLeft: 10,
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
  orderButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#cccccc', 
  },
  addMoreButton: {
    backgroundColor: '#03DAC6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  addMoreButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
