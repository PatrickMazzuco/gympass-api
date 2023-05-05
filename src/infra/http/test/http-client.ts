import { env } from '@/main/config/env';
import axios, { type CreateAxiosDefaults } from 'axios';

const { HOST, PORT, API_PREFIX } = env;
const axiosConfig: CreateAxiosDefaults = {
  baseURL: `http://${HOST}:${PORT}${API_PREFIX}`,
  validateStatus: (_) => true,
};

export const testHttpClient = axios.create(axiosConfig);
