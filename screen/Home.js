import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';

const images = [
  require('../img/4.jpg'),
  require('../img/5.jpg'),
  require('../img/6.jpg')
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Home({ navigation }) {
  const [selected, setSelected] = useState('เมนู');
  const [searchQuery, setSearchQuery] = useState('');
  const [imgActive, setImgActive] = useState(0);
  const [randomItems, setRandomItems] = useState([]); 
  const scrollViewRef = useRef(null);

  const promoItems = {
    'เมนู': [
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
    ],
    'เครื่องดื่ม': [
      { id: '1', title: 'น้ำเปล่า', image: require('../img/2.jpg') },
      { id: '2', title: 'น้ำอัดลม', image: require('../img/2.jpg') },
      { id: '3', title: 'น้ำหวาน', image: require('../img/2.jpg') },
      { id: '4', title: 'น้ำอัดลมใหญ่', image: require('../img/2.jpg') },
    ],
  };

  const getPromoItems = () => {
    if (selected === 'เครื่องดื่ม') {
      return promoItems['เครื่องดื่ม'];
    }
    return promoItems['เมนู'];
  };

  const getRandomPromoItems = (items, count) => {
    const shuffled = items.sort(() => 0.3 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const randomMenu = getRandomPromoItems(getPromoItems(), 10);
    setRandomItems(randomMenu);
  }, [selected]);

  const handlePress = (item) => {
    setSelected(item);
  };

  const handlePromoPress = (item) => {
    if (selected === 'เครื่องดื่ม') {
      navigation.navigate('DetailScreen2', { item });
    } else {
      navigation.navigate('Detail', { item });
    }
  };

  const handleMorePress = () => {
    navigation.navigate('MoreMenuScreen');
  };

  const renderPromoItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePromoPress(item)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setImgActive((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: imgActive * WIDTH, animated: true });
    }
  }, [imgActive]);

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={stylesWrap.container}>
            <ScrollView
              ref={scrollViewRef}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={stylesWrap.wrap}>
              {images.map((e, index) => (
                <Image key={index} resizeMode="stretch" style={stylesWrap.wrap} source={e} />
              ))}
            </ScrollView>
            <View style={stylesWrap.wrapDot}>
              {images.map((e, index) => (
                <Text
                  key={index}
                  style={imgActive === index ? stylesWrap.dotActive : stylesWrap.dot}>
                  ●
                </Text>
              ))}
            </View>
          </View>
          <Searchbar
            placeholder="ค้นหา"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />
          <View style={styles.stampButtonContainer}>
            <TouchableOpacity
              style={styles.stampButton}
              onPress={() => navigation.navigate('PointsScreen')}>
              <Text style={styles.stampButtonText}>สะสมแต้ม</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.topbar}>
            {['เมนู', 'เครื่องดื่ม', 'ขนมหวาน'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.button,
                  selected === item && styles.selectedButton,
                ]}
                onPress={() => handlePress(item)}>
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selected === 'เมนู' && (
            <View style={styles.moreButtonContainer}>
              <TouchableOpacity
                style={styles.moreButton}
                onPress={handleMorePress}>
                <Text style={styles.moreButtonText}>ดูเพิ่มเติม</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      }
      data={randomItems}
      renderItem={renderPromoItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#eaeaea',
  },
  selectedButton: {
    backgroundColor: '#f05a30',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  searchbar: {
    marginVertical: 10,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  item: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  itemText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  moreButtonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  moreButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f05a30',
  },
  moreButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  stampButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  stampButton: {
    paddingVertical: 12,
    paddingHorizontal: 160,
    backgroundColor: '#4CAF50',
  },
  stampButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

const stylesWrap = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    margin: 3,
    color: '#888',
  },
  dotActive: {
    margin: 3,
    color: '#FFF',
  },
});
