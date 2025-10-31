// app/lib/api/auth.ts
import { removeToken, saveToken } from '../storage/token';
import { api } from './client';

type User = { id: number; name: string; email: string };

export async function register(params: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<{ user: User; token: string }> {
  const { data } = await api.post('/api/register', params);
  await saveToken(data.token);
  return data;
}

export async function login(params: {
  email: string;
  password: string;
}): Promise<{ user: User; token: string }> {
  const { data } = await api.post('/api/login', params);
  await saveToken(data.token);
  return data;
}

export async function me(): Promise<User> {
  const { data } = await api.get('/api/me');
  return data;
}

export async function logout(): Promise<void> {
  try {
    await api.post('/api/logout');
  } finally {
    await removeToken();
  }
}
