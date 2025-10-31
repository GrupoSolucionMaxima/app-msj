// app/auth/welcome.tsx
import React from 'react';
import {
    Image,
    ImageSourcePropType,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type BtnProps = {
  icon?: ImageSourcePropType;
  label?: string;
  onPress?: () => void;
  testID?: string;
};

function AuthButton({ icon, label, onPress, testID }: BtnProps) {
  const withText = Boolean(label);
  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      style={({ pressed }) => [
        styles.btn,
        pressed && { opacity: 0.9, transform: [{ scale: 0.997 }] },
      ]}
      accessibilityRole="button"
      accessibilityLabel={label ?? 'Continuar'}
    >
      {icon ? (
        <Image source={icon} style={[styles.btnIcon, withText && { marginRight: 10 }]} />
      ) : null}
      {withText ? <Text style={styles.btnText}>{label}</Text> : null}
    </Pressable>
  );
}

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      {/* Decoración ligera opcional (puedes quitar estas Views si no deseas los márgenes redondeados) */}
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/logo_san_jose_main.png')}
          resizeMode="contain"
          style={styles.logo}
        />

        {/* Tagline */}
        <Text style={styles.tagline}>Te quiere aquí</Text>

        {/* Botones */}
        <View style={styles.buttons}>
          <AuthButton
            icon={require('../../assets/images/google.png')}
            onPress={() => {
              // TODO: manejar login con Google
            }}
            testID="btn-google"
          />
          <AuthButton
            icon={require('../../assets/images/facebook.png')}
            onPress={() => {
              // TODO: manejar login con Facebook
            }}
            testID="btn-facebook"
          />
          <AuthButton
            label="Registrarse"
            onPress={() => {
              // TODO: navegar a pantalla de registro
            }}
            testID="btn-signup"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ---------- estilos ---------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '78%', // ancho relativo para distintas pantallas
    height: undefined,
    aspectRatio: 1.9, // ajusta si tu logo es más ancho/alto
    marginBottom: 8,
  },
  tagline: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2F2A66', // morado del mock
    marginBottom: 32,
  },
  buttons: {
    width: '86%',
    gap: 12,
  },
  btn: {
    height: 44,
    borderRadius: 8,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  btnIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
});
