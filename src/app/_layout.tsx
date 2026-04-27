import { Stack, ErrorBoundary } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Colors from "@/constants/colors";

export { ErrorBoundary };

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: Boolean(false),
        }}
      >
        <Stack.Screen name="(tabs)" options={{ title: "" }} />
        <Stack.Screen
          name="event/[id]"
          options={{
            headerShown: true,
            headerBackTitle: "",
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.text,
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "600",
            },
          }}
        />
        <Stack.Screen
          name="video/[id]"
          options={{
            headerShown: true,
            headerBackTitle: "",
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.text,
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "600",
            },
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
