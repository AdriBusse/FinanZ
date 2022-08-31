/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CButton from '../components/shared/CButton';
import NegativePositiveInput from '../components/shared/NegativePositiveInput';
import PositivNegativeSwitch from '../components/shared/PositivNegativeSwitch';
import CTextInput from '../components/shared/CTextInput';
import { Colors1 } from '../styles/color';
import { globalStyles } from '../styles/global';

export default function Home(props: {
  navigation: { navigate: (arg0: string) => any };
}) {
  useIsFocused();
  const changeToTagesgeld = () => {
    props.navigation.navigate('Sparen');
  };
  // changeToTagesgeld();
  const [isNegative, setIsNegative] = React.useState(false);
  const [amount, setAmount] = React.useState<number>(0);
  console.log(amount);

  return (
    <View style={globalStyles.container}>
      <CButton title={'Zum Konto'} onPress={changeToTagesgeld} />

      <NegativePositiveInput value={amount} handleChange={setAmount} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
});
