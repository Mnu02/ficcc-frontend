import React from "react";
import { View, Text, Pressable, StyleSheet, Linking, Alert } from "react-native";

/**
 * Donation methods for the "Give to FICCC" page.
 *
 * Backend / real destinations are stubbed for now — fill in `url` (or replace
 * the onPress in DONATE_METHODS) when the accounts are ready:
 *   - PayPal:  a paypal.me link or hosted donate URL
 *   - Cash App: https://cash.app/$YourCashtag
 *   - Zelle:   usually has no link; typically shows an email/phone to send to
 */
type DonateMethod = {
  key: string;
  label: string;
  color: string;
  url?: string;
};

const DONATE_METHODS: DonateMethod[] = [
  { key: "paypal", label: "Give with PayPal", color: "#0070BA", url: undefined },
  { key: "cashapp", label: "Give with Cash App", color: "#00C244", url: undefined },
  { key: "zelle", label: "Give with Zelle", color: "#6D1ED4", url: undefined },
];

async function handlePress(method: DonateMethod) {
  if (!method.url) {
    // TODO: hook up real destination for `${method.key}`
    Alert.alert(method.label, "Coming soon");
    return;
  }
  try {
    await Linking.openURL(method.url);
  } catch {
    Alert.alert("Unable to open", "Please try again later.");
  }
}

export default function DonateButtons() {
  return (
    <View style={styles.container}>
      {DONATE_METHODS.map((method) => (
        <Pressable
          key={method.key}
          onPress={() => handlePress(method)}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: method.color },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{method.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 12,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
