

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

//Navigation
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from "@react-navigation/native-stack"


//Screens
import Otp from './Screens/Otp';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home';


//Props
export type RootStackParamList = {
   Otp:undefined,
   Login:undefined,
   Register:undefined,
   Home:undefined
};

const Stack=createNativeStackNavigator<RootStackParamList>()


function App(): JSX.Element {


  return (
  
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Login'
        screenOptions={{
            headerShown: false
          }}>
        <Stack.Screen 
          name='Otp'
          component={Otp}
        />
        <Stack.Screen 
          name='Login'
          component={Login}
        />
         <Stack.Screen 
          name='Register'
          component={Register}
        />
         <Stack.Screen 
          name='Home'
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


export default App;
