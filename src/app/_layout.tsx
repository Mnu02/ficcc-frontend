import { Stack, ErrorBoundary } from "expo-router";

export { ErrorBoundary };

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: Boolean(false),
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
