import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const DetailScreen2 = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const prices = {
    'น้ำเปล่า': 10,
    'น้ำอัดลม': 15,
    'น้ำหวาน': 15,
    'น้ำอัดลมใหญ่': 30,
  };

  const [quantity, setQuantity] = useState(1);
  const totalPrice = quantity * prices[item.title];

  const handleAddToList = () => {
    navigation.navigate('ListScreen', { newItem: { ...item, quantity, totalPrice } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={30} color="gray" />
        </TouchableOpacity>
      </View>

      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>ราคา: {prices[item.title]} บาท</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setQuantity(prev => Math.max(prev - 1, 1))}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setQuantity(prev => prev + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.totalPrice}>รวม: {totalPrice} บาท</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleAddToList}>
        <Text style={styles.addButtonText}>เพิ่มรายการ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButton: {
    opacity: 0.7,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 24,
    color: '#f05a30',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#eaeaea',
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 24,
  },
  totalPrice: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f05a30',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DetailScreen2;
