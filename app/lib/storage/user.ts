// src/storage/user.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

/** KEYS */
const KEY = 'auth_user';
const LOC_KEY = 'user_location';

/** Tipos */
export type AuthUser = { id: number; name: string; email: string };
export type SavedLocation = { city?: string; region?: string; country?: string };

/** ---------------------- USER: guardar / leer / borrar ---------------------- */
export async function saveUser(user: AuthUser) {
  await AsyncStorage.setItem(KEY, JSON.stringify(user));
}

export async function getUser(): Promise<AuthUser | null> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function removeUser() {
  await AsyncStorage.removeItem(KEY);
}

/** Helpers convenientes (opcionales) */
export async function getUserName(): Promise<string | null> {
  const u = await getUser();
  return u?.name ?? null;
}

export async function setUserName(name: string) {
  const u = await getUser();
  if (!u) return;
  await saveUser({ ...u, name });
}

/** ----------------------------- LOCATION CACHE ------------------------------ */
export async function saveLocation(loc: SavedLocation) {
  await AsyncStorage.setItem(LOC_KEY, JSON.stringify(loc));
}

export async function getSavedLocation(): Promise<SavedLocation | null> {
  const raw = await AsyncStorage.getItem(LOC_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function clearLocation() {
  await AsyncStorage.removeItem(LOC_KEY);
}

/** ------------------------------- FORMATEO ---------------------------------- */
export function formatName(n?: string) {
  if (!n) return '';
  return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
}
