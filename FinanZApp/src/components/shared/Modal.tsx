import {
  Keyboard,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import {Colors1} from '../../styles/color';
import CloseModal from '../modals/helper/CloseModal';
import {globalStyles} from '../../styles/global';

interface Props {
  visible: boolean;
  onClose: CallableFunction;
  size: 'full' | 'half';
  children: ReactNode;
}
const CModal = ({visible, size, onClose, children}: Props) => {
  return (
    <Modal
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={() => onClose(false)}
      animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[size === 'full' ? styles.modalFull : styles.modalHalf]}>
          <CloseModal closeFunktion={() => onClose(false)} />
          <View style={globalStyles.modalContent}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CModal;

const styles = StyleSheet.create({
  modalHalf: {
    height: '70%',
    marginTop: 'auto',
    backgroundColor: Colors1.modal2,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalFull: {
    height: '97%',
    marginTop: 'auto',
    backgroundColor: Colors1.modal2,
  },
});
CModal.defaultProps = {
  size: 'full',
};
