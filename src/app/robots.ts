import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/detail/', '/login', '/signup'],
      disallow: [
        '/mypage',
        '/payment',
        '/mylearning',
        '/play',
        '/admin',
        '/creator',
      ],
    },
    sitemap: 'https://learnflow.shop/sitemap.xml',
  };
}
