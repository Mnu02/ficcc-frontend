import { Stack, ErrorBoundary } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export { ErrorBoundary };

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: Boolean(false),
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
