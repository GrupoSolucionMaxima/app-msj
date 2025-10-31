// app/(tabs)/settings.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthProvider';

export const options = { headerShown: false };

type Item = {
  id: string;
  title: string;
  icon?: ImageSourcePropType; // icono a la derecha (opcional)
  route?: string; // ruta de navegación (opcional)
  isDestructive?: boolean; // para estilos (Logout)
  onPress?: () => void; // acción directa (Logout)
};

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [loggingOut, setLoggingOut] = useState(false);

  const t = {
    activities: lang === 'es' ? 'Actividades En San José' : 'Activities in San José',
    privacy: lang === 'es' ? 'Privacidad' : 'Privacy',
    discover: lang === 'es' ? 'Descubre' : 'Discover',
    events: lang === 'es' ? 'Eventos' : 'Events',
    routes: lang === 'es' ? 'Rutas' : 'Routes',
    experiences: lang === 'es' ? 'Experiencia' : 'Experiences',
    travelerInfo: lang === 'es' ? 'Información Del Viajero' : 'Traveler Info',
    services: lang === 'es' ? 'Servicios Al Turista' : 'Tourist Services',
    language: lang === 'es' ? 'Idioma' : 'Language',
    spanish: lang === 'es' ? 'Español' : 'Spanish',
    english: 'English',
    logout: lang === 'es' ? 'Cerrar sesión' : 'Log out',
    logoutAskTitle: lang === 'es' ? 'Cerrar sesión' : 'Log out',
    logoutAskMsg: lang === 'es' ? '¿Seguro que quieres salir?' : 'Are you sure you want to log out?',
    cancel: lang === 'es' ? 'Cancelar' : 'Cancel',
    confirm: lang === 'es' ? 'Salir' : 'Log out',
  };

  const toggleLang = () => setLang((p) => (p === 'es' ? 'en' : 'es'));

  const handleLogout = () => {
    Alert.alert(t.logoutAskTitle, t.logoutAskMsg, [
      { text: t.cancel, style: 'cancel' },
      {
        text: t.confirm,
        style: 'destructive',
        onPress: async () => {
          try {
            setLoggingOut(true);
            await signOut();                 // limpia token + user
            router.replace('/auth/login');   // vuelve a login
          } catch {
            setLoggingOut(false);
          }
        },
      },
    ]);
  };

  const items: Item[] = [
    { id: 'a', title: t.activities, route: '/(tabs)/home', icon: require('../../assets/icons_menu/actividad.png') },
    { id: 'b', title: t.privacy, route: 'settings/privacidad', icon: require('../../assets/icons_menu/privacidad.png') },
    { id: 'c', title: t.discover, route: '/(tabs)/descubre', icon: require('../../assets/icons_menu/descubre.png') },
    { id: 'd', title: t.events, route: '/(tabs)/eventos', icon: require('../../assets/icons_menu/eventos.png') },
    { id: 'e', title: t.routes, route: '/(tabs)/rutas', icon: require('../../assets/icons_menu/rutas.png') },
    { id: 'f', title: t.experiences, route: '/(tabs)/experiencias', icon: require('../../assets/icons_menu/experiencia-2.png') },
    { id: 'g', title: t.travelerInfo, route: '/(tabs)/info', icon: require('../../assets/icons_menu/info.png') },
    { id: 'h', title: t.services, route: '/services', icon: require('../../assets/icons_menu/rutas.png') },
    // Separador visual lo puedes dejar con marginTop antes del destructivo
    { id: 'z', title: t.logout, isDestructive: true, onPress: handleLogout },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header: logo + cerrar */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo_san_jose_main.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
          accessibilityLabel={lang === 'es' ? 'Cerrar' : 'Close'}
        >
          <Text style={styles.close}>×</Text>
        </Pressable>
      </View>

      <View style={styles.divider} />

      {/* Idioma */}
      <View style={styles.rowLang}>
        <Text style={styles.langLabel}>{t.language}</Text>
        <Pressable
          onPress={toggleLang}
          hitSlop={8}
          android_ripple={{ color: 'rgba(0,0,0,0.06)', borderless: true }}
          style={({ pressed }) => pressed && { opacity: 0.7 }}
        >
          <Text style={styles.langValue}>{lang === 'es' ? t.spanish : t.english}</Text>
        </Pressable>
      </View>

      <View style={styles.divider} />

      {/* Lista de opciones */}
      <View style={{ paddingHorizontal: 20 }}>
        {items.map((it, idx) => {
          const isLogout = it.isDestructive;
          return (
            <View key={it.id} style={isLogout ? { marginTop: 14 } : undefined}>
              <Pressable
                disabled={loggingOut && isLogout}
                onPress={() => (it.onPress ? it.onPress() : it.route && router.push(it.route as any))}
                android_ripple={{ color: isLogout ? 'rgba(220,38,38,0.08)' : 'rgba(0,0,0,0.06)' }}
                style={({ pressed }) => [
                  styles.item,
                  pressed && { opacity: 0.95 },
                ]}
              >
                <Text style={[styles.itemText, isLogout && styles.destructiveText]}>
                  {it.title}
                </Text>

                <View style={styles.itemRight}>
                  {isLogout ? (
                    loggingOut ? <ActivityIndicator /> : <Text style={[styles.chevron, styles.destructiveText]}>›</Text>
                  ) : (
                    <>
                      {it.icon ? (
                        <Image source={it.icon} style={styles.itemIcon} resizeMode="contain" />
                      ) : null}
                      <Text style={styles.chevron}>›</Text>
                    </>
                  )}
                </View>
              </Pressable>

              {/* Separador entre filas (no mostrar debajo del último) */}
              {idx < items.length - 1 && <View style={styles.separator} />}
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

/* ----------------------------- styles ----------------------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: 65 },

  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { width: 120, height: 40 },
  close: { fontSize: 30, color: '#111', lineHeight: 30 },

  divider: {
    height: 2,
    backgroundColor: '#111',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 12,
    opacity: 0.9,
  },

  rowLang: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  langLabel: { fontSize: 18, fontWeight: '700', color: '#111' },
  langValue: { fontSize: 16, fontWeight: '600', color: '#111' },

  item: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemText: { fontSize: 16, color: '#111', flex: 1 },
  itemRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  itemIcon: { width: 22, height: 22, tintColor: '#111' },
  chevron: { fontSize: 20, color: '#111' },

  destructiveText: { color: '#dc2626', fontWeight: '700' },

  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  decor: {
    position: 'absolute',
    right: 16,
    bottom: 10,
    width: 140,
    height: 140,
    opacity: 0.8,
  },
});
