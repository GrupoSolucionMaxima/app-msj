// app/events/[id].tsx
import EventDetailScreen from '@/components/descubre/DescubreDetailScreen';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function EventById() {
  const { id, title, dateText, lat, lng, ctaUrl, imgMain, description, indications,imagenes } = useLocalSearchParams<{
    id?: string;
    title?: string;
    dateText?: string;
    lat?: string;
    lng?: string;
    ctaUrl?: string;
    imgMain?: string;
    description?: string;
    indications?: string;
    imagenes?: string[];
  }>();

  const safeTitle   = (title ?? `Evento ${id ?? ''}`).toString();
  const safeMonth   = (dateText ?? 'Fecha').toString();
  const safeCtaUrl  = ctaUrl ?? '';   
  const safeImgMain = imgMain ?? '';  
  const imagenArray = imagenes ? JSON.parse(imagenes as string) : [];
  console.log("paaaaaaaaaaa", imagenArray)


  return (
    <EventDetailScreen
      title={safeTitle}
      monthTag={safeMonth}
      venueName="San José"
      ctaUrl={safeCtaUrl}
      coords={{ lat: Number(lat ?? 0), lng: Number(lng ?? 0) }}
      imgMain={safeImgMain}
      description={description}
      indications={indications}
      imagenes={imagenArray}
    />
  );
}