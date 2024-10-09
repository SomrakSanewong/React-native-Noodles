import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Clipboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const RedeemedItemsScreen = () => {
  const [redeemedItems, setRedeemedItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRedeemedItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem('redeemedItems');
        if (savedItems) {
          setRedeemedItems(JSON.parse(savedItems));
        }
      } catch (error) {
        console.error('Failed to fetch redeemed items:', error);
      }
    };

    fetchRedeemedItems();
  }, []);

  const handleCopyDiscount = (item) => {
    Alert.alert(
      'ยืนยันการคัดลอก',
      `คุณต้องการคัดลอกส่วนลด ${item.title} หรือไม่?`,
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'คัดลอก',
          onPress: async () => {
            try {
              await Clipboard.setString(item.id);

              const updatedItems = redeemedItems.filter(i => i.id !== item.id);
              setRedeemedItems(updatedItems);
              await AsyncStorage.setItem('redeemedItems', JSON.stringify(updatedItems));

              Alert.alert('สำเร็จ', `ส่วนลด ${item.title} ถูกคัดลอกแล้ว`);
            } catch (error) {
              console.error('Failed to copy discount:', error);
              Alert.alert('ข้อผิดพลาด', 'ไม่สามารถคัดลอกส่วนลดได้');
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemCode}>รหัสส่วนลด: {item.id}</Text>
      <Text style={styles.itemPoints}>คะแนนที่ใช้: {item.requiredPoints}</Text>
      <TouchableOpacity onPress={() => handleCopyDiscount(item)} style={styles.copyButton}>
        <Text style={styles.copyButtonText}>คัดลอกรหัสส่วนลด</Text>
      </TouchableOpacity>
    </View>
  );

  const handleNavigateToMainContainer = () => {
    navigation.navigate('MainContainer');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>รายการที่แลกไป</Text>
      <FlatList
        data={redeemedItems}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity onPress={handleNavigateToMainContainer} style={styles.mainContainerButton}>
        <Text style={styles.mainContainerButtonText}>ชำระเงิน</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1c4e9',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCode: {
    fontSize: 16,
    color: '#4caf50',
    marginVertical: 5,
  },
  itemPoints: {
    fontSize: 16,
    color: '#4caf50',
  },
  copyButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  mainContainerButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#2196f3',
    borderRadius: 5,
    alignItems: 'center',
  },
  mainContainerButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default RedeemedItemsScreen;
