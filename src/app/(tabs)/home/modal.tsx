import React from "react";
import { Modal, View, Text, Pressable, StyleSheet, ScrollView } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function SectionModal({ visible, title, onClose, children }: Props) {
  return (
    <Modal
  visible={visible}
  transparent
  animationType="fade"
  onRequestClose={onClose}
>
  <Pressable style={styles.backdrop} onPress={onClose}>
    <Pressable style={styles.modalCard} onPress={() => {}}>
      <Text style={styles.modalTitle}>{title}</Text>

    <ScrollView style={{ maxHeight: 400 }} contentContainerStyle={{ paddingBottom: 16 }}>
        {typeof children === "string" ? (
            <Text style={{ fontSize: 16, lineHeight: 22, opacity: 0.85 }}>{children}</Text>
        ) : (
            children
        )}
    </ScrollView>

      <Pressable style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>Close</Text>
      </Pressable>
    </Pressable>
  </Pressable>
</Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 18,
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  closeBtn: {
    marginTop: 14,
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "tan",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  closeText: {
    fontWeight: "600",
  },
});