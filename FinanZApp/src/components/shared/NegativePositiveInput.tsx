import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import PositivNegativeSwitch from './PositivNegativeSwitch';
import CTextInput from './CTextInput';

interface Props {
  handleChange: (value: number) => void;
  value: number;
}
const NegativePositiveInput = ({handleChange, value}: Props) => {
  const [isNegative, setIsNegative] = React.useState(value < 0);
  const [amount, setAmount] = React.useState<number>(value);

  useEffect(() => {
    if (amount >= 0) {
      handleChange(isNegative ? -amount : amount);
    }
  }, [amount, handleChange, isNegative]);
  return (
    <View style={styles.wrapper}>
      <PositivNegativeSwitch
        initialIsNegativ={isNegative}
        rounded="left"
        isNegative={setIsNegative}
      />
      <CTextInput
        rounded="right"
        value={Math.abs(value).toString() || '0'}
        onChangeText={e => {
          setAmount(Number(e));
        }}
        placeholder={''}
        selectTextOnFocus={true}
        keyboardType={'default'}
      />
    </View>
  );
};

export default NegativePositiveInput;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    maxHeight: 50,
  },
});
