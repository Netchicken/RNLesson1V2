import SQLite from 'react-native-sqlite-2';
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {DbButtons} from './DbButtons';

let db = SQLite.openDatabase({
  name: 'calcDB',
  location: 'default',
  createFromLocation: '~calcDB',
});

export const DisplayDB = () => {
  //createDB();
  const listAnswers = [];
  db.transaction(txn => {
    txn.executeSql('SELECT answer FROM AllAnswers', [], function (tx, result) {
      for (let i = 0; i < result.rows.length; ++i) {
        var data = result.rows.item(i);
        listAnswers.push(data); //add data to the list
        console.log('DisplayDB each item:', data);
      }
      //check if its there
      listAnswers.map(item => {
        console.log('DisplayDB listAnswers', item);
      });
    });
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>All saved Entries</Text>
        <DbButtons sqlOperation={sqlOperation} />
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
