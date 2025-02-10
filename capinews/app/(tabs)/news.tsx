import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { ActivityIndicator, Card } from 'react-native-paper';

// Definir la estructura de un artículo de noticias
interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
}

// API Key de NewsAPI (coloca la tuya)
const API_KEY = '645f3620a1c64842919ca90db387646f';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;

const NewsScreen: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get<{ articles: Article[] }>(API_URL);
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error al obtener noticias:', error);
    } finally {
      setLoading(false);
    }
  };

  // Agregar el tipo a "item"
  const renderItem = ({ item }: { item: Article }) => (
    <Card style={{ margin: 10 }} onPress={() => Linking.openURL(item.url)}>
      <Card.Cover source={{ uri: item.urlToImage || 'https://via.placeholder.com/400' }} />
      <Card.Content>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
        <Text numberOfLines={3} style={{ marginTop: 5 }}>{item.description}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
      {loading ? <ActivityIndicator size="large" color="#6200ee" /> : 
        <FlatList 
          data={news} 
          renderItem={renderItem} 
          keyExtractor={(item, index) => index.toString()} 
        />
      }
    </View>
  );
};

export default NewsScreen;
