// app/(tabs)/profile.tsx
// ✔ Guarda la foto de perfil LOCALMENTE (sin backend)
// Requisitos: expo-image-picker, expo-file-system, @react-native-async-storage/async-storage
import HorizontalGradientCarousel from '@/components/HorizontalGradientCarousel';
import { useLocation } from '@/hooks/useLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { formatName, getUser } from '../lib/storage/user';

const KEY = 'PROFILE_PHOTO_URI';
const AVATAR_FILENAME = 'avatar_placeholder.png'; // ruta estable en el sandbox

export default function ProfileScreen() {
  const [name, setName] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // uri local persistida
  const [uploading, setUploading] = useState(false);
  const [progressLabel, setProgressLabel] = useState<string | null>(null);

  const { location, status } = useLocation(true);

  // DATA DE MUESTRA PARA LOS CARRUSELES
  const secondCarouselImgs = useMemo(
    () => [
      { id: '1', source: require('../../assets/events/1.png'), title: 'Campaña de basura no tradicional', subtitle: 'Del 1 al 10 de Abril de 2025' },
      { id: '2', source: require('../../assets/events/2.png'), title: 'Paseo de los Estudiantes', subtitle: '2 de Abril de 2025' },
      { id: '3', source: require('../../assets/events/3.png'), title: 'Rock Fest Se Baña', subtitle: '5 de Abril de 2025' },
      { id: '4', source: require('../../assets/events/4.png'), title: 'Campaña “Puerta a Puerta', subtitle: '5 de Abril de 2025' },
      { id: '5', source: require('../../assets/events/5.png'), title: 'Campaña de Reciclaje Barrio cuba', subtitle: '7 de Abril de 2025' },
      { id: '6', source: require('../../assets/events/6.png'), title: 'Taller de Protocolo de Entrega de Alimentos y Donaciones', subtitle: '9 de Abril de 2025' },
      { id: '7', source: require('../../assets/events/7.png'), title: '1era Feria de Empelo', subtitle: '10 de Abril de 2025' },
      { id: '8', source: require('../../assets/events/8.png'), title: 'Semana Santa en San José', subtitle: '13 al 20 de Abril de 2025' },
    ],
    []
  );

  // Cargar nombre y foto local persistida
  useEffect(() => {
    (async () => {
      const u = await getUser();
      setName(formatName(u?.name || ''));

      const saved = await AsyncStorage.getItem(KEY);
      if (saved) setAvatarUrl(saved);
    })();
  }, []);

  const prettyLocation =
    location
      ? [location.city, location.region, location.country].filter(Boolean).join(', ')
      : status === 'denied'
      ? 'Ubicación no concedida'
      : status === 'requesting'
      ? 'Obteniendo ubicación…'
      : 'Ubicación';

  /** Elige imagen y la persiste en el sandbox + AsyncStorage (sin backend) */
  const pickImage = async () => {
    // Permiso (Android 13+ suele ser automático al abrir el picker)
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaStatus !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para cambiar la foto de perfil.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
      base64: false,
      exif: false,
    });

    if (result.canceled || !result.assets?.length) return;

    const pickedUri = result.assets[0].uri;
    await saveProfilePhotoLocally(pickedUri);
  };

  /** Copia la imagen al directorio de la app con nombre estable y guarda la URI */
  const saveProfilePhotoLocally = async (srcUri: string) => {
    try {
      setUploading(true);
      setProgressLabel('Guardando…');

      // Asegura carpeta (opcional, documentDirectory siempre existe)
      const destUri = FileSystem.documentDirectory + AVATAR_FILENAME;

      // Elimina anterior si existe para no dejar basura
      try { await FileSystem.deleteAsync(destUri, { idempotent: true }); } catch {}

      // Copia al sandbox (persistente mientras la app esté instalada)
      await FileSystem.copyAsync({ from: srcUri, to: destUri });

      // Persistir la ruta (sin query) y refrescar vista con cache-busting
      await AsyncStorage.setItem(KEY, destUri);
      setAvatarUrl(destUri + `?v=${Date.now()}`);

      setProgressLabel('Listo');
    } catch (e) {
      console.error('saveProfilePhotoLocally error', e);
      setProgressLabel(null);
      Alert.alert('Error', 'No se pudo guardar la foto de perfil.');
    } finally {
      setUploading(false);
      setTimeout(() => setProgressLabel(null), 1000);
    }
  };

  /** Elimina la foto local y limpia el estado */
  const removeLocalPhoto = async () => {
    try {
      const saved = await AsyncStorage.getItem(KEY);
      if (saved) {
        try { await FileSystem.deleteAsync(saved.replace(/\?v=\d+$/, ''), { idempotent: true }); } catch {}
      }
      await AsyncStorage.removeItem(KEY);
      setAvatarUrl(null);
    } catch (e) {
      console.error('removeLocalPhoto error', e);
      Alert.alert('Error', 'No se pudo eliminar la foto.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrap}>
          <Pressable onPress={pickImage} style={styles.avatarPressable}>
            <View style={styles.avatarFallback}>
              <Image
                source={
                  avatarUrl
                    ? { uri: avatarUrl }
                    : require('../../assets/images/avatar_placeholder.png')
                }
                style={styles.avatarImg}
              />
            </View>

            {/* Overlay “Cambiar/Quitar” */}
            <View style={styles.avatarOverlay}>
              {uploading ? (
                <View style={styles.overlayBadge}>
                  <ActivityIndicator />
                  {!!progressLabel && <Text style={styles.overlayBadgeText}>{progressLabel}</Text>}
                </View>
              ) : (
                <View style={styles.overlayRow}>
                  <Pressable onPress={pickImage} style={[styles.overlayBadge, { marginRight: 8 }]}>
                    <Text style={styles.overlayBadgeText}>Cambiar foto</Text>
                  </Pressable>
                  {avatarUrl && (
                    <Pressable onPress={removeLocalPhoto} style={styles.overlayBadge}>
                      <Text style={styles.overlayBadgeText}>Quitar</Text>
                    </Pressable>
                  )}
                </View>
              )}
            </View>
          </Pressable>

          {/* Estado en línea (decorativo) */}
          <View style={styles.statusDot} />
        </View>

        <Text style={styles.nameText}>{name || 'Nombre'}</Text>
        <Text style={styles.locationText}>{prettyLocation}</Text>

        {/* ------------------------ EVENTOS FAVORITOS ------------------------- */}
        <View style={styles.containerText}>
          <Text style={styles.subtitle}>Eventos favoritos</Text>
        </View>
        <View>
          <HorizontalGradientCarousel data={secondCarouselImgs} cardWidth={260} cardHeight={150} />
        </View>

        {/* ------------------------ RUTAS DE INTERÉS ------------------------- */}
        <View style={styles.containerText2}>
          <Text style={styles.subtitle}>Rutas de interés</Text>
        </View>
        <View>
          <HorizontalGradientCarousel data={secondCarouselImgs} cardWidth={260} cardHeight={150} />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* --------------------------------- STYLES -------------------------------- */
const AVATAR = 135;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  content: { paddingBottom: 24, paddingTop: 16 },

  /* Avatar */
  avatarWrap: {
    alignSelf: 'center',
    marginTop: 6,
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPressable: {
    borderRadius: 9999,
    overflow: 'hidden',
  },
  avatarFallback: {
    width: AVATAR,
    height: AVATAR,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: AVATAR / 2,
  },
  avatarImg: { width: AVATAR, height: AVATAR, resizeMode: 'cover', borderRadius: AVATAR / 2 },
  avatarOverlay: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  overlayRow: {
    flexDirection: 'row',
  },
  overlayBadge: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 110,
  },
  overlayBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  statusDot: {
    position: 'absolute',
    right: 18,
    bottom: 22,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#00E6B3',
    borderWidth: 3,
    borderColor: '#fff',
  },

  containerText: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 14,
    paddingBottom: 18,
  },
  containerText2: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 32,
    paddingBottom: 18,
  },

  subtitle: { fontSize: 20, fontWeight: '600' },

  nameText: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    paddingTop: 12,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 4,
    color: '#666',
  },
});
