// app/(tabs)/search.tsx
import React, { useRef, useState } from 'react';
import {
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

export default function SearchScreen() {
  const [q, setQ] = useState('');
  const inputRef = useRef<TextInput>(null);
  const canSearch = q.trim().length > 0;

  const handleSearch = () => {
    if (!canSearch) return;
    console.log('Buscar:', q.trim());
    // Ej: router.push(`/(tabs)/descubre?query=${encodeURIComponent(q.trim())}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.centerWrap}>
          <View style={styles.pill}>
            <View style={styles.left}>
              <Image
                source={require('../../assets/images/lupa_2.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Buscar…"
                placeholderTextColor="#6B7280"
                value={q}
                onChangeText={setQ}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Pressable
              onPress={handleSearch}
              disabled={!canSearch}
              style={({ pressed }) => [
                styles.btn,
                pressed && canSearch && { opacity: 0.9, transform: [{ scale: 0.997 }] },
                !canSearch && { opacity: 0.5 },
              ]}
              android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
            >
              <Text style={styles.btnText}>BUSCAR</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  flex: { flex: 1 },

  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  pill: {
    width: '92%',
    maxWidth: 560,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 999,
    overflow: 'hidden',
  },

  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  icon: { width: 16, height: 16, tintColor: '#4B5563' },
  input: {
    flex: 1,
    height: 38,
    paddingHorizontal: 10,
    color: '#111827',
    fontSize: 14,
  },

  btn: {
    height: 38,
    paddingHorizontal: 16,
    backgroundColor: '#424276',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#FFFFFF', fontWeight: '800', letterSpacing: 0.5, fontSize: 12 },
});
