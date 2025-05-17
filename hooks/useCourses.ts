import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import type { Course } from '@/types/course';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await api.courses.getList();
      setCourses(data);
    } catch (err) {
      setError('خطا در دریافت دوره‌ها');
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, error, reload: loadCourses };
}

export function useCourse(id: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const data = await api.courses.getDetail(id);
      setCourse(data);
    } catch (err) {
      setError('خطا در دریافت دوره');
      console.error('Error loading course:', err);
    } finally {
      setLoading(false);
    }
  };

  return { course, loading, error, reload: loadCourse };
}