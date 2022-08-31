import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CText from './CText';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { Colors1 } from '../../styles/color';

interface Props {
  setDate: (date: Date) => void;
  date: Date;
}
const DateSelect = ({ setDate, date }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={d => {
          setOpen(false);
          setDate(d);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <CText>Date:</CText>
      <TouchableOpacity style={styles.date} onPress={() => setOpen(true)}>
        <CText style={styles.dateText}>
          {moment(date).format('DD MMM, YY')}
        </CText>
      </TouchableOpacity>
    </>
  );
};

export default DateSelect;

const styles = StyleSheet.create({
  date: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 26,
    borderColor: Colors1.primary,
    backgroundColor: 'transparent',
  },
  dateText: {
    fontSize: 18,
    color: Colors1.secondaryText,
  },
});
