import {
  View, //The most fundamental component for building a UI, View is a container that supports layout with flexbox, style, some touch handling, and accessibility controls. https://reactnative.dev/docs/view
  StyleSheet, //StyleSheet.create returns a stylesheet object. https://reactnative.dev/docs/stylesheet
} from 'react-native';
import React from 'react';
import {TouchableOpacityButton} from './AllButtons';
import {AddData, DeleteAll, GetAllData} from '../Operations/DbOperations';

export const AddNavOperations = ({navigation, calculation}) => {
  return (
    <View style={styles.rowcontainer}>
      <TouchableOpacityButton
        onPress={() => AddData({data: calculation, check: 'Add'})}
        text="Add"
      />

      <TouchableOpacityButton
        onPress={() => navigation.navigate('Database')}
        text="Go to Database"
      />
    </View>
  );
};

export const DeleteNavOperations = ({navigation}) => {
  return (
    <View style={styles.rowcontainer}>
      <TouchableOpacityButton onPress={() => GetAllData()} text="Reload" />
      <TouchableOpacityButton onPress={() => DeleteAll()} text="Clear" />
      <TouchableOpacityButton
        onPress={() => navigation.navigate('Calculator')}
        text="Return"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowcontainer: {
    flexDirection: 'row',
    width: '100%', //you need this to see the buttons
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
