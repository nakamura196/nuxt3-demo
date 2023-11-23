<script setup lang="ts">
import * as L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
// @ts-ignore
import { MarkerClusterGroup } from "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

const zoom = ref(3);
const centerLatLng = ref<[number, number]>([54, 28]);

const leafletReady = ref(false);

let markerCluster: MarkerClusterGroup | null = null;

const tileProviders = ref([
  {
    name: "OpenStreetMap",
    visible: true,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
]);

const onLeafletReady = (map: L.Map) => {
  leafletReady.value = true;
  initializeMarkerCluster(map);
  display();
};

const initializeMarkerCluster = (map: L.Map) => {
  if (!markerCluster) {
    markerCluster = L.markerClusterGroup({
      removeOutsideVisibleBounds: true,
      chunkedLoading: true,
    });
    map.addLayer(markerCluster);
  }
};

const display = () => {
  function r(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  let markers = [];
  for (let i = 0; i < 5000; i++) {
    const marker = L.marker(
      L.latLng(r(53.82477192, 53.92365592), r(27.5078027, 27.70640622))
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
