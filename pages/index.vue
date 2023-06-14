<script setup lang="ts">
const items = [
  {
    title: "Canvas Panel",
    to: "canvas-panel",
  },
  {
    title: "Tify",
    to: "tify",
  },
  {
    title: "Leaflet",
    to: "map",
  },
  {
    title: "Leaflet Marker Cluster",
    to: "map-cluster",
  },
  {
    title: "Text Selection with VueUse",
    to: "textSelection",
  },
  {
    title: "OpenSeadragon",
    to: "osd",
  },
  {
    title: "OpenSeadragon with SvgOverlay",
    to: "osd-svg",
  },
];
</script>
<template>
  <v-container>
    <ul>
      <li class="mb-2" v-for="(item, key) in items" :key="key">
        <NuxtLink :to="item.to">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </v-container>
</template>
