import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import BottomNavigator from './Components/BottomNavigator/BottomNavigator';
import {React, useState} from 'react';

import {DisplayDB} from './Screen/DisplayDB';
import {Calculator} from './Screen/Calculator';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Calculator"
          component={Calculator}
          options={{
            title: 'Awesome Calc app',
          }}
        />
        <Stack.Screen
          name="Database"
          component={DisplayDB}
          options={{
            title: 'Display the Database settings',
          }}
        />
        {/* <Stack.Screen
          name="Dashboard"
          component={BottomNavigator}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
