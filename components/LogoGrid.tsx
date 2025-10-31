// LogoGridView.tsx
import React, { useMemo } from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Linking,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

type Item = { id: string; source: ImageSourcePropType; url: string; label?: string };

type Props = {
  data: Item[];
  gap?: number;
  horizontalPadding?: number;
  borderRadius?: number;
  bgColor?: string;
  showScrollIndicators?: boolean;
};

export default function LogoGridView({
  data,
  gap = 12,
  horizontalPadding = 20,
  borderRadius = 12,
  bgColor = '#FFFFFF',
  showScrollIndicators = false,
}: Props) {
  const { width } = useWindowDimensions();

  // Área interna (restando padding laterales)
  const innerWidth = Math.max(0, width - horizontalPadding * 2);

  // 2 columnas -> 1 gap entre columnas
  const itemSize = Math.floor((innerWidth - gap) / 2);

  // Chunk de 4 items por "página" (2x2)
  const pages: Item[][] = useMemo(() => {
    const out: Item[][] = [];
    for (let i = 0; i < data.length; i += 4) out.push(data.slice(i, i + 4));
    return out;
  }, [data]);

  const open = async (url: string) => {
    try {
      const ok = await Linking.canOpenURL(url);
      if (ok) await Linking.openURL(url);
    } catch {}
  };

  const renderPage = ({ item: page }: { item: Item[] }) => (
    <View style={[styles.page, { width }]}>
      <View style={[styles.pageInner, { paddingHorizontal: horizontalPadding }]}>
        <View style={styles.grid}>
          {page.map((it, idx) => {
            const isLastInRow = idx % 2 === 1; // 0,1 | 2,3
            const isLastRow = idx >= 2;        // filas 0 y 1 (2 filas máx)
            return (
              <Pressable
                key={it.id}
                onPress={() => open(it.url)}
                style={{
                  width: itemSize,
                  height: itemSize,
                  marginRight: isLastInRow ? 0 : gap,
                  marginBottom: isLastRow ? 0 : gap,
                  borderRadius,
                  overflow: 'hidden',
                  backgroundColor: bgColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
                accessibilityRole="link"
                accessibilityLabel={it.label ?? 'Abrir enlace'}
              >
                <Image
                  source={it.source}
                  style={{ width: 128, height: 128 }}
                  resizeMode="contain"
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );

  // Si hay 4 o menos, no necesitamos scroll horizontal; igual reutilizamos FlatList (una sola página)
  return (
    <FlatList
      data={pages}
      keyExtractor={(_, i) => `page-${i}`}
      renderItem={renderPage}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={showScrollIndicators}
      // un pequeño "espacio" táctil para scroll agradable aunque solo haya 1 página
      bounces
    />
  );
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
  },
  pageInner: {
    paddingVertical: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // dos filas máx por página
  },
});
