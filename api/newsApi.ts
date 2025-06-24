// Handles all NewsAPI requests for the app
// Use @env for native, expo-constants for web
import { Platform } from 'react-native';

let API_KEY = '';

if (Platform.OS === 'web') {
  // Web: use expo-constants and app.json extra
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Constants = require('expo-constants').default;
  API_KEY = Constants?.expoConfig?.extra?.EXPO_NEWS_API_KEY || '';
} else {
  // Native: use @env
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    API_KEY = require('@env').EXPO_NEWS_API_KEY || '';
  } catch (e) {
    API_KEY = '';
  }
}

const BASE_URL = 'https://newsapi.org/v2';

export interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

// Fetch top headlines for a given country (default: Nigeria)
export async function fetchTopHeadlines(country: string = 'us'): Promise<NewsResponse> {
  // If not US, fallback to 'everything' endpoint for more results
  if (country !== 'us') {
    // Use the country name as a query for everything endpoint
    return fetchEverything(country);
  }
  const url = `${BASE_URL}/top-headlines?country=${country}&apiKey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

// Fetch everything by query (optional, for search)
export async function fetchEverything(query: string): Promise<NewsResponse> {
  const today = new Date().toISOString().split('T')[0];
  const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&from=${today}&sortBy=popularity&apiKey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}
