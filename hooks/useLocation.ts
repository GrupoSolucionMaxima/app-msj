// src/hooks/useLocation.ts
import { getSavedLocation, SavedLocation, saveLocation } from '@/app/lib/storage/user';
import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

type Status = 'idle' | 'requesting' | 'granted' | 'denied' | 'error';

export function useLocation(autoRequest = true) {
  const [status, setStatus] = useState<Status>('idle');
  const [loc, setLoc] = useState<SavedLocation | null>(null);

  const resolveAndSave = useCallback(async () => {
    setStatus('requesting');

    const { status: perm } = await Location.requestForegroundPermissionsAsync();
    if (perm !== Location.PermissionStatus.GRANTED) {
      setStatus('denied');
      return;
    }

    setStatus('granted');
    const coords = await Location.getCurrentPositionAsync({});
    const [rev] = await Location.reverseGeocodeAsync({
      latitude: coords.coords.latitude,
      longitude: coords.coords.longitude,
    });

    const data: SavedLocation = {
      city: rev?.city || rev?.subregion,
      region: rev?.region,
      country: rev?.country,
    };

    setLoc(data);
    await saveLocation(data);
  }, []);

  useEffect(() => {
    (async () => {
      // 1) intenta usar lo guardado
      const saved = await getSavedLocation();
      if (saved) {
        setLoc(saved);
        setStatus('granted');
        return;
      }
      // 2) si no hay guardado y se permite, pide permiso y resuelve
      if (autoRequest) {
        try {
          await resolveAndSave();
        } catch {
          setStatus('error');
        }
      }
    })();
  }, [autoRequest, resolveAndSave]);

  return {
    status,
    location: loc, // { city, region, country }
    request: resolveAndSave, // por si quieres botón "Obtener ubicación"
  };
}
