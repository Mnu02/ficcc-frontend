import { View, Text, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 14, paddingBottom: 40 }}
        showsVerticalScrollIndicator
      >
      {/* Header */}
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 7 }}>
        Welcome
      </Text>

      {/* Main Tab */}
      <View style={{ padding: 60, borderColor: "tan", borderRadius: 12, borderWidth: 2, marginBottom: 60 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "saddlebrown" }}>To develop humble servants who will love the Lord, the lost and the local church for the rest of their lives.</Text>
      </View>

      {/* Sections */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 30, justifyContent: "space-between" }}>
        <View style={{  width: "48%" }}>
          <View style={{ height: 200, borderRadius: 12, borderColor: "tan", borderWidth: 2 }}
          />
          <Text style={{ marginTop: 10, textAlign: "center", fontSize: 18, fontWeight: "600" }}>Upcoming Sermon</Text>
          <Text style={{ textAlign: "center", opacity: 0.8 }}>Coming soon</Text>
        </View>


         <View style={{ width: "48%" }}>
          <View style={{ height: 200, borderRadius: 12, borderColor: "tan", borderWidth: 2 }}
          />
          <Text style={{ marginTop: 10, textAlign: "center", fontSize: 18, fontWeight: "600" }}>Discipleship Groups</Text>
          <Text style={{ textAlign: "center", marginTop: 6, opacity: 0.8 }}>Sundays at 11:30am</Text>
        </View>

         <View style={{  width: "48%" }}>
          <View style={{ height: 200, borderRadius: 12, borderColor: "tan", borderWidth: 2 }}
          />
          <Text style={{ marginTop: 10, textAlign: "center", fontSize: 18, fontWeight: "600" }}>Give to FICCC</Text>
          <Text style={{ textAlign: "center", marginTop: 6, opacity: 0.8 }}>Coming soon</Text>
        </View>

         <View style={{  width: "48%" }}>
          <View style={{ height: 200, borderRadius: 12, borderColor: "tan", borderWidth: 2 }}
          />
          <Text style={{ marginTop: 10, textAlign: "center", fontSize: 18, fontWeight: "600" }}>Weekly Newsletter</Text>
          <Text style={{ textAlign: "center", marginTop: 6, opacity: 0.8 }}>Coming soon</Text>
        </View>

         <View style={{  width: "48%" }}>
          <View style={{ height: 200, borderRadius: 12, borderColor: "tan", borderWidth: 2 }}
          />
          <Text style={{ marginTop: 10, textAlign: "center", fontSize: 18, fontWeight: "600" }}>Church Leaders</Text>
          <Text style={{ textAlign: "center", marginTop: 6, opacity: 0.8 }}>Coming soon</Text>
        </View>

         <View style={{  width: "48%" }}>
          <View style={{ height: 200, borderRadius: 12, borderColor: "tan", borderWidth: 2 }}
          />
          <Text style={{ marginTop: 10, textAlign: "center", fontSize: 18, fontWeight: "600" }}>Announcements</Text>
          <Text style={{ textAlign: "center", marginTop: 6, opacity: 0.8 }}>Coming soon</Text>
        </View>
      </View>
    </ScrollView>
     </View>
  );
}
