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
  let listAnswers = [];
  const GetDb = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT answer FROM AllAnswers',
        [],
        function (tx, result) {
          for (let i = 0; i < result.rows.length; ++i) {
            var data = result.rows.item(i);
            listAnswers.push(data); //add data to the list
            console.log('DisplayDB each item:', data);
          }
          //check if its there
          listAnswers.map(item => {
            console.log('DisplayDB listAnswers', item);
          });
          listAnswers.push('Sample1'); //add empty item to the list
          listAnswers.push('Sample2'); //add empty item to the list
        },
      );
    });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>All saved Entries</Text>
        <GetAllData />
        <ScrollView>
          {listAnswers.map((item, index) => {
            return (
              <View>
                <Text key={index} style={styles.text}>
                  {item.answer}
                </Text>
              </View>
            );
          })}
          <TouchableOpacityButton
            onPress={() => GetDb}
            Text="Load database data"
          />
          <TouchableOpacityButton
            onPress={() => navigation.navigate(Calculator)}
            Text="Go to Database"
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
