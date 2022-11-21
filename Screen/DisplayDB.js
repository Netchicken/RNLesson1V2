import {useEffect} from 'react';
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  ImageBackground,
} from 'react-native';
//import {Calculator} from './Calculator';
import {DeleteNavOperations} from '../Components/DbButtons';
import {GetAllData} from '../Operations/DbOperations';

export const DisplayDB = ({navigation}) => {
  useEffect(() => {
    GetAllData();
  }, []);

  console.log('DisplayDB triggered');

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../Assets/waterdrops.jpg')} //Assets\waterdrops.jpg
      style={styles.image}>
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.sectionTitle}>All saved Entries</Text>
          <GetAllData />
          <DeleteNavOperations navigation={navigation} />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

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

  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
