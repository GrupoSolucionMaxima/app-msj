import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export type EventItem = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  dateText?: string;
  description?: string;

  venueName?: string;
  coords?: { lat: number; lng: number };
  ctaUrl?: string;
  bannerKey?: string;
};

type Props = {
  all: EventItem[];
  upcoming: EventItem[];
  past: EventItem[];
  onPressItem?: (item: EventItem) => void;
  horizontalPadding?: number;
  gap?: number;
  cardHeight?: number;
  borderRadius?: number;
  embedded?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  indicatorColor?: string;
  startIndex?: number; // nuevo
  endIndex?: number;   // nuevo
};

export default function EventsTabs({
  all,
  upcoming,
  past,
  onPressItem,
  horizontalPadding = 16,
  gap = 12,
  cardHeight = 180,
  borderRadius = 14,
  embedded = false,
  activeColor = '#111111',
  inactiveColor = '#6B7280',
  indicatorColor = '#111111',
}: Props) {
  const [tab, setTab] = useState<0 | 1 | 2>(0);
  const data = useMemo(() => [all, upcoming, past], [all, upcoming, past]);

  // 🔑 Estado para manejar cuántos eventos se muestran
  const [visibleCount, setVisibleCount] = useState(6);

  const currentData = useMemo(() => data[tab].slice(0, visibleCount), [data, tab, visibleCount]);

  const renderCard = ({ item }: { item: EventItem }) => (
    <Pressable onPress={() => onPressItem?.(item)} style={{ borderRadius }}>
      <EventCard
        image={item.image}
        title={item.title}
        dateText={item.dateText}
        height={cardHeight}
        radius={borderRadius}
        description={item.description}
      />
    </Pressable>
  );


  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 8, paddingBottom: 6 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            alignItems: 'center',
          }}
          overScrollMode="never"
        >
          {(['Agenda general', 'Próximos eventos', 'Eventos anteriores'] as const).map(
            (label, i) => {
              const active = tab === i;
              return (
                <View key={label} style={{ marginRight: 18 }}>
                  <Pressable
                    onPress={() => setTab(i as 0 | 1 | 2)}
                    style={styles.tabPress}
                    android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        { color: active ? activeColor : inactiveColor, fontWeight: active ? '700' : '600' },
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                  {active ? (
                    <View style={[styles.indicator, { backgroundColor: indicatorColor }]} />
                  ) : null}
                </View>
              );
            }
          )}
        </ScrollView>
      </View>

      {/* Lista con scroll infinito */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: 8,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={true}
      >
        {data[tab].map((item) => (
          <Pressable key={item.id} onPress={() => onPressItem?.(item)} style={{ borderRadius }}>
            <EventCard
              image={item.image}
              title={item.title}
              dateText={item.dateText}
              height={cardHeight}
              radius={borderRadius}
              description={item.description}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function EventCard({
  image,
  title,
  dateText,
  height = 180,
  radius = 14,
  description,
}: {
  image: ImageSourcePropType;
  title: string;
  dateText?: string;
  height?: number;
  radius?: number;
  description?: string;
}) {
  return (
    <View style={[styles.card, { height, borderRadius: radius }]}>
      <Image source={image} style={StyleSheet.absoluteFill} resizeMode="cover" />

      {/* Overlay negro para contraste */}
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: radius }]}
      />

      <View style={styles.cardTextWrap}>
        <Text style={styles.cardTitle}>{title}</Text>
        {dateText ? <Text style={styles.cardSubtitle}>{dateText}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabPress: { paddingVertical: 6 },
  tabText: { fontSize: 14 },
  indicator: { height: 2, borderRadius: 2, marginTop: 6 },

  card: { width: '100%', backgroundColor: '#000', overflow: 'hidden', position: 'relative',marginTop:10 },
  cardTextWrap: { position: 'absolute', left: 12, right: 12, bottom: 12 },
  cardTitle: {
    color: '#FFF', fontSize: 16, fontWeight: '700', lineHeight: 20, marginBottom: 2,
    textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2,
  },
  cardSubtitle: { color: '#FFF', fontSize: 12, fontWeight: '500', opacity: 0.95 },
});
