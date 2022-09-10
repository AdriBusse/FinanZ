import { StyleSheet } from 'react-native';
import { Colors1 } from './color';

export const globalStyles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 42,
    flex: 1,
  },
  modalContent: {
    flex: 1,
  },
  modal: {
    height: '70%',
    marginTop: 'auto',
    backgroundColor: Colors1.modal2,
    borderRadius: 20,
  },
  modalFull: {
    height: '100%',
    marginTop: 'auto',
    backgroundColor: Colors1.modal2,
    borderRadius: 20,
  },
  Input: {
    borderWidth: 1,
    borderColor: Colors1.primary,
    backgroundColor: Colors1.modal2,
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    color: Colors1.primaryText,
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
  scroll: {
    overflow: 'scroll',
  },
  marginRightAuto: {
    marginRight: 'auto',
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
