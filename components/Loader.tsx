// Simple loading spinner
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/Colors";

const Loader: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
