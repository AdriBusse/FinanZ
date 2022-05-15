import {StyleSheet} from 'react-native';
import {Colors} from './color';

export const globalStyles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  modalContent: {
    flex: 1,
  },
  modal: {
    height: '70%',
    marginTop: 'auto',
    backgroundColor: Colors.modal2,
    borderRadius: 20,
  },
  Input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.modal2,
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    color: Colors.primaryText,
    marginBottom: 10,
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    borderRadius: 6,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  transCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
