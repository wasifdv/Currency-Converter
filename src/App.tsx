import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

//Constants
import { currencyByRupee } from './constants';
//Components
import CurrencyButton from './components/CurrencyButton';
import Snackbar from 'react-native-snackbar';

function App(): React.JSX.Element {
  const [inputValue,SetInputValue] = useState('')
  const [resultValue,SetResultValue] = useState('')
  const [targetCurrency,SetTargetCurrency] = useState('')

  const buttonPressed = (targetValue:Currency)=>{
    if(!inputValue){
      return Snackbar.show({
        text: 'Enter a value to convert', 
        backgroundColor:'#EA7773',
        textColor:"#000000"
      })
      const inputAmount = parseFloat(inputValue)
      const convertedValue = inputAmount * targetValue.value
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`
      SetResultValue(result)
      SetTargetCurrency(targetValue.name)
    }
    else{
      return Snackbar.show({
        text: 'Not a valid number to convert', 
        backgroundColor:'#F4BE2C',
        textColor:"#000000"
      })
    }
  }
  return (
    <SafeAreaView>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;