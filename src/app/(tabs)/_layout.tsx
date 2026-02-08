import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import Colors from "@/constants/colors";

const Logo = require("../../assets/logo.png");

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.text,
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {                                                                                                                         
          fontSize: 18,                                                      
          fontWeight: "600",                                                                                                                        
        },
        headerLeft: () => (
          <Image
            source={Logo}
            style={{ height: 54, width: 40, marginLeft: 16 }}
            resizeMode="contain"
          />
        ),
        tabBarActiveTintColor: Colors.tintActive,
        tabBarInactiveTintColor: Colors.tintInactive,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          headerTitle: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bible/index"
        options={{
          title: "Bible",
          headerTitle: "Bible",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events/index"
        options={{
          title: "Events",
          headerTitle: "Events",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="media/index"
        options={{
          title: "Media",
          headerTitle: "Media",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="info/info"
        options={{
          title: "Info",
          headerTitle: "Info",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
