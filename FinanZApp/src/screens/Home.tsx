/* eslint-disable @typescript-eslint/no-unused-vars */
import {useQuery} from '@apollo/client';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/shared/Button';
import CTextInput from '../components/shared/TextInput';
import {Colors1} from '../styles/color';
import {globalStyles} from '../styles/global';

export default function Home(props: {
  navigation: {navigate: (arg0: string) => any};
}) {
  useIsFocused();
  console.log('render');
  const changeToTagesgeld = () => {
    props.navigation.navigate('Sparen');
  };
  // changeToTagesgeld();
  const [text, settext] = React.useState('');
  return (
    <View>
      <CustomButton title={'Zum Konto'} onPress={changeToTagesgeld} />
      <CTextInput
        value={text}
        onChangeText={settext}
        placeholder={'custom placeholder'}
        selectTextOnFocus={false}
        keyboardType={'default'}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
});
