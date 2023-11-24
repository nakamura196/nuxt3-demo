<script setup lang="ts">
import * as L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
// @ts-ignore
import { MarkerClusterGroup } from "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

// デフォルトのズームレベルとマップの中心座標
const zoom = ref(3);
const centerLatLng = ref<[number, number]>([54, 28]);

// Leaflet マップの準備ができたかどうかを追跡
const leafletReady = ref(false);

// MarkerCluster グループのインスタンス
let markerCluster: MarkerClusterGroup | null = null;

// タイルプロバイダーの設定
const tileProviders = ref([
  {
    name: "OpenStreetMap",
    visible: true,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
]);

// Leaflet マップの準備ができた際の処理
const onLeafletReady = (map: L.Map) => {
  leafletReady.value = true;
  initializeMarkerCluster(map);
  display();
};

// MarkerCluster グループの初期化
const initializeMarkerCluster = (map: L.Map) => {
  if (!markerCluster) {
    markerCluster = L.markerClusterGroup({
      removeOutsideVisibleBounds: true,
      chunkedLoading: true,
    });
    map.addLayer(markerCluster);
  }
};

// ランダムな座標を生成する関数
const generateRandomCoordinate = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// マーカーの表示
const display = () => {
  let markers = [];
  for (let i = 0; i < 5000; i++) {
    const marker = L.marker(
      L.latLng(
        generateRandomCoordinate(53.82477192, 53.92365592),
        generateRandomCoordinate(27.5078027, 27.70640622)
      )
    );
    marker.bindPopup("Number " + i);
    markers.push(marker);
  }
  markerCluster.addLayers(markers);
};
</script>

<template>
  <l-map
    ref="map"
    :max-zoom="19"
    :zoom="zoom"
    :center="centerLatLng"
    :zoomAnimation="true"
    :markerZoomAnimation="true"
    :useGlobalLeaflet="true"
    :options="{ zoomControl: false }"
    @ready="onLeafletReady"
  >
    <template v-if="leafletReady">
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        layer-type="base"
      />
    </template>
  </l-map>
</template>
