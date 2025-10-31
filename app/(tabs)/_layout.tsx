import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import GradientTabBarBackground from '@/components/ui/GradientTabBarBackground';

const icons = {
  inicio: require('../../assets/icons_menu/inicio.png'),
  descubre: require('../../assets/icons_menu/descubre.png'),
  eventos: require('../../assets/icons_menu/eventos.png'),
  rutas: require('../../assets/icons_menu/rutas.png'),
  experiencias: require('../../assets/icons_menu/experiencia.png'),
  info: require('../../assets/icons_menu/info.png'),
  search: require('../../assets/images/lupa_2.png'), // ícono si lo necesitas en algún momento
} as const;

function TabIcon({ src }: { src: any }) {
  return (
    <Image
      source={src}
      style={{ width: 26, height: 26, tintColor: '#FFFFFF' }}
      resizeMode="contain"
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <GradientTabBarBackground />,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute', backgroundColor: 'transparent' },
          default: { backgroundColor: 'transparent' },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: 'Inicio', tabBarIcon: () => <TabIcon src={icons.inicio} /> }}
      />
      <Tabs.Screen
        name="descubre"
        options={{ title: 'Descubre', tabBarIcon: () => <TabIcon src={icons.descubre} /> }}
      />
      <Tabs.Screen
        name="eventos"
        options={{ title: 'Eventos', tabBarIcon: () => <TabIcon src={icons.eventos} /> }}
      />
      <Tabs.Screen
        name="rutas"
        options={{ title: 'Rutas', tabBarIcon: () => <TabIcon src={icons.rutas} /> }}
      />
      <Tabs.Screen
        name="experiencias"
        options={{ title: 'Experiencias', tabBarIcon: () => <TabIcon src={icons.experiencias} /> }}
      />
      <Tabs.Screen
        name="info"
        options={{ title: 'Info', tabBarIcon: () => <TabIcon src={icons.info} /> }}
      />

      {/* 👇 Ruta "search" DENTRO de (tabs), pero oculta del tab bar */}
      <Tabs.Screen
        name="search"
        options={{
          href: null,          // oculta del tab bar
          headerShown: false,  // opcional, consistente con el resto
        }}
      />
    </Tabs>
  );
}
