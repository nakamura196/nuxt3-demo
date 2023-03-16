<template>
  <l-map
    ref="map"
    :max-zoom="19"
    v-model:zoom="zoom"
    v-model:center="center"
    :zoomAnimation="true"
    :markerZoomAnimation="true"
    :useGlobalLeaflet="true"
    :options="{ zoomControl: false }"
    @ready="onLeafletReady"
  >
    <template v-if="leafletReady">
      <l-control-layers position="bottomright" />
      <l-control-zoom position="bottomright" />
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
<script>
import * as L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import {
  LMap,
  LTileLayer,
  LControlZoom,
  LControlLayers,
} from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LControlZoom,
    LControlLayers,
  },

  data() {
    return {
      zoom: 3,
      center: [54, 28],
      tileProviders: [
        {
          name: "OpenStreetMap",
          visible: true,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        },
      ],

      leafletReady: false,
      leafletObject: null,
    };
  },

  methods: {
    async onLeafletReady(map) {
      await this.$nextTick();
      this.leafletReady = true;
    },
  },

  mounted() {
    L.Map.addInitHook(function () {
      const markerCluster = L.markerClusterGroup({
        removeOutsideVisibleBounds: true,
        chunkedLoading: true,
      }).addTo(this);

      function r(min, max) {
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
    });
  },
};
</script>
