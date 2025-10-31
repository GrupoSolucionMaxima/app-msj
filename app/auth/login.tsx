// app/auth/login.tsx
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthProvider'; // 👈 usamos el contexto (guarda user+token)

type Lang = 'es' | 'en';

const STRINGS: Record<Lang, Record<string, string>> = {
  es: {
    lang: 'ES',
    username: 'USUARIO (email)',
    password: 'CONTRASEÑA',
    forgot: '¿OLVIDÓ SU CONTRASEÑA?',
    login: 'INGRESAR',
    userPh: 'Tu email',
    passPh: 'Tu contraseña',
    errCreds: 'Email o contraseña inválidos',
    errMany: 'Demasiados intentos. Espera e intenta de nuevo.',
    err401: 'Token inválido o expirado',
    errTimeout: 'La solicitud tardó demasiado. Reintenta.',
    errNetwork: 'Sin conexión al servidor. ¿Backend activo?',
    errGeneric: 'No se pudo iniciar sesión',
  },
  en: {
    lang: 'EN',
    username: 'USERNAME (email)',
    password: 'PASSWORD',
    forgot: 'FORGOT YOUR PASSWORD?',
    login: 'SIGN IN',
    userPh: 'Your email',
    passPh: 'Your password',
    errCreds: 'Invalid email or password',
    errMany: 'Too many attempts. Please wait and try again.',
    err401: 'Invalid or expired token',
    errTimeout: 'Request timed out. Try again.',
    errNetwork: 'Cannot reach the server. Is backend up?',
    errGeneric: 'Could not sign in',
  },
};

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth(); // 👈 llama a la API, guarda token y usuario
  const [lang, setLang] = useState<Lang>('es');
  const t = useMemo(() => STRINGS[lang], [lang]);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [busy, setBusy] = useState(false);
  const canSubmit = email.trim().length > 0 && pass.length > 0;

  const onSubmit = async () => {
    if (!canSubmit || busy) return;
    try {
      setBusy(true);
      await signIn(email.trim().toLowerCase(), pass);
      router.replace('/(tabs)/home'); // ajusta si tu ruta de inicio es otra
    } catch (e: any) {
      // Manejo de errores de red/axios
      if (e?.code === 'ECONNABORTED') {
        Alert.alert(t.errGeneric, t.errTimeout);
      } else if (!e?.response) {
        Alert.alert(t.errGeneric, t.errNetwork);
      } else if (e.response.status === 422) {
        Alert.alert('Credenciales', e?.response?.data?.message || t.errCreds);
      } else if (e.response.status === 429) {
        Alert.alert('Límite', t.errMany);
      } else if (e.response.status === 401) {
        Alert.alert('Sesión', t.err401);
      } else {
        Alert.alert(t.errGeneric, e.response.data?.message || t.errGeneric);
      }
    } finally {
      setBusy(false);
    }
  };



  return (
    <SafeAreaView style={styles.safe}>
      {/* Header: back + idioma */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={10} accessibilityLabel={lang === 'es' ? 'Volver' : 'Back'}>
          <Text style={styles.backArrow}>▸</Text>
        </Pressable>

        <Pressable
          onPress={() => setLang(prev => (prev === 'es' ? 'en' : 'es'))}
          hitSlop={10}
          accessibilityLabel={lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
          style={styles.langBtn}
        >
          <Text style={styles.langText}>{t.lang}</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          <Image source={require('../../assets/images/logo_san_jose_main.png')} resizeMode="contain" style={styles.logo} />

          <View style={{ width: '86%', marginTop: 8 }}>
            <Text style={styles.label}>{t.username}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.userPh}
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              returnKeyType="next"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={[styles.label, { marginTop: 18 }]}>{t.password}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.passPh}
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              autoComplete="password"
              returnKeyType="go"
              onSubmitEditing={onSubmit}
              value={pass}
              onChangeText={setPass}
            />

            <Pressable style={{ alignSelf: 'center', paddingTop: 12, paddingBottom: 16 }}>
              <Text style={styles.link}>{t.forgot}</Text>
            </Pressable>

            <Pressable
              onPress={onSubmit}
              disabled={!canSubmit || busy}
              style={[styles.primaryBtn, (!canSubmit || busy) && { opacity: 0.5 }]}
            >
              {busy ? <ActivityIndicator /> : <Text style={styles.primaryText}>{t.login}</Text>}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  topBar: { height: 44, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  backArrow: { fontSize: 22, transform: [{ rotate: '180deg' }], color: '#111', marginRight: 'auto' },
  langBtn: { marginLeft: 'auto' },
  langText: { fontSize: 16, fontWeight: '800', color: '#111' },
  container: { flex: 1, alignItems: 'center' },
  logo: { width: '70%', height: undefined, aspectRatio: 1.9, marginTop: 32 },
  label: { fontSize: 11, fontWeight: '800', color: '#111', marginLeft: 6, marginBottom: 6, letterSpacing: 0.6 },
  input: { height: 48, borderRadius: 8, backgroundColor: '#F1F2F3', paddingHorizontal: 14, color: '#111' },
  link: { fontSize: 11, fontWeight: '800', color: '#111', textDecorationLine: 'underline', letterSpacing: 0.4 },
  primaryBtn: { height: 48, borderRadius: 12, backgroundColor: '#2F2A66', alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#fff', fontWeight: '800' },
});