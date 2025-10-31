import React, { useState } from 'react';
import {
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  filterIcon: ImageSourcePropType;       // require('.../filter.png')
  onSubmitEditing?: () => void;
  onOpenFilters?: (e: GestureResponderEvent) => void; // si lo pasas, no se usa el modal interno
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  // Colors / sizes
  containerBgColor?: string;  // fondo del campo
  filterBgColor?: string;     // fondo del botón de filtro
  height?: number;            // alto del control (default 44)
  borderRadius?: number;      // radio de las esquinas (default 22)
  horizontalPadding?: number; // padding horizontal interno (default 14)
};

export default function SearchBarWithFilter({
  value,
  onChangeText,
  placeholder = 'Buscar...',
  filterIcon,
  onSubmitEditing,
  onOpenFilters,
  containerStyle,
  inputStyle,
  containerBgColor = '#E6E6E8',
  filterBgColor = '#6950A1',
  height = 38,
  borderRadius = 20,
  horizontalPadding = 14,
}: Props) {
  const [visible, setVisible] = useState(false);

  const open = (e: GestureResponderEvent) => {
    if (onOpenFilters) return onOpenFilters(e);
    setVisible(true);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            height,
            borderRadius,
            backgroundColor: containerBgColor,
            paddingLeft: horizontalPadding,
          },
          containerStyle,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          onSubmitEditing={onSubmitEditing}
          style={[styles.input, inputStyle]}
          returnKeyType="search"
        />

        {/* Botón de filtro a la derecha */}
        <Pressable
          onPress={open}
          style={[
            styles.filterBtn,
            {
              backgroundColor: filterBgColor,
              width: height, // cuadrado para que quede proporcionado
              borderTopRightRadius: borderRadius,
              borderBottomRightRadius: borderRadius,
            },
          ]}
          android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
          accessibilityRole="button"
          accessibilityLabel="Abrir filtros"
        >
          <Image
            source={filterIcon}
            style={{ width: height * 0.42, height: height * 0.42, tintColor: '#FFFFFF' }}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* Modal interno básico (solo si no usas onOpenFilters) */}
      <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Filters</Text>
            <Pressable style={styles.modalClose} onPress={() => setVisible(false)}>
              <Text style={{ color: '#6950A1', fontWeight: '700' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  filterBtn: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 28,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },
  modalClose: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(105,80,161,0.1)',
  },
});
