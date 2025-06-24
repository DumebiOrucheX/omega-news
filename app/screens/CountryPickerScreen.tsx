// app/screens/CountryPickerScreen.tsx
// Allows user to select a country for news headlines
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/Colors";

const COUNTRIES = [
  { code: "ng", name: "Nigeria" },
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "fr", name: "France" },
  { code: "de", name: "Germany" },
  { code: "jp", name: "Japan" },
  { code: "in", name: "India" },
  // Add more as needed
];

const CountryPickerScreen: React.FC<{ onSelect?: (code: string) => void }> = ({
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Country</Text>
      <FlatList
        data={COUNTRIES}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onSelect?.(item.code)}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: COLORS.text,
  },
  item: {
    padding: 16,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  text: {
    fontSize: 16,
    color: COLORS.text,
  },
});

export default CountryPickerScreen;
