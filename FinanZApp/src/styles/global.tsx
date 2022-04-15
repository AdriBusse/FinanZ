import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
  },
  Input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
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
