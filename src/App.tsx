import React, { useState, useCallback } from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { currencyByRupee } from './constants'; // Import from constants.ts

// Define the type for currency data (if not already defined in constants.ts)
interface Currency {
  name: string;
  flag: string;
  value: number;
  symbol: string;
}

// Props for CurrencyButton component
interface CurrencyButtonProps {
  name: string;
  flag: string;
  isDarkMode: boolean;
}

// CurrencyButton component
const CurrencyButton: React.FC<CurrencyButtonProps> = React.memo(({ name, flag, isDarkMode }) => {
  return (
    <View style={styles.currencyButton}>
      <Text style={[styles.flag, { color: isDarkMode ? '#ffffff' : '#000000' }]}>{flag}</Text>
      <Text style={[styles.country, { color: isDarkMode ? '#ffffff' : '#000000' }]}>{name}</Text>
    </View>
  );
});

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const buttonPressed = useCallback((targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#EA7773',
        textColor: '#000000',
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#F4BE2C',
        textColor: '#000000',
      });
    }
  }, [inputValue]);

  return (
    <>
      <StatusBar />
      <View style={styles.container(isDarkMode)}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee(isDarkMode)}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              clearButtonMode="always"
              onChangeText={setInputValue}
              keyboardType="number-pad"
              placeholder="Enter amount in Rupees"
              placeholderTextColor={isDarkMode ? '#888888' : '#bbbbbb'}
              style={styles.inputAmountField(isDarkMode)}
            />
          </View>
          {resultValue && <Text style={styles.resultTxt(isDarkMode)}>{resultValue}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.button(isDarkMode),
                  targetCurrency === item.name && styles.selected,
                ]}
                onPress={() => buttonPressed(item)}
              >
                <CurrencyButton {...item} isDarkMode={isDarkMode} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: (isDarkMode: boolean) => ({
    flex: 1,
    backgroundColor: isDarkMode ? '#1c1c1c' : '#f5f5f5',
  }),
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: (isDarkMode: boolean) => ({
    fontSize: 32,
    color: isDarkMode ? '#ffffff' : '#000000',
    fontWeight: '800',
    textAlign: 'center',
  }),
  rupee: (isDarkMode: boolean) => ({
    marginRight: 8,
    fontSize: 22,
    color: isDarkMode ? '#ffffff' : '#000000',
    fontWeight: '800',
  }),
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputAmountField: (isDarkMode: boolean) => ({
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
    color: isDarkMode ? '#ffffff' : '#000000',
    fontSize: 16,
    textAlign: 'center',
  }),
  bottomContainer: {
    flex: 3,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: (isDarkMode: boolean) => ({
    flex: 1,
    margin: 8,
    paddingVertical: 10,
    height: 90,
    borderRadius: 16,
    backgroundColor: isDarkMode ? '#444444' : '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }),
  selected: {
    backgroundColor: '#ffeaa7',
  },
  currencyButton: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 28,
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
  },
});

export default App;