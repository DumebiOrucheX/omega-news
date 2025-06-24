import Loader from "@/components/Loader";
import NewsCard from "@/components/NewsCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Article, fetchEverything } from "../api/newsApi";
import { COLORS } from "../constants/Colors";
import { getNewsCacheKey } from "./utils/cacheKeys";

export default function Search() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEverything(query);
      setArticles(data.articles);
      if (data.articles && data.articles.length > 0) {
        await AsyncStorage.setItem(
          getNewsCacheKey(query),
          JSON.stringify(data.articles)
        );
      } else {
        setError("No results found.");
      }
    } catch (e) {
      // Try to load cached search results
      const cached = await AsyncStorage.getItem(getNewsCacheKey(query));
      if (cached) {
        setArticles(JSON.parse(cached));
        setError("Showing cached results. Connect to the internet for latest.");
      } else {
        setArticles([]);
        setError("Failed to fetch news. Try again.");
      }
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search News</Text>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Type a keyword..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={onSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.button} onPress={onSearch}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loader />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => <NewsCard article={item} />}
          contentContainerStyle={{ padding: 8, paddingBottom: 32 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 32,
    paddingHorizontal: 0,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
    marginLeft: 18,
    fontFamily: "SplineSans_700Bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: COLORS.text,
    fontFamily: "SplineSans_400Regular",
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "#e11d48",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
    fontFamily: "SplineSans_400Regular",
  },
});
