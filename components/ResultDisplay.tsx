//結果顯示元件
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ResultDisplay: React.FC<{ text: string }> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transcribed Text:</Text>
      <Text>{text}</Text>
    </View>
  );
};

export default ResultDisplay;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});