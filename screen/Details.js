import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Details({ route, navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const refresh = route.params?.refresh;

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favoriteItems = await AsyncStorage.getItem('favorites');
        const allItemsList = [
          { id: '1', title: 'เส้นเล็ก น้ำใส', image: require('../img/4.jpg')},
        { id: '2', title: 'เส้นเล็ก ต้มยำ', image: require('../img/5.jpg')},
        { id: '3', title: 'เส้นเล็ก น้ำตก', image: require('../img/6.jpg')},
        { id: '4', title: 'เส้นเล็ก เย็นตาโฟ', image: require('../img/7.jpg')},
        { id: '5', title: 'เส้นเล็ก ไก่มะละ', image: require('../img/6.jpg')},

        { id: '6', title: 'เส้นใหญ่ น้ำใส', image: require('../img/4.jpg')},
        { id: '7', title: 'เส้นใหญ่ ต้มยำ', image: require('../img/5.jpg')},
        { id: '8', title: 'เส้นใหญ่ น้ำตก', image: require('../img/6.jpg')},
        { id: '9', title: 'เส้นใหญ่ เย็นตาโฟ', image: require('../img/7.jpg')},
        { id: '10', title: 'เส้นใหญ่ ไก่มะละ', image: require('../img/6.jpg')},
        
        { id: '11',  title: 'มาม่า น้ำใส', image: require('../img/6.jpg')},
        { id: '12', title: 'มาม่า ต้มยำ', image: require('../img/5.jpg')},
        { id: '13', title: 'มาม่า น้ำตก', image: require('../img/6.jpg')},
        { id: '14', title: 'มาม่า เย็นตาโฟ', image: require('../img/7.jpg')},
        { id: '15', title: 'มาม่า ไก่มะละ', image: require('../img/6.jpg')},

        { id: '16',  title: 'เส้นหมี่ น้ำใส', image: require('../img/6.jpg')},
        { id: '17', title: 'เส้นหมี่ ต้มยำ', image: require('../img/5.jpg')},
        { id: '18', title: 'เส้นหมี่ น้ำตก', image: require('../img/6.jpg')},
        { id: '19', title: 'เส้นหมี่ เย็นตาโฟ', image: require('../img/7.jpg')},
        { id: '20', title: 'เส้นหมี่ ไก่มะละ', image: require('../img/6.jpg')},

        { id: '21', title: 'เส้นบะหมี่ เหลือง น้ำใส', image: require('../img/6.jpg')},
        { id: '22', title: 'เส้นบะหมี่ เหลือง ต้มยำ', image: require('../img/5.jpg')},
        { id: '23', title: 'เส้นบะหมี่ เหลือง น้ำตก', image: require('../img/6.jpg')},
        { id: '246', title: 'เส้นบะหมี่ เหลือง เย็นตาโฟ', image: require('../img/7.jpg')},
        { id: '25', title: 'เส้นบะหมี่ เหลือง ไก่มะละ', image: require('../img/6.jpg')},

        { id: '26', title: 'เส้นบะหมี่ หยก น้ำใส', image: require('../img/6.jpg')},
        { id: '27', title: 'เส้นบะหมี่ หยก ต้มยำ', image: require('../img/5.jpg')},
        { id: '28', title: 'เส้นบะหมี่ หยก น้ำตก', image: require('../img/6.jpg')},
        { id: '29', title: 'เส้นบะหมี่ หยก เย็นตาโฟ', image: require('../img/7.jpg')},
        { id: '30', title: 'เส้นบะหมี่ หยก ไก่มะละ', image: require('../img/6.jpg')},
        
        { id: '31', title: 'วุ้นเส้น น้ำใส', image: require('../img/6.jpg')},
        { id: '32', title: 'วุ้นเส้น ต้มยำ', image: require('../img/5.jpg')},
        { id: '33', title: 'วุ้นเส้น น้ำตก', image: require('../img/6.jpg')},
        { id: '34', title: 'วุ้นเส้น เย็นตาโฟ', image: require('../img/7.jpg')},
        { id: '35', title: 'วุ้นเส้น ไก่มะละ', image: require('../img/6.jpg')},
        ];
        setAllItems(allItemsList);
        if (favoriteItems !== null) {
          const favoritesArray = JSON.parse(favoriteItems);
          const favoriteItemsDetails = allItemsList.filter(item => favoritesArray.includes(item.id));
          setFavorites(favoriteItemsDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getFavorites();
  }, [refresh]);

  const handleDelete = async (itemId) => {
    try {
      const favoriteItems = await AsyncStorage.getItem('favorites');
      let favoritesArray = favoriteItems ? JSON.parse(favoriteItems) : [];
      
      favoritesArray = favoritesArray.filter(id => id !== itemId);

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      setFavorites(favorites.filter(item => item.id !== itemId));
    } catch (error) {
      console.error(error);
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              "ยืนยันการลบ",
              "คุณแน่ใจว่าต้องการลบรายการนี้ออกจากรายการโปรด?",
              [
                { text: "ยกเลิก", style: "cancel" },
                { text: "ลบ", onPress: () => handleDelete(item.id) }
              ]
            );
          }}
        >
          <Icon name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
          <Icon name="arrow-left" size={30} color="gray" />
        </TouchableOpacity>
        <Text style={styles.heading}>รายการโปรด</Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={renderFavoriteItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyMessage}>ไม่มีรายการโปรด</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    opacity: 0.7,
    marginRight: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flexGrow: 1,
  },
  favoriteItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});
