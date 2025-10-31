// app/lib/api/interceptor.ts
import { getToken } from '../storage/token';
import { api } from './client';

let setUp = false;

export function setupAuthInterceptor() {
  if (setUp) return;
  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  setUp = true;
}
