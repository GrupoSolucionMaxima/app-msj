// LeafletMap.tsx
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  lat: number;
  lng: number;
  zoom?: number;
  markerTitle?: string;
};

export default function LeafletMap({ lat, lng, zoom = 14, markerTitle = "Ubicación" }: Props) {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin=""
    />
    <style>
      html, body, #map { height: 100%; margin: 0; padding: 0; }
      .leaflet-container { background: #fff; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script
      src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      crossorigin="">
    </script>
    <script>
      const lat = ${lat};
      const lng = ${lng};
      const map = L.map('map', { zoomControl: true }).setView([lat, lng], ${zoom});
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);
      L.marker([lat, lng]).addTo(map).bindPopup(${JSON.stringify(markerTitle)});
    </script>
  </body>
  </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        mixedContentMode="always"
        androidHardwareAccelerationDisabled={false}
        allowsInlineMediaPlayback
        scalesPageToFit={Platform.OS === "android"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 260, borderRadius: 12, overflow: "hidden" },
  webview: { flex: 1 },
});
