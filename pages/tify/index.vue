<script setup lang="ts">
const { $Tify } = useNuxtApp();

const route = useRoute();
const manifest: string = route.query.manifest
  ? String(route.query.manifest)
  : "https://dl.ndl.go.jp/api/iiif/3437686/manifest.json";

onMounted(() => {
  const tify = new $Tify({
    manifestUrl: manifest,
  });
  tify.mount("#tify");
});
</script>
<template>
  <div id="tify" style="height: 640px"></div>
</template>
