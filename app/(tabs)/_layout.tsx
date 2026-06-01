import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <Image
              source={require("@/assets/images/home.svg")}
              style={styles.logo}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="markets"
        options={{
          title: "Markets",
          tabBarIcon: () => (
            <Image
              source={require("@/assets/images/markets.svg")}
              style={styles.logo}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="trade"
        options={{
          title: "Trade",
          tabBarIcon: () => (
            <Image
              source={require("@/assets/images/trade.svg")}
              style={styles.logo}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: () => (
            <Image
              source={require("@/assets/images/account.svg")}
              style={styles.logo}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: () => (
            <Image
              source={require("@/assets/images/more.svg")}
              style={styles.logo}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 28,
    width: 28,
  },
});
