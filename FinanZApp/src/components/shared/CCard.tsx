import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors1} from '../../styles/color';

export default function CCard(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    backgroundColor: Colors1.lighter,
    marginHorizontal: 2,
    marginVertical: 5,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
});
