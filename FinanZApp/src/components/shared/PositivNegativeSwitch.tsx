import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors1} from '../../styles/color';

interface Props {
  isNegative: React.Dispatch<React.SetStateAction<boolean>>;
  rounded: 'full' | 'left';
  initialIsNegativ: boolean;
}
const PositivNegativeSwitch = ({
  isNegative,
  rounded,
  initialIsNegativ,
}: Props) => {
  const [negative, setNegative] = useState(initialIsNegativ);

  return (
    <View
      style={[
        styles.switch,
        rounded === 'full' ? styles.roundedSwitch : styles.roundedLeft,
      ]}>
      <TouchableOpacity
        onPress={() => {
          setNegative(false);
          isNegative(false);
        }}
        style={[styles.item, negative ? styles.inactive : styles.positive]}>
        <Icon name="plus" size={15} color="#c8cbd6" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setNegative(true);
          isNegative(true);
        }}
        style={[styles.item, negative ? styles.negative : styles.inactive]}>
        <Icon name="minus" size={15} color="#c8cbd6" />
      </TouchableOpacity>
    </View>
  );
};

export default PositivNegativeSwitch;

const styles = StyleSheet.create({
  switch: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: 90,
    minHeight: 40,
  },
  roundedSwitch: {
    borderRadius: 10,
  },
  roundedLeft: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  item: {
    width: 45,
    //height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  positive: {
    backgroundColor: Colors1.detail1,
  },
  negative: {
    backgroundColor: '#e94e4e',
  },
  inactive: {
    backgroundColor: '#58595b',
  },
});
