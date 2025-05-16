import { Course, Category, User, Transaction } from '../types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'پادکست‌ها', icon: 'mic' },
  { id: '2', name: 'فایل‌ها', icon: 'file-text' },
  { id: '3', name: 'علاقه‌مندی‌ها', icon: 'bookmark' },
  { id: '4', name: 'ویدیوها', icon: 'video' },
  { id: '5', name: 'پخش‌زنده', icon: 'tv' },
];

export const FEATURED_COURSES: Course[] = [
  {
    id: '1',
    title: 'دوره آنلاین جامع بیزینس کوچینگ',
    instructor: 'محمد رضایی',
    thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 0,
    isFree: true,
    category: 'بیزینس',
    rating: 4.8,
    totalStudents: 1200,
    featured: true,
  },
  {
    id: '2',
    title: 'بیزینس کوچینگ علم نوین پولسازی',
    instructor: 'سارا احمدی',
    thumbnail: 'https://images.pexels.com/photos/5965841/pexels-photo-5965841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 5000000,
    isFree: false,
    category: 'بیزینس',
    rating: 4.9,
    totalStudents: 890,
    featured: true,
  },
  {
    id: '3',
    title: 'نقشه راه تریدرها در بازار فارکس',
    instructor: 'علی محمدی',
    thumbnail: 'https://images.pexels.com/photos/6770609/pexels-photo-6770609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 3500000,
    isFree: false,
    category: 'فارکس',
    rating: 4.7,
    totalStudents: 560,
    featured: true,
  }
];

export const COURSES: Course[] = [
  ...FEATURED_COURSES,
  {
    id: '4',
    title: 'بیزینس جامع',
    instructor: 'حامد شریفی',
    thumbnail: 'https://images.pexels.com/photos/7654118/pexels-photo-7654118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 0,
    isFree: true,
    category: 'بیزینس',
    rating: 4.5,
    totalStudents: 750,
  },
  {
    id: '5',
    title: 'ستون های خانه کسب و کار',
    instructor: 'زهرا کریمی',
    thumbnail: 'https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 0,
    isFree: true,
    category: 'بیزینس',
    rating: 4.6,
    totalStudents: 430,
  },
  {
    id: '6',
    title: 'دوره پایه بیزینس کوچینگ',
    instructor: 'محمد رضایی',
    thumbnail: 'https://images.pexels.com/photos/7876203/pexels-photo-7876203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 0,
    isFree: true,
    category: 'بیزینس',
    rating: 4.4,
    totalStudents: 980,
  },
  {
    id: '7',
    title: 'دوره جامع بیزینس کوچینگ',
    instructor: 'محمد رضایی',
    thumbnail: 'https://images.pexels.com/photos/6347720/pexels-photo-6347720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 2500000,
    isFree: false,
    category: 'بیزینس',
    rating: 4.9,
    totalStudents: 1450,
  }
];

export const ARTICLES = [
  {
    id: '1',
    title: 'روش های نوین معامله در بازارهای مالی',
    author: 'سعید رضایی',
    thumbnail: 'https://images.pexels.com/photos/6781600/pexels-photo-6781600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '۱۸ اردیبهشت ۱۴۰۴',
    readTime: '۵ دقیقه',
  },
  {
    id: '2',
    title: 'چگونه یک ترید منظم داشته باشیم؟',
    author: 'مینا احمدی',
    thumbnail: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '۱۲ اردیبهشت ۱۴۰۴',
    readTime: '۷ دقیقه',
  }
];

export const USER: User = {
  id: '1',
  name: 'محمد صالحی',
  phoneNumber: '09352554850',
  avatar: null,
  walletBalance: 1000,
};

export const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    amount: 1000,
    date: '۱۵ اردیبهشت ۱۴۰۴',
    description: 'شارژ کیف پول',
    type: 'credit',
  },
  {
    id: '2',
    amount: 5000000,
    date: '۱۰ اردیبهشت ۱۴۰۴',
    description: 'خرید دوره بیزینس کوچینگ علم نوین پولسازی',
    type: 'debit',
  }
];