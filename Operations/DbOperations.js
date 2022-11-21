import {React, useState} from 'react';
import SQLite from 'react-native-sqlite-2';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';

//https://www.npmjs.com/package/react-native-sqlite-2
//https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native/

const databaseName = 'calcDB.db';
const tableName = 'AllAnswers';
const fieldName = 'answer';

const db = SQLite.openDatabase({
  name: 'calcDB',
  location: 'default',
  createFromLocation: '~calcDB',
});

//let singleAnswer = '';

//https://github.com/craftzdog/react-native-sqlite-2#readme

export const AddData = ({data, check}) => {
  console.log('AddData ', data + ' ' + check);
  // createDB();
  if (check === 'Add') {
    let singleAnswer = data;

    db.transaction(txn => {
      //all operations are wrapped in the transaction  INSERT INTO AllAnswers (answer) VALUES ( 101010)
      if (singleAnswer !== '') {
        console.log('singleAnswer ', singleAnswer);
        txn.executeSql(
          'INSERT INTO AllAnswers (answer) VALUES ( "' + singleAnswer + '")',
          [],
          (trans, results) => {
            console.log('AddData success results: ' + JSON.stringify(results));
            console.log(
              'AddData success transaction: ' + JSON.stringify(trans),
            );
          },
          error => {
            console.log('AddData error: ' + JSON.stringify(error));
          },
          [],
        );
      }
    });
  }
};
export const DeleteAll = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM AllAnswers ', (tx, results) => {
      console.log('Results', results.rowsAffected);
      if (results.rowsAffected > 0) {
        Alert.alert(
          'Success',
          'All deleted successfully',
          [
            {
              text: 'Ok',
              // onPress: () => navigation.navigate('HomeScreen'),
            },
          ],
          {cancelable: false},
        );
      } else {
        alert('borked');
      }
    });
  });
};

const createDB = () => {
  console.log('createDB triggering');
  let params = [];
  const createString =
    'CREATE TABLE IF NOT EXISTS AllAnswers(Id INTEGER PRIMARY KEY NOT NULL, answer TEXT,	PRIMARY KEY(Id AUTOINCREMENT))';
  db.transaction(txn => {
    txn.executeSql(
      createString,
      params,
      (trans, results) => {
        console.log('createDB success results: ' + JSON.stringify(results));
        console.log('createDB success transaction: ' + JSON.stringify(trans));
      },
      error => {
        console.log('createDB error: ' + JSON.stringify(error));
        // reject(error);
      },
    );
  });
};

let listAnswers = [];
export const GetAllData = () => {
  console.log('GetAllData', 'triggered');
  listAnswers = []; 
  //const [listAnswers, setlistAnswers] = useState([]);
  db.transaction(txn => {
    txn.executeSql('SELECT answer FROM AllAnswers', [], function (tx, result) {
      for (let i = 0; i < result.rows.length; ++i) {
        var data = result.rows.item(i);
        //use spread operator to add to beginning
        listAnswers = [data, ...listAnswers];
      }
      console.log('GetAllData success results: ' + JSON.stringify(result));
      //check if its there
      listAnswers.map(item => {
        var index = listAnswers.indexOf(item);
        console.log('GetAllData listAnswers', index + ' - ' + item.answer);
      });
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        All Entries = {listAnswers.length}
      </Text>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    width: '100%',
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 3,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginHorizontal: 3,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    margin: 2,
    color: 'black',
  },
});
