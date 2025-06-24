// Displays top headlines and allows country selection
import Loader from "@/components/Loader";
import NewsCard from "@/components/NewsCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Article, fetchTopHeadlines } from "../../api/newsApi";
import { COLORS } from "../../constants/Colors";
import { useCountry } from "../CountryContext";
import { getNewsCacheKey } from "../utils/cacheKeys";

const HomeScreen: React.FC = () => {
  const { country } = useCountry();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTopHeadlines(country);
      setArticles(data.articles);
      if (data.articles && data.articles.length > 0) {
        // Cache the news for offline use
        await AsyncStorage.setItem(
          getNewsCacheKey(country),
          JSON.stringify(data.articles)
        );
      } else {
        setError("No news found. Try again later.");
      }
    } catch (e) {
      // Try to load cached news
      const cached = await AsyncStorage.getItem(getNewsCacheKey(country));
      if (cached) {
        setArticles(JSON.parse(cached));
        setError("Showing cached news. Connect to the internet for latest.");
      } else {
        setArticles([]);
        setError("Failed to fetch news. Check your internet or API key.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, [country]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/partial-react-logo.png")}
      style={styles.bg}
      imageStyle={{ opacity: 0.04, resizeMode: "cover" }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Top Headlines</Text>
        {loading ? (
          <Loader />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList
            data={articles}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => <NewsCard article={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ padding: 8, paddingBottom: 32 }}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 0,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
    marginLeft: 18,
    fontFamily: "SplineSans_700Bold",
  },
  error: {
    color: "#e11d48",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
    fontFamily: "SplineSans_400Regular",
  },
});

export default HomeScreen;
