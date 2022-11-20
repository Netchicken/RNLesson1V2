import {React, useState} from 'react';
import SQLite from 'react-native-sqlite-2';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
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

let singleAnswer = '';
let listAnswers = [];
//https://github.com/craftzdog/react-native-sqlite-2#readme

export const AddData = data => {
  createDB();
  singleAnswer = data;
  console.log('AddData singleAnswer', singleAnswer);
  db.transaction(txn => {
    //all operations are wrapped in the transaction
    if (singleAnswer !== '') {
      txn.executeSql(
        'INSERT INTO AllAnswers (answer) VALUES ( "' + singleAnswer + '")',
        (trans, results) => {
          console.log('PassData success results: ' + JSON.stringify(results));
          console.log('PassData success transaction: ' + JSON.stringify(trans));
        },
        error => {
          console.log('PassData error: ' + JSON.stringify(error));
        },
        [],
      );
    }
  });
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

  //CREATE TABLE "AllAnswers" ("Id"	INTEGER NOT NULL UNIQUE,"answer"	TEXT,	PRIMARY KEY("Id" AUTOINCREMENT))

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

export const GetAllData = () => {
  //listAnswers = [];
  createDB();

  db.transaction(txn => {
    txn.executeSql('SELECT answer FROM AllAnswers', [], function (tx, result) {
      for (let i = 0; i < result.rows.length; ++i) {
        var data = result.rows.item(i);
        listAnswers.push(data); //add data to the list
        console.log('DbOp each item:', data);
      }
      //check if its there
      listAnswers.map(item => {
        console.log('DbOp listAnswers', item);
      });
    });
  });
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        All saved Entries from GetAllData = {listAnswers.length}
      </Text>

      <ScrollView style={styles.scrollView}>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginHorizontal: 3,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 2,
    color: 'black',
  },
});
