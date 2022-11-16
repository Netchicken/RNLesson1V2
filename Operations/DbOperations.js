import {React, useState} from 'react';
import SQLite from 'react-native-sqlite-2';
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
//import SQLiteStorage from 'react-native-sqlite-storage';
//https://www.npmjs.com/package/react-native-sqlite-2
//https://aboutreact.com/example-of-pre-populated-sqlite-database-in-react-native/

const databaseName = 'calcDB.db';
const tableName = 'AllAnswers';
const fieldName = 'answer';
let db = SQLite.openDatabase({
  name: 'calcDB',
  location: 'default',
  createFromLocation: '~calcDB',
});

let singleAnswer = '';
//https://medium.com/infinitbility/react-native-sqlite-storage-422503634dd2

//https://github.com/craftzdog/react-native-sqlite-2#readme

export const PassData = data => {
  singleAnswer = data;
  console.log('PassData singleAnswer', singleAnswer);

  createDB();

  db.transaction(txn => {
    if (singleAnswer !== '') {
      txn.executeSql(
        'INSERT INTO AllAnswers (answer) VALUES ( "' + singleAnswer + '")',
        (trans, results) => {
          console.log('execute success results: ' + JSON.stringify(results));
          console.log('execute success transaction: ' + JSON.stringify(trans));
        },
        error => {
          console.log('execute error: ' + JSON.stringify(error));
        },
        [],
      );
    }
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
        console.log('execute success results: ' + JSON.stringify(results));
        console.log('execute success transaction: ' + JSON.stringify(trans));
      },
      error => {
        console.log('execute error: ' + JSON.stringify(error));
        // reject(error);
      },
    );
  });
};

export const GetDb = () => {
  createDB();
  const listAnswers = [];
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {listAnswers.map((item, index) => {
          return (
            <View>
              <Text key={index} style={styles.text}>
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
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

//  <FlatList
//    data={DbDisplay}
//    style={styles.liContainer}
//    renderItem={({item}) => <Text style={styles.liText}>{item.answer}</Text>}
//  />;
