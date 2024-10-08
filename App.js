import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './screen/Splash';
import Singup from './screen/Singup';
import Login4 from './screen/Login4';
import MainContainer from './screen/MainContainer';
import Home from './screen/Home';
import DetailScreen from './screen/DetailScreen';
import ListScreen from './screen/ListScreen';
import MoreMenuScreen from './screen/MoreMenuScreen';
import Settings from './screen/Settings';
import DetailScreen2 from './screen/DetailScreen2';
import PaymentScreen from './screen/PaymentScreen';
import PointsScreen from './screen/PointsScreen';
import Monu from './screen/Monu'; 
import RedeemedItemsScreen from './screen/RedeemedItemsScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Singup"
          component={Singup}
          options={{ headerTitle: 'Sign Up', headerBackTitle: '' }}
        />
        <Stack.Screen
          name="Login4"
          component={Login4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainContainer"
          component={MainContainer}
          options={{ title: 'Main', headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MoreMenuScreen"
          component={MoreMenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailScreen2"
          component={DetailScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PointsScreen"
          component={PointsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Monu"
          component={Monu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RedeemedItemsScreen"
          component={RedeemedItemsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
