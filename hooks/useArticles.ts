import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import type { Article } from '@/types/article';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await api.articles.getList();
      setArticles(data);
    } catch (err) {
      setError('خطا در دریافت مقالات');
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  return { articles, loading, error, reload: loadArticles };
}

export function useArticle(id: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const data = await api.articles.getDetail(id);
      setArticle(data);
    } catch (err) {
      setError('خطا در دریافت مقاله');
      console.error('Error loading article:', err);
    } finally {
      setLoading(false);
    }
  };

  return { article, loading, error, reload: loadArticle };
}