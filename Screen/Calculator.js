import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {React, useState} from 'react';
import {CalcButtons} from '../Components/calcbuttons';
import {NumberButtons} from '../Components/NumberButtons';
import {AddNavOperations} from '../Components/DbButtons';
import {AddData} from '../Operations/DbOperations';

export const Calculator = ({navigation}) => {
  const [calculation, setCalculation] = useState('');

  const updateCalculation = value => {
    setCalculation(calculation + String(value)); //add the value to the growing string
    console.log('updateCalculation all', calculation);
    //if you press = then evaluate the calculation
    if (value === '=') {
      let calc = calculation;
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
      source={require('../Assets/waterdrops.jpg')} //Assets\waterdrops.jpg
      style={styles.image}>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View>
              {/* <Text style={styles.sectionTitle}>Simple Calculator</Text> */}
              <View style={styles.calcBox}>
                <Text style={styles.outputText}>
                  {calculation || 'Enter a number'}
                </Text>
              </View>
              <CalcButtons updateCalculation={updateCalculation} />
              <NumberButtons updateCalculation={updateCalculation} />
              <AddNavOperations
                navigation={navigation}
                calculation={calculation}
              />
            </View>
          </ScrollView>
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
