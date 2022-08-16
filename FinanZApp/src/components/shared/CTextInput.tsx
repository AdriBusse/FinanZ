import {StyleSheet} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import {Colors1} from '../../styles/color';

interface Props {
  value: string;
  onChangeText: (e: string) => void;
  placeholder: string;
  onBlur?: CallableFunction;
  onFocus?: CallableFunction;
  selectTextOnFocus: boolean;
  keyboardType:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  rounded?: 'right' | 'full';
}
const CTextInput = ({
  value,
  onChangeText,
  placeholder,
  selectTextOnFocus,
  keyboardType,
  onBlur,
  onFocus,
  rounded,
}: Props) => {
  //onst [borderColor, setBorderColor] = React.useState();
  const [isFocus, setIsFocus] = React.useState(false);

  const handleTextChange = (text: string) => {
    onChangeText(text);
  };
  return (
    <TextInput
      style={[
        styles.input,
        !isFocus ? styles.normalBorder : styles.focusBorder,
        rounded === 'right' ? styles.roundedRight : styles.roundedFull,
      ]}
      placeholder={placeholder}
      selectTextOnFocus={selectTextOnFocus}
      keyboardType={keyboardType}
      placeholderTextColor={Colors1.secondaryText}
      onFocus={() => {
        setIsFocus(true);
        if (onFocus) {
          onFocus();
        }
      }}
      onBlur={() => {
        setIsFocus(false);

        if (onBlur) {
          onBlur();
        }
      }}
      value={value}
      onChangeText={handleTextChange}
    />
  );
};

export default CTextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: Colors1.modal2,
    fontSize: 18,
    color: Colors1.primaryText,
    //minWidth: '100%',
    //marginBottom: 10,
  },
  roundedFull: {
    borderRadius: 6,
  },
  roundedRight: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  normalBorder: {
    borderColor: Colors1.primary,
  },
  focusBorder: {
    borderColor: Colors1.detail1,
  },
});
