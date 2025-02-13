import React from 'react';
import type { PropsWithChildren } from 'react';

import { View, Text, StyleSheet, useColorScheme } from 'react-native';

type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.flag}>{props.flag}</Text>
      <Text style={[styles.country, { color: isDarkMode ? '#FFFFFF' : '#2d3436' }]}>
        {props.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 28,
    color: '#FFFFFF', // Flag stays white in both modes
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: '#2d3436', // Default color for light mode
  },
});

export default CurrencyButton;
