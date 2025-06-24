// Card component to display a news article
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Article } from "../../api/newsApi";
import { COLORS } from "../constants/colors";

interface NewsCardProps {
  article: Article;
  onPress?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    {article.urlToImage ? (
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
    ) : null}
    <View style={styles.content}>
      <Text style={styles.title} numberOfLines={2}>
        {article.title}
      </Text>
      <Text style={styles.source}>{article.source.name}</Text>
      <Text style={styles.date}>
        {new Date(article.publishedAt).toLocaleDateString()}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 6,
  },
  source: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },
  date: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 4,
  },
});

export default NewsCard;
