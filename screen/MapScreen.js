import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const MapScreen = () => {
  const mapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=100.492,13.736,100.511,13.756&layer=mapnik";

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: mapUrl }}
        style={styles.map}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: 300,
    height: 300,
  },
});

export default MapScreen;
