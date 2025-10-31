// components/ui/AppHeader.tsx
// ✅ Muestra el avatar local y mantiene las RUTAS ORIGINALES (clics funcionando)
// Requiere: @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  userName?: string;
  logo?: ImageSourcePropType;
  escudo?: ImageSourcePropType;
  divider?: ImageSourcePropType;
  searchIcon?: ImageSourcePropType;
  filterIcon?: ImageSourcePropType;
  /** Si pasas avatar por props, tiene prioridad sobre el guardado local */
  avatar?: ImageSourcePropType;
  defaultAvatar?: ImageSourcePropType;
};

const PROFILE_KEY = 'PROFILE_PHOTO_URI';

export default function AppHeader({
  userName = 'JOSÉ SUAREZ',
  logo = require('../../assets/images/logo_san_jose_main-2.png'),
  escudo = require('../../assets/images/escudo3.png'),
  divider = require('../../assets/images/divider.png'),
  searchIcon = require('../../assets/images/lupa-menu-icon.png'),
  filterIcon = require('../../assets/images/filter-menu-icon.png'),
  avatar,
  defaultAvatar = require('../../assets/images/avatar_placeholder.png'),
}: Props) {
  const insets = useSafeAreaInsets();
  const TOP = insets.top + 10;
  const router = useRouter();

  const [localAvatarUri, setLocalAvatarUri] = useState<string | null>(null);

  // Carga inicial
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(PROFILE_KEY);
      setLocalAvatarUri(saved ? `${saved}?v=${Date.now()}` : null);
    })();
  }, []);

  // Refresca al volver a foco (por si cambiaron la foto en /profile)
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const saved = await AsyncStorage.getItem(PROFILE_KEY);
        setLocalAvatarUri(saved ? `${saved}?v=${Date.now()}` : null);
      })();
    }, [])
  );

  const avatarSource: ImageSourcePropType =
    avatar ? avatar : localAvatarUri ? { uri: localAvatarUri } : defaultAvatar;

  // ➤ RUTAS ORIGINALES restauradas
  const handlePressProfile = () => {
    router.push('/(screens)/profile');
  };
  const handlePressSearch = () => {
    router.push('/(tabs)/search');
  };
  const handlePressFilter = () => {
    router.push('/settings/settings');
  };

  return (
    <LinearGradient
      colors={['#5C2E9D', '#56D6D6']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[styles.grad, { paddingTop: TOP }]}
      pointerEvents="auto"
    >
      <View style={styles.row}>
        {/* Logos */}
        <View style={styles.logosContainer}>
          <Image source={escudo} style={styles.logo1} resizeMode="contain" />
          <Image source={logo} style={styles.logo2} resizeMode="contain" />
          <Image source={divider} style={styles.divider} resizeMode="contain" />
        </View>

        {/* Texto */}
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.welcome}>BIENVENIDO</Text>
          <Text style={styles.name} numberOfLines={1}>
            {userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase()}
          </Text>
        </View>

        {/* Acciones */}
        <View style={styles.actions}>
          {/* Perfil */}
          <Pressable onPress={handlePressProfile} style={styles.avatarWrap} hitSlop={8}>
            <Image source={avatarSource} style={styles.avatarImg} />
            <View style={styles.onlineDot} />
          </Pressable>

          {/* Lupa */}
          <Pressable onPress={handlePressSearch} style={styles.iconBtn} hitSlop={8}>
            <Image source={searchIcon} style={styles.icon} />
          </Pressable>

          {/* Filtros / Ajustes */}
          <Pressable onPress={handlePressFilter} style={styles.iconBtn} hitSlop={8}>
            <Image source={filterIcon} style={styles.icon} />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  grad: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcome: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },
  actions: { flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  avatarWrap: { width: 36, height: 36, marginLeft: 6 },
  avatarImg: { width: 36, height: 36, borderRadius: 99999, overflow: 'hidden' },
  avatarFallback: {
    width: 36, height: 36,
    alignItems: 'center', justifyContent: 'center',
  },
  userGlyph: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#fff' },
  onlineDot: {
    position: 'absolute', right: -1, bottom: -1, width: 10, height: 10, borderRadius: 5,
    backgroundColor: '#1CE07A', borderWidth: 2, borderColor: '#5C2E9D',
  },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginLeft: 6 },
  icon: { width: 22, height: 22, tintColor: '#fff', resizeMode: 'contain' },
  logosContainer: { flexDirection: 'row' },
  divider: { marginHorizontal: 10 },
  logo1: { marginRight: 10, width: 60 },
  logo2: { width: 60 },
});
