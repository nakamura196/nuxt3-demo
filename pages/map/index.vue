<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const zoom = ref(2)
const coordinates = [50, 50]
</script>
<template>
  <div style="height:100%; width:100%">
    <l-map :use-global-leaflet="false" ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
        <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <l-marker :lat-lng="coordinates" draggable> </l-marker>
    </l-map>
  </div>
</template>