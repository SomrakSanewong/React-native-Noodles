import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params; 

  const [selectedLevel, setSelectedLevel] = useState('พิเศษสุด');
  const [selectedAdditions, setSelectedAdditions] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [details, setDetails] = useState('');  

  useEffect(() => {
    const getFavoriteStatus = async () => {
      try {
        const favoriteItems = await AsyncStorage.getItem('favorites');
        if (favoriteItems !== null) {
          const favoritesArray = JSON.parse(favoriteItems);
          setIsFavorite(favoritesArray.includes(item.id));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getFavoriteStatus();
  }, [item.id]);

  const handleFavoritePress = async () => {
    try {
      const favoriteItems = await AsyncStorage.getItem('favorites');
      let favoritesArray = favoriteItems ? JSON.parse(favoriteItems) : [];
      
      if (favoritesArray.includes(item.id)) {
        favoritesArray = favoritesArray.filter(favId => favId !== item.id);
      } else {
        favoritesArray.push(item.id);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      setIsFavorite(!isFavorite);

      navigation.navigate('Details', { refresh: new Date().getTime() });
    } catch (error) {
      console.error(error);
    }
  };

  const levels = [
    { label: 'พิเศษสุด', price: 60 },
    { label: 'พิเศษ', price: 50 },
    { label: 'ธรรมดา', price: 40 },
  ];

  const additions = [
    { label: 'ลูกชิ้นหมู', price: 10 },
    { label: 'ลูกชิ้นปลา', price: 10 },
    { label: 'หมูสับ', price: 10 },
    { label: 'หมูชิ้น', price: 10 },
    { label: 'ปลาหมึก', price: 10 },
    { label: 'เลือดหมู', price: 10 }
  ];

  const handleAdditionPress = (addition) => {
    setSelectedAdditions((prevAdditions) => {
      if (prevAdditions.includes(addition.label)) {
        return prevAdditions.filter(item => item !== addition.label);
      } else {
        return [...prevAdditions, addition.label];
      }
    });
  };

  const handleAddToList = () => {
    const selectedItem = {
      id: item.id,
      title: item.title,
      level: selectedLevel,
      additions: selectedAdditions,
      details: details, 
      totalPrice: getTotalPrice(),
    };

    navigation.navigate('ListScreen', { newItem: selectedItem });
  };

  const getTotalAdditionsPrice = () => {
    return additions
      .filter(addition => selectedAdditions.includes(addition.label))
      .reduce((total, addition) => total + addition.price, 0);
  };

  const getTotalPrice = () => {
    const levelPrice = levels.find(level => level.label === selectedLevel)?.price || 0;
    return levelPrice + getTotalAdditionsPrice();
  };

  const handleDetailsChange = (text) => {
    const words = text.trim().split(/\s+/); 
    if (words.length <= 120) {
      setDetails(text);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color={isFavorite ? 'red' : 'gray'} />
        </TouchableOpacity>
      </View>

      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <Text style={styles.sectionTitle}>ประเภท</Text>
      <View style={styles.optionsContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level.label}
            style={[
              styles.option,
              selectedLevel === level.label && styles.selectedOption
            ]}
            onPress={() => setSelectedLevel(level.label)}
          >
            <Text style={styles.optionText}>{level.label}</Text>
            <Text style={[styles.optionPrice, selectedLevel === level.label && styles.selectedPrice]}>
              {level.price} บาท
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>เพิ่มเติม</Text>
      <View style={styles.optionsContainer}>
        {additions.map((addition) => (
          <TouchableOpacity
            key={addition.label}
            style={[
              styles.option,
              selectedAdditions.includes(addition.label) && styles.selectedOption
            ]}
            onPress={() => handleAdditionPress(addition)}
          >
            <Text style={styles.optionText}>{addition.label}</Text>
            <Text style={[styles.optionPrice, selectedAdditions.includes(addition.label) && styles.selectedPrice]}>
              {addition.price} บาท
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.detailsInput}
        placeholder="กรอกรายละเอียดเพิ่มเติม (สูงสุด 120 คำ)"
        value={details}
        onChangeText={handleDetailsChange}
        multiline
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToList}>
          <Text style={styles.addButtonText}>
            เพิ่มลงในรายการ - รวม {getTotalPrice()} บาท
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0f7fa',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    opacity: 0.7,
  },
  favoriteButton: {
    opacity: 0.7,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: -20,
  },
  description: {
    fontSize: 16,
    color: '#616161',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: 15, 
  },
  optionsContainer: {
    width: '100%',
  },
  option: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1c4e9',
  },
  selectedOption: {
    backgroundColor: '#d1c4e9',
  },
  optionText: {
    fontSize: 16,
  },
  optionPrice: {
    fontSize: 16,
    color: '#f44336', 
  },
  selectedPrice: {
    color: '#4caf50', 
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  detailsInput: {
    width: '100%',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1c4e9',
    marginVertical: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
