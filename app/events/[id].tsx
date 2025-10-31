// app/events/[id].tsx
import EventDetailScreen from '@/components/events/EventDetailScreen';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function EventById() {
  const {
    id,
    title,
    dateText,
    venueName,
    description,
    lat,
    lng,
    ctaUrl,
    imgMain,
    headerLogo,          // NEW
    headerLogoHeight,    // NEW (opcional, como string)
  } = useLocalSearchParams<{
    id?: string;
    title?: string;
    dateText?: string;
    venueName?: string;
    description?: string;
    lat?: string;
    lng?: string;
    ctaUrl?: string;
    imgMain?: string;
    headerLogo?: string;        // clave de LOCAL o se puede ignorar
    headerLogoHeight?: string;  // ej. "70"
  }>();

  const { showMap } = useLocalSearchParams<{ showMap?: string }>();
  
  return (
    <EventDetailScreen
      title={title ?? `Evento ${id ?? ''}`}
      monthTag={dateText ?? 'Fecha'}
      venueName={venueName ?? 'San José'}
      description={description ?? ''}
      bannerImage={(imgMain as any) ?? 'banner-default'}
      headerLogo={headerLogo as any}
      headerLogoHeight={headerLogoHeight ? Number(headerLogoHeight) : undefined}
      coords={{ lat: Number(lat ?? 0), lng: Number(lng ?? 0) }}
      ctaUrl={ctaUrl}
      showMap={showMap === "1"}
    />
  );
}
