import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;

const MoreMenuScreen2 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const navigation = useNavigation();

  const menuItems = [
        { id: '1', title: 'เส้นเล็ก น้ำใส',category: 'เส้นเล็ก', image: require('../img/4.jpg')},
        { id: '2', title: 'เส้นเล็ก ต้มยำ',category: 'เส้นเล็ก', image: require('../img/5.jpg')},
        { id: '3', title: 'เส้นเล็ก น้ำตก',category: 'เส้นเล็ก', image: require('../img/6.jpg')},
        { id: '4', title: 'เส้นเล็ก เย็นตาโฟ',category: 'เส้นเล็ก', image: require('../img/7.jpg')},
        { id: '5', title: 'เส้นเล็ก ไก่มะละ',category: 'เส้นเล็ก', image: require('../img/6.jpg')},

        { id: '6', title: 'เส้นใหญ่ น้ำใส', category: 'เส้นใหญ่', image: require('../img/4.jpg')},
        { id: '7', title: 'เส้นใหญ่ ต้มยำ', category: 'เส้นใหญ่', image: require('../img/5.jpg')},
        { id: '8', title: 'เส้นใหญ่ น้ำตก', category: 'เส้นใหญ่', image: require('../img/6.jpg')},
        { id: '9', title: 'เส้นใหญ่ เย็นตาโฟ', category: 'เส้นใหญ่', image: require('../img/7.jpg')},
        { id: '10', title: 'เส้นใหญ่ ไก่มะละ', category: 'เส้นใหญ่', image: require('../img/6.jpg')},

        { id: '11',  title: 'มาม่า น้ำใส', category: 'มาม่า', image: require('../img/6.jpg')},
        { id: '12', title: 'มาม่า ต้มยำ', category: 'มาม่า', image: require('../img/5.jpg')},
        { id: '13', title: 'มาม่า น้ำตก', category: 'มาม่า', image: require('../img/6.jpg')},
        { id: '14', title: 'มาม่า เย็นตาโฟ', category: 'มาม่า', image: require('../img/7.jpg')},
        { id: '15', title: 'มาม่า ไก่มะละ', category: 'มาม่า', image: require('../img/6.jpg')},

        { id: '16',  title: 'เส้นหมี่ น้ำใส', category: 'เส้นหมี่', image: require('../img/6.jpg')},
        { id: '17', title: 'เส้นหมี่ ต้มยำ', category: 'เส้นหมี่', image: require('../img/5.jpg')},
        { id: '18', title: 'เส้นหมี่ น้ำตก', category: 'เส้นหมี่', image: require('../img/6.jpg')},
        { id: '19', title: 'เส้นหมี่ เย็นตาโฟ', category: 'เส้นหมี่', image: require('../img/7.jpg')},
        { id: '20', title: 'เส้นหมี่ ไก่มะละ', category: 'เส้นหมี่', image: require('../img/6.jpg')},

        { id: '21', title: 'เส้นบะหมี่ เหลือง น้ำใส', category: 'เส้นบะหมี่', image: require('../img/6.jpg')},
        { id: '22', title: 'เส้นบะหมี่ เหลือง ต้มยำ', category: 'เส้นบะหมี่', image: require('../img/5.jpg')},
        { id: '23', title: 'เส้นบะหมี่ เหลือง น้ำตก', category: 'เส้นบะหมี่', image: require('../img/6.jpg')},
        { id: '246', title: 'เส้นบะหมี่ เหลือง เย็นตาโฟ', category: 'เส้นบะหมี่', image: require('../img/7.jpg')},
        { id: '25', title: 'เส้นบะหมี่ เหลือง ไก่มะละ', category: 'เส้นบะหมี่', image: require('../img/6.jpg')},

        { id: '26', title: 'เส้นบะหมี่ หยก น้ำใส', category: 'เส้นบะหมี่', image: require('../img/6.jpg')},
        { id: '27', title: 'เส้นบะหมี่ หยก ต้มยำ', category: 'เส้นบะหมี่', image: require('../img/5.jpg')},
        { id: '28', title: 'เส้นบะหมี่ หยก น้ำตก', category: 'เส้นบะหมี่', image: require('../img/6.jpg')},
        { id: '29', title: 'เส้นบะหมี่ หยก เย็นตาโฟ', category: 'เส้นบะหมี่', image: require('../img/7.jpg')},
        { id: '30', title: 'เส้นบะหมี่ หยก ไก่มะละ', category: 'เส้นบะหมี่', image: require('../img/6.jpg')},

        { id: '31', title: 'วุ้นเส้น น้ำใส', category: 'วุ้นเส้น', image: require('../img/6.jpg')},
        { id: '32', title: 'วุ้นเส้น ต้มยำ', category: 'วุ้นเส้น', image: require('../img/5.jpg')},
        { id: '33', title: 'วุ้นเส้น น้ำตก', category: 'วุ้นเส้น', image: require('../img/6.jpg')},
        { id: '34', title: 'วุ้นเส้น เย็นตาโฟ', category: 'วุ้นเส้น', image: require('../img/7.jpg')},
        { id: '35', title: 'วุ้นเส้น ไก่มะละ', category: 'วุ้นเส้น', image: require('../img/6.jpg')},
  ];

  const categories = ['ทั้งหมด', 'เส้นเล็ก', 'เส้นใหญ่', 'มาม่า', 'เส้นหมี่', 'เส้นบะหมี่', 'วุ้นเส้น'];

  const filteredMenuItems = menuItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'ทั้งหมด' || selectedCategory === '' || item.category === selectedCategory)
  );

  const handleMenuPress = (item) => {
    navigation.navigate('Detail', { item });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={25} color="gray" />
      </TouchableOpacity>

      <Searchbar
        placeholder="ค้นหา"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <View style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category === 'ทั้งหมด' ? '' : category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredMenuItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress(item)}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  searchbar: {
    marginVertical: 10,
    width: '100%',
    borderRadius: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuList: {
    paddingBottom: 20,
  },
  menuItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: (WIDTH / 2) - 40,
    height: 120,
    borderRadius: 10,
  },
  itemText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default MoreMenuScreen2;
