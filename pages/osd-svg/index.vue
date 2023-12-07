<script lang="ts" setup>
import OpenSeadragon from 'openseadragon'
const { $OpenSeadragon } = useNuxtApp();

const { $config } = useNuxtApp();
const baseURL = $config.app.baseURL;

const config: any = {
  sequenceMode: true,
  id: "osd",
  prefixUrl: `${baseURL}/images/`,
  tileSources: [
    "https://dl.ndl.go.jp/api/iiif/1303379/R0000001/info.json"
  ],
  width: 1
};

let viewer: OpenSeadragon.Viewer = null!;

// async
onMounted(() => {
  viewer = $OpenSeadragon(config);

  var overlay = viewer.svgOverlay();

  const node = overlay.node();

  const rect3 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  const d = "M 0.5 0.1 L 0.8 0.5 L 0.5 0.6 L 0.2 0.5 Z"
  rect3.setAttribute("d", d);
  rect3.setAttribute("fill", "rgba(255, 0, 0, 0.5)");
  node.appendChild(rect3);
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