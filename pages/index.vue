<script setup lang="ts">

const baseURL = "/"

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
  {
    title: "Cytoscape",
    to: "cytoscape",
  },
  {
    title: "Universal Viewer",
    href: `${baseURL}uv/index.html?manifest=https://dl.ndl.go.jp/api/iiif/3437686/manifest.json`
  },
  {
    title: "Blog (Nuxt Content and Netlify CMS)",
    to: "blog"
  },
];

useHead({
  script: [
    { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
  ],
});
</script>
<template>
  <v-container>
    <v-list>
      <v-list-item class="mb-2" v-for="(item, key) in items" :key="key">
        <template v-if="item.href">
          <a :href="item.href">
            {{ item.title }}
          </a>
        </template>
        <template v-else>
          <NuxtLink :to="item.to">
            {{ item.title }}
          </NuxtLink>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>
