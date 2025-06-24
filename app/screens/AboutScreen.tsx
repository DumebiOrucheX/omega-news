// app/screens/AboutScreen.tsx
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/Colors";

const AboutScreen: React.FC = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Omega News: The Ultimate News Experience</Text>
    <Text style={styles.text}>
      Welcome to Omega News, your all-in-one, cross-platform news app built with
      Expo, React Native, and NewsAPI. Stay informed with real-time headlines
      from around the world, tailored to your country and interests.
    </Text>
    <Text style={styles.sectionTitle}>Features</Text>
    <Text style={styles.text}>
      • Lightning-fast, modern UI with beautiful Spline Sans font and smooth
      navigation.
      {"\n"}• Instantly switch between countries and categories for a global
      perspective.
      {"\n"}• Powerful search to find news on any topic, person, or event.
      {"\n"}• Elegant cards, subtle gradients, and a premium feel on every
      device.
      {"\n"}• Built for iOS, Android, and Web – your news, anywhere.
    </Text>
    <Text style={styles.sectionTitle}>How It Works</Text>
    <Text style={styles.text}>
      Omega News fetches the latest headlines from NewsAPI.org, giving you
      access to trusted sources like BBC, CNN, Reuters, and more. Select your
      country, search for topics, and enjoy a seamless, ad-free reading
      experience.
    </Text>
    <Text style={styles.sectionTitle}>Why Omega?</Text>
    <Text style={styles.text}>
      • Open source, privacy-first, and always up to date.
      {"\n"}• Designed for speed, clarity, and delight.
      {"\n"}• The only news app you’ll ever need.
    </Text>
    <Text style={styles.sectionTitle}>App Information</Text>
    <Text style={styles.text}>
      Version: 1.0.0
      {"\n"}Developed by: Chukwudumebi Oruche
      {"\n"}Contact: +2348141772821
      {"\n"}Location: Imo, Nigeria
    </Text>
    <Text style={styles.credits}>
      Powered by NewsAPI.org | Built with Expo & React Native
    </Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 18,
    textAlign: "center",
    fontFamily: "SplineSans_700Bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.accent,
    marginTop: 18,
    marginBottom: 6,
    fontFamily: "SplineSans_700Bold",
  },
  text: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "SplineSans_400Regular",
  },
  credits: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginTop: 24,
    textAlign: "center",
    fontFamily: "SplineSans_400Regular",
  },
});

export default AboutScreen;