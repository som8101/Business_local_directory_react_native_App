import axios from 'axios';

export const axiosClient = axios.create({
  // baseURL: 'http://192.168.29.166:1337/api',
  baseURL: 'https://authentic-flowers-2a86df1d20.strapiapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_PROD_STRAPI_API_KEY}`,
  },
});