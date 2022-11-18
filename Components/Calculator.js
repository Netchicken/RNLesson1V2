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
import {CalcButtons} from './calcbuttons';
import {NumberButtons} from '.NumberButtons';

export const Calculator = ({navigation}) => {
  const [calculation, setCalculation] = useState('');

  const updateCalculation = value => {
    // alert('updateCalculation' + ' ' + value + ' ' + calculation);
    setCalculation(calculation + String(value)); //add the value to the growing string
    console.log('updateCalculation all', calculation);
    //if you press = then evaluate the calculation
    if (value === '=') {
      let calc = calculation;
      // eslint-disable-next-line no-new-func
      let answer = new Function('return ' + calc)();

      setCalculation(calc + '=' + answer);
    }
    if (value === 'clear') {
      setCalculation('');
    }
    if (value === 'del') {
      const result = calculation.slice(0, -1); //removes the last element from the string
      console.log('updateCalculation DEL', result);
      setCalculation(result);
    }
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('./Assets/waterdrops.jpg')}
      style={styles.image}>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View>
              <Text style={styles.sectionTitle}>Simple Calculator</Text>
              <View style={styles.calcBox}>
                <Text style={styles.outputText}>
                  {calculation || 'Enter a number'}
                </Text>
              </View>
              <CalcButtons updateCalculation={updateCalculation} />
              <NumberButtons updateCalculation={updateCalculation} />
            </View>
          </ScrollView>
          <Button
            title="Go to Profile"
            onPress={() => navigation.navigate('DisplayDB')}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
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