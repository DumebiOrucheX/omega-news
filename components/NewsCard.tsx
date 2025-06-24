// Card component to display a news article
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Article } from "../api/newsApi";
import { COLORS } from "../constants/Colors";

interface NewsCardProps {
  article: Article;
  onPress?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onPress }) => {
  if (!article || !article.title) return null;
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.92}
    >
      {article.urlToImage ? (
        <Image
          source={{ uri: article.urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        {article.source?.name ? (
          <Text style={styles.source}>{article.source.name}</Text>
        ) : null}
        <Text style={styles.date}>
          {new Date(article.publishedAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  placeholderImage: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.secondaryText,
    opacity: 0.08,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
    fontFamily: "SplineSans_700Bold",
  },
  source: {
    fontSize: 15,
    color: COLORS.accent,
    fontFamily: "SplineSans_400Regular",
    marginBottom: 2,
  },
  date: {
    fontSize: 13,
    color: COLORS.secondaryText,
    fontFamily: "SplineSans_400Regular",
  },
});

export default NewsCard;
