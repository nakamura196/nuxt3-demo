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
];
</script>
<template>
  <v-container>
    <ul>
      <li v-for="(item, key) in items" :key="key">
        <NuxtLink :to="item.to">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </v-container>
</template>
