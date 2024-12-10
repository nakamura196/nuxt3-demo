<script setup lang="ts">
const { $config } = useNuxtApp();
const baseURL = $config.app.baseURL;

const items = await queryContent("/item/").sort({ date: -1 }).find();

/*
const items = [
  {
    title: "Canvas Panel",
    to: "canvas-panel",
    path: `${baseURL}/assets/cytoscape_add.webp`,
    date: "2023-12-07",
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
    href: `${baseURL}uv/index.html?manifest=https://dl.ndl.go.jp/api/iiif/3437686/manifest.json`,
  },
  {
    title: "Blog (Nuxt Content and Netlify CMS)",
    to: "blog",
  },
  {
    title: "Cytoscape (Add nodes and edges)",
    to: "cytoscape_add",
  },
];
*/

useHead({
  script: [
    { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
  ],
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="6" sm="3" v-for="item in items">
        <v-card variant="flat">
          <template v-if="item.href">
            <v-img
              style="background-color: lightgray"
              :height="150"
              :src="
                item.media
                  ? `${baseURL}/${item.media}`
                  : 'https://nuxt.com/assets/design-kit/icon-green.svg'
              "
            ></v-img>
          </template>
          <template v-else>
            <NuxtLink :to="item.to">
              <v-img
                style="background-color: lightgray"
                :height="150"
                :src="
                  item.media
                    ? `${baseURL}/${item.media}`
                    : 'https://nuxt.com/assets/design-kit/icon-green.svg'
                "
              ></v-img>
            </NuxtLink>
          </template>
          <v-card-text>
            <template v-if="item.href">
              <a :href="`${baseURL}/${item.href}`">
                {{ item.title }}
              </a>
            </template>
            <template v-else>
              <NuxtLink :to="item.to">
                {{ item.title }}
              </NuxtLink>
            </template>

            <div class="mt-4">
              <v-chip color="primary" dark class="ma-1">{{
                item.date?.split("T")[0]
              }}</v-chip>

              <v-chip color="success" dark class="ma-1" v-if="item.updated">{{
                item.updated?.split("T")[0]
              }}</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
