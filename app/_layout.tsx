import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppHeader from '@/components/ui/AppHeader';
import { useColorScheme } from '@/hooks/useColorScheme';

// 👇 Contexto de autenticación (paso 3)
import { AuthProvider, useAuth } from './context/AuthProvider';

function RootLayoutInner() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // lee usuario actual desde el contexto
  const { user, loading } = useAuth();

  if (!loaded || loading) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          // Header personalizado por defecto (todas las screens excepto donde lo ocultamos)
          header: () => (
            <AppHeader
              userName={(user?.name ?? 'Invitado').toUpperCase()}
              onPressSearch={() => {
                /* TODO: router.push('/search') */
              }}
              onPressFilter={() => {
                /* TODO: abrir filtros */
              }}
              onPressProfile={() => {
                /* TODO: router.push('/profile/profile') */
              }}
            />
          ),
        }}
      >
        {/* Auth: sin header */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/register" options={{ headerShown: false }} />

        {/* Otras sin header */}
        <Stack.Screen name="settings/settings" options={{ headerShown: false }} />
        <Stack.Screen name="profile/profile" options={{ headerShown: false }} />

        {/* Resto: usan AppHeader */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="events/[id]" options={{ title: 'Detalles del Evento' }} />
        {/* <Stack.Screen name="descubre/[id]" /> */}

        <Stack.Screen name="+not-found" />
      </Stack>

      {/* Status bar clara para combinar con tu AppHeader (ajusta si usas tema claro) */}
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  // SafeAreaProvider para que el AppHeader respete la muesca/notch
  // AuthProvider expone user/token globalmente
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutInner />
      </AuthProvider>
    </SafeAreaProvider>
  );
}