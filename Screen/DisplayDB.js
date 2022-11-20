import SQLite from 'react-native-sqlite-2';
import {NavigationContainer} from '@react-navigation/native';
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {DbButtons} from '../Components/DbButtons';
import {Calculator} from './Calculator';
import {TouchableOpacityButton} from '../Components/AllButtons';
import {GetAllData} from '../Operations/DbOperations';
let db = SQLite.openDatabase({
  name: 'calcDB',
  location: 'default',
  createFromLocation: '~calcDB',
});

export const DisplayDB = ({navigation}) => {
  console.log('DisplayDB triggered');

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>All saved Entries</Text>
        <GetAllData />
        <ScrollView>
          <TouchableOpacityButton
            onPress={() => GetAllData()}
            Text="Load database data"
          />
          <TouchableOpacityButton
            onPress={() => navigation.navigate(Calculator)}
            Text="Go to Calculator"
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column',
  },

  UpdateButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  UpdateButtonText: {
    color: '#fff',
  },
  DeleteButton: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  DeleteButtonText: {
    color: '#fff',
  },

  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
