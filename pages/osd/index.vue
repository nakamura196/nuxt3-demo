<script lang="ts" setup>
const { $OpenSeadragon } = useNuxtApp();

const { $config } = useNuxtApp();
const baseURL = $config.app.baseURL;

const config: any = {
  sequenceMode: true,
  id: "osd",
  prefixUrl: `${baseURL}/images/`,
  tileSources: [
    "https://dl.ndl.go.jp/api/iiif/1303379/R0000001/info.json"
  ]
};

// async
onMounted(() => {
  $OpenSeadragon(config);
});
</script>
<template>
  <div>
    <div
      id="osd"
      style="width: 100%;"
      :style="`height: 600px`"
    ></div>
  </div>
</template>