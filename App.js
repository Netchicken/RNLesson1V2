//import 'react-native-gesture-handler'; //this must be at the very top!!!
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';
import {React, useState} from 'react';
mport {DisplayDB} from './Components/DisplayDB';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import {DisplayDB} from './Components/DisplayDB';
import {Calculator} from './Components/Calculator';

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
          name="Settings"
          component={DisplayDB}
          options={{
            title: 'Display the Database settings',
          }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  liContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 5,
  },

  liText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '400',
    // marginBottom: -3.5,
    // marginTop: -3.5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  container: {
    fontSize: 40,
    flex: 1,
  },

  calcBox: {
    height: 50,
    borderRadius: 40,
    paddingLeft: 20,
    paddingTop: 10,
    backgroundColor: 'oldlace',
    marginBottom: 10,
    borderWidth: 1,
  },
  outputText: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlignment: 'right',
    fontSize: 30,
  },

  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});

export default App;
