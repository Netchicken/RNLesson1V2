import {
  View, //The most fundamental component for building a UI, View is a container that supports layout with flexbox, style, some touch handling, and accessibility controls. https://reactnative.dev/docs/view
  StyleSheet, //StyleSheet.create returns a stylesheet object. https://reactnative.dev/docs/stylesheet
} from 'react-native';
import React from 'react';
import {PressableButton} from './AllButtons';
import {GetDb} from '../Operations/DbOperations';

export const DbButtons = ({sqlOperation, navigation}) => {
  return (
    <View style={styles.rowcontainer}>
      <PressableButton onPress={sqlOperation} symbol="Display Database" />
      <PressableButton onPress={sqlOperation} symbol="Add" />
      <PressableButton onPress={sqlOperation} symbol="Edit" />
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
