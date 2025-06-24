import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { PaperProvider } from "react-native-paper";
import { CountryProvider } from "./CountryContext";

const tabIcons = [
  { name: "index", icon: Feather, iconName: "home", label: "Home" },
  {
    name: "countries",
    icon: MaterialCommunityIcons,
    iconName: "earth",
    label: "Countries",
  },
  { name: "search", icon: Feather, iconName: "search", label: "Search" },
  {
    name: "about",
    icon: Ionicons,
    iconName: "information-circle-outline",
    label: "About",
  },
];

export default function RootLayout() {
  return (
    <CountryProvider>
      <PaperProvider>
        <Tabs
          
          screenOptions={({ route }) => {
            const tab = tabIcons.find((t) => t.name === route.name);
            return {
              headerShown: false,
              tabBarShowLabel: true,
              tabBarLabel: ({ color, focused }) =>
                tab ? (
                  <Text
                    style={{
                      fontSize: 12,
                      color: focused ? "#2563eb" : "#64748b",
                      marginTop: 2,
                      fontWeight: focused ? "bold" : "normal",
                      textAlign: "center",
                    }}
                  >
                    {tab.label}
                  </Text>
                ) : null,
              tabBarIcon: ({ color, focused }) => {
                if (!tab) return null;
                const IconComponent = tab.icon;
                return (
                  <IconComponent
                    name={tab.iconName as any}
                    size={26}
                    color={focused ? "#2563eb" : "#64748b"}
                    style={{
                      backgroundColor: focused ? "#e0e7ff" : "transparent",
                      borderRadius: 16,
                      padding: 6,
                    }}
                  />
                );
              },
              tabBarActiveTintColor: "#2563eb",
              tabBarInactiveTintColor: "#64748b",
              tabBarStyle: {
                backgroundColor: "#fff",
                borderTopWidth: 0.5,
                borderColor: "#e5e7eb",
                height: 60,
                flexDirection: "row",
              },
              tabBarItemStyle: {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "25%",
                maxWidth: "25%",
                minWidth: "25%",
              },
            };
          }}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="countries" />
          <Tabs.Screen name="search" />
          <Tabs.Screen name="about" />
        </Tabs>
      </PaperProvider>
    </CountryProvider>
  );
}
