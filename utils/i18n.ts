import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support
const translations = {
  fa: {
    home: 'صفحه اصلی',
    courses: 'دوره‌ها',
    notifications: 'اعلان‌ها',
    profile: 'پروفایل کاربر',
    support: 'پشتیبانی',
    articles: 'مقالات',
    featuredCourses: 'دوره های آموزشی',
    seeMore: 'نمایش بیشتر',
    free: 'رایگان',
    toman: 'تومان',
    walletBalance: 'اعتبار کیف پول شما',
    increaseCredit: 'افزایش اعتبارکیف پول',
    transactionHistory: 'تراکنش های انجام شده',
    increaseInfo: 'اعتبار کیف پول خود را (برای خرید دوره بعدی) شارژ کنید',
    transactionsInfo: 'کلیه ی پرداخت های خود را در آن قسمت مشاهده کنید',
    contactSupport: 'تماس با پشتیبانی',
    appTutorial: 'آموزش استفاده از اپلیکیشن',
    sendMessage: 'ارسال پیام به پشتیبانی',
    search: 'جستجو',
    categoryAll: 'همه',
    articles: 'مقالات',
    readMore: 'ادامه مطلب',
    comments: 'نظرات',
    writeComment: 'نظر خود را بنویسید...',
    submit: 'ارسال',
    share: 'اشتراک‌گذاری',
    report: 'گزارش',
  },
};

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app
i18n.locale = 'fa';

// When a value is missing from a language it'll fall back to another language with the key present
i18n.enableFallback = true;

export default i18n;