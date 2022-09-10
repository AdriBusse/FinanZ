import { StyleSheet, View } from 'react-native';
import React from 'react';
import CText from '../shared/CText';
import CButton from '../shared/CButton';
import { Colors1 } from '../../styles/color';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  heading: string;
  subHeading: string;
  createNew?: CallableFunction;
}
const EmptyList = ({ createNew, heading, subHeading }: Props) => {
  return (
    <View
      style={{
        marginTop: 30,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
      }}>
      <Icon name="info" color={Colors1.secondaryText} size={64} />

      <CText
        heading
        style={{
          color: Colors1.secondaryText,
          marginBottom: 20,
          marginTop: 20,
        }}>
        {heading}
      </CText>
      <CText style={{ color: Colors1.secondaryText, marginBottom: 20 }}>
        {subHeading}
      </CText>
      {createNew && (
        <CButton outline title={'Create'} onPress={() => createNew()} />
      )}
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({});
