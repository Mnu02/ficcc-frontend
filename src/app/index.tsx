import { Redirect } from "expo-router";

export default function Index() {
  // Redirect root path to the tabs' home screen
  return <Redirect href="/(tabs)/home" />;
}
