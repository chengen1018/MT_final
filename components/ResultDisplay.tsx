//結果顯示元件
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultDisplay: React.FC<{ text: string }> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LLM 分析結果：</Text>
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