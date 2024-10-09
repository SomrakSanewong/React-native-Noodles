import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Home';
import Settings from './Settings';
import Details from './Details';
import Monu from './Monu';
import ListScreen from './ListScreen';

const homeName = 'Home';
const settingsName = 'Settings';
const detailsName = 'Details';
const listName = 'ListScreen';
const monuName = 'monu';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === detailsName) {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (rn === monuName) {
            iconName = focused ? 'sync' : 'sync-outline';
          } else if (rn === listName) {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (rn === settingsName) {
            iconName = focused ? 'mail' : 'mail-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={Home} options={{ headerShown: false }} />
      <Tab.Screen name={detailsName} component={Details} options={{ headerShown: false }} />
      <Tab.Screen name={monuName} component={Monu} options={{ headerShown: false }} />
      <Tab.Screen name={listName} component={ListScreen} options={{ headerShown: false }} />
      <Tab.Screen name={settingsName} component={Settings} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
