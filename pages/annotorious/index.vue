<script lang="ts" setup>
// Import OpenSeadragon and Annotorious from Nuxt's app instance
const { $OpenSeadragon, $Annotorious } = useNuxtApp();

// Access the configuration from Nuxt's app instance
const { $config } = useNuxtApp();
const baseURL = $config.app.baseURL;

// IIIF manifest URL
const manifestUri = "https://dl.ndl.go.jp/api/iiif/3437686/manifest.json";

// Define interfaces for annotation and selection
interface Annotation {
  id: string;
  body: {
    type: string;
    purpose: string;
    value: string;
  }[];
}

interface Selection {
  body: {
    type: string;
    purpose: string;
    value: string;
  }[];
}

// Reactive object to store annotations for each page
const annotationsMap = ref<{
  [key: number]: Annotation[];
}>({});

// onMounted lifecycle hook to initialize the viewer and annotations
onMounted(async () => {
  // Fetch the IIIF manifest
  const response = await fetch(manifestUri);
  const manifest = await response.json();

  // Extract canvas information from the manifest
  const canvases = manifest.sequences[0].canvases;

  // Prepare tile sources for each canvas
  const tileSources = canvases.map((canvas: any) => {
    return canvas.images[0].resource.service["@id"] + "/info.json";
  });

  // Configure and initialize the OpenSeadragon viewer
  const config = {
    sequenceMode: true, // Enable sequence mode for multiple canvases
    id: "osd", // DOM element ID for the viewer
    prefixUrl: `${baseURL}/images/`, // URL prefix for OpenSeadragon images
    tileSources, // Tile sources extracted from the manifest
  };
  const viewer = $OpenSeadragon(config);

  // Add handler to clear and display annotations on page navigation
  viewer.addHandler("page", () => {
    anno.clearAnnotations();
    showCurrentCanvasAnnotations();
  });

  // Function to display annotations for the current canvas
  const showCurrentCanvasAnnotations = () => {
    const index = viewer.currentPage();
    const annotationsMap_ = annotationsMap.value;

    if (annotationsMap_[index]) {
      annotationsMap_[index].forEach((annotation: Annotation) => {
        anno.addAnnotation(annotation);
      });
    }
  };

  // Initialize Annotorious for the viewer
  const anno = $Annotorious(viewer);
  anno.disableEditor = true; // Disable the annotation editor

  // Event handler for creating a new annotation selection
  anno.on("createSelection", async function (selection: Selection) {
    // Add a tagging body to the selection
    selection.body = [
      {
        type: "TextualBody",
        purpose: "tagging",
        value: "", // Initial value is an empty string
      },
    ];

    // Update and save the selected annotation
    await anno.updateSelected(selection);
    await anno.saveSelected();

    // Save the annotation to the annotations map
    saveToAnnotationsMap();
  });

  // Event handler for updating an existing annotation
  anno.on(
    "updateAnnotation",
    function (/*annotation: Annotation, overrideId: string*/) {
      // Save updated annotations to the annotations map
      saveToAnnotationsMap();
    }
  );

  // Function to save current annotations to the annotations map
  const saveToAnnotationsMap = () => {
    const index = viewer.currentPage();
    annotationsMap.value[index] = anno.getAnnotations();
  };
});
</script>

<template>
  <v-row>
    <!-- Column for the OpenSeadragon viewer -->
    <v-col>
      <div
        id="osd"
        style="width: 100%; background-color: black; height: 90vh"
      ></div>
    </v-col>

    <!-- Column for displaying annotations -->
    <v-col>
      <v-container>
        <v-row>
          <v-col>
            <h1>
              Annotoriousを用いたIIIFマニフェストファイルへのアノテーション付与（複数キャンバス対応）
            </h1>

            <p class="my-2">
              シフトキーを押しながら範囲を選択してアノテーションを追加
            </p>

            <div style="height: 80vh; overflow-y: auto">
              <!-- Card for each page's annotations -->
              <v-card
                class="my-2"
                variant="outlined"
                v-for="(annotations, index) in annotationsMap"
                :key="index"
              >
                <v-card-title> Page {{ Number(index) + 1 }} </v-card-title>
                <v-card-text>
                  <pre v-for="annotation in annotations"
                    >{{ annotation }}
                </pre
                  >
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>
