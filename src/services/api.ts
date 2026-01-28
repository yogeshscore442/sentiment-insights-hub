import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Review {
  id: string;
  productId: string;
  productName: string;
  platform: 'amazon' | 'flipkart';
  reviewerName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  helpful: number;
}

export interface SentimentStats {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
  averageRating: number;
}

export interface TrendData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface WordFrequency {
  word: string;
  count: number;
}

export interface ProductSearchResult {
  id: string;
  name: string;
  platform: 'amazon' | 'flipkart';
  image: string;
  price: string;
  rating: number;
  reviewCount: number;
}

export const api = {
  searchProducts: async (query: string, platform?: string): Promise<ProductSearchResult[]> => {
    try {
      const response = await apiClient.get('/products/search', {
        params: { query, platform },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  getReviews: async (productId: string, filters?: {
    sentiment?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<{ reviews: Review[]; total: number }> => {
    try {
      const response = await apiClient.get(`/reviews/${productId}`, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  getSentimentStats: async (productId: string): Promise<SentimentStats> => {
    try {
      const response = await apiClient.get(`/analytics/sentiment/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sentiment stats:', error);
      throw error;
    }
  },

  getTrendData: async (productId: string, days?: number): Promise<TrendData[]> => {
    try {
      const response = await apiClient.get(`/analytics/trends/${productId}`, {
        params: { days },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trend data:', error);
      throw error;
    }
  },

  getWordFrequency: async (productId: string, sentiment?: string): Promise<WordFrequency[]> => {
    try {
      const response = await apiClient.get(`/analytics/words/${productId}`, {
        params: { sentiment },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching word frequency:', error);
      throw error;
    }
  },

  scrapeReviews: async (productUrl: string, platform: 'amazon' | 'flipkart'): Promise<{ jobId: string }> => {
    try {
      const response = await apiClient.post('/scrape', {
        url: productUrl,
        platform,
      });
      return response.data;
    } catch (error) {
      console.error('Error initiating scrape:', error);
      throw error;
    }
  },
};

export default api;