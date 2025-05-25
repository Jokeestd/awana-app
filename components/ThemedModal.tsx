// components/ThemedModal.tsx
import { Modal, StyleSheet } from 'react-native';

import { ReactNode } from 'react';
import { ThemedView } from './ThemedView';

type ThemedModalProps = {
  visible: boolean;
  children: ReactNode;
  animationType?: 'slide' | 'fade' | 'none';
};

export const ThemedModal = ({ visible, children, animationType = 'slide' }: ThemedModalProps) => {

  return (
    <Modal visible={visible} transparent={true} animationType={animationType}>
        <ThemedView style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          {children}
        </ThemedView>
        </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
},
modalContent: {
    flex: 1,
    width: '93%',
    maxHeight: '85%',
    borderRadius: 16,
    padding: 20,
  },
});
