import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PointsScreen = () => {
  const [points, setPoints] = useState(0);
  const [items, setItems] = useState([
    { id: 'DISCOUNT1', title: 'ส่วนลด 10', requiredPoints: 3 },
    { id: 'DISCOUNT4', title: 'ส่วนลด 40', requiredPoints: 10 },
    { id: 'DISCOUNT5', title: 'ส่วนลด 50', requiredPoints: 15 },
    { id: 'DISCOUNT6', title: 'ส่วนลด 60', requiredPoints: 20 },
    { id: 'DISCOUNT10PERCENT', title: 'ลด 10%', requiredPoints: 7 },
  ]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const savedPoints = await AsyncStorage.getItem('points');
        setPoints(savedPoints ? parseInt(savedPoints) : 0);
      } catch (error) {
        console.error('Failed to fetch points:', error);
      }
    };

    fetchPoints();
  }, []);

  const handleRedeem = (item) => {
    if (points >= item.requiredPoints) {
      Alert.alert(
        'ยืนยันการแลกคะแนน',
        `คุณต้องการแลกคะแนน ${item.requiredPoints} คะแนน สำหรับ ${item.title} ใช่หรือไม่?`,
        [
          {
            text: 'ยกเลิก',
            style: 'cancel',
          },
          {
            text: 'ยืนยัน',
            onPress: async () => {
              const newPoints = points - item.requiredPoints;
              setPoints(newPoints);

              try {
                await AsyncStorage.setItem('points', newPoints.toString());

                let redeemedItems = await AsyncStorage.getItem('redeemedItems');
                redeemedItems = redeemedItems ? JSON.parse(redeemedItems) : [];
                redeemedItems.push({ ...item });
                await AsyncStorage.setItem('redeemedItems', JSON.stringify(redeemedItems));

                Alert.alert(`${item.title} แลกรับเรียบร้อยแล้ว!`, `รหัสส่วนลดของคุณคือ: ${item.id}`);
                navigation.navigate('RedeemedItemsScreen');
              } catch (error) {
                console.error('Failed to save points:', error);
                Alert.alert('ข้อผิดพลาด', 'ไม่สามารถบันทึกคะแนนได้');
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('คะแนนไม่เพียงพอ');
    }
  };

  const renderStarRating = () => {
    const starCount = Math.floor(points / 10);
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(<Icon key={i} name="star" size={20} color="gold" />);
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={25} color="#000" />
      </TouchableOpacity>

      <Text style={styles.header}>สะสมแต้มของคุณ</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsLabel}>คะแนนสะสม:</Text>
        <View style={styles.starsContainer}>
          {renderStarRating()}
        </View>
        <Text style={styles.pointsCount}>{points} คะแนน</Text>
      </View>

      <Text style={styles.redeemHeader}>แลกรับรางวัล</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleRedeem(item)}
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPoints}>ต้องการ {item.requiredPoints} คะแนน</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.redeemedButton}
        onPress={() => navigation.navigate('RedeemedItemsScreen')}
      >
        <Text style={styles.redeemedButtonText}>ดูรายการที่แลกไป</Text>
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
  backButton: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: -60,
  },
  pointsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  pointsLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  pointsCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  redeemHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPoints: {
    fontSize: 16,
    color: '#4caf50',
  },
  redeemedButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    alignItems: 'center',
  },
  redeemedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PointsScreen;
