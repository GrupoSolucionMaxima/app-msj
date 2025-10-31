import axios from 'axios';
import Constants from 'expo-constants';

// ----------------------------------------------------------------------------------
// ⚡️ IP de Producción (Servidor Desplegado)
// ----------------------------------------------------------------------------------
const PRODUCTION_API_URL = 'https://msj.gruponbf-testlab.com'; 
// ----------------------------------------------------------------------------------

function getHostFromExpo(): string | null {
  const hostUri =
    // @ts-ignore
    Constants.expoConfig?.hostUri ||
    // @ts-ignore
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    // @ts-ignore
    Constants.manifest?.hostUri;

  if (!hostUri) return null;
  const host = hostUri.split(':')[0];
  return host || null;
}

function resolveBaseURL() {
  // LÓGICA CLAVE: Si estás en modo desarrollo y usas la IP de un backend
  // en TU LAPTOP (puerto 8000), usa la lógica interna del simulador.
  //
  // PERO si tu backend está DESPLEGADO, ¡SIEMPRE usa la IP de producción!
  
  // Opción 1: Usar IP de Producción (Para Despliegue, Simulador y Emulador)
  // Usamos la IP de producción a menos que estemos en un entorno local muy específico.
  // Como tu backend está en la nube, es mejor usar la IP pública.
  
  // Puedes usar una variable de entorno para alternar fácilmente, pero por ahora:
  return PRODUCTION_API_URL;

  /*
  // *** LÓGICA ORIGINAL DE DESARROLLO (COMENTADA) ***
  // Caso 1: simuladores/emuladores locales
  if (Platform.OS === 'ios') {
    return 'http://127.0.0.1:8000';
  }
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000';
  }

  // Caso 2: dispositivo real corriendo en Expo Go (misma red)
  const host = getHostFromExpo();
  if (host) {
    return `http://${host}:8000`;
  }

  // Fallback: si todo falla, pon aquí la IP local de tu PC a mano:
  return 'http://192.168.1.50:8000';
  */
}

export const api = axios.create({
  baseURL: resolveBaseURL(),
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});