<script setup lang="ts">
import "@digirati/canvas-panel-web-components";

const route = useRoute();
const manifest: string = route.query.manifest
  ? String(route.query.manifest)
  : "https://dl.ndl.go.jp/api/iiif/3437686/manifest.json";

const pos: number = route.query.pos ? Number(route.query.pos) : -1;

let canvas_id: string = route.query.canvas ? String(route.query.canvas) : "";

const { data: results_ }: any = await useFetch(manifest);

const data = results_.value;

if (!canvas_id) {
  const index = pos === -1 ? 0 : pos - 1;

  let version = 3;
  if (
    data["@context"] &&
    data["@context"] === "http://iiif.io/api/presentation/2/context.json"
  ) {
    version = 2;
  }

  if (version === 3) {
    canvas_id = results_.value.items[index].id;
  } else {
    const canvases = data.sequences[0].canvases;
    canvas_id = canvases[index]["@id"];
  }
}
</script>
<template>
  <v-container>
    <canvas-panel
      height="600"
      :canvas-id="canvas_id"
      :manifest-id="manifest"
    ></canvas-panel>
  </v-container>
</template>
