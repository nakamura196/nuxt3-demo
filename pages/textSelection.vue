<script setup lang="ts">
import { useTextSelection } from '@vueuse/core'
const { rects, text } = useTextSelection()
const selectedStyle = computed(() => text.value ? 'text-primary' : 'text-gray')
</script>

<template>
  <v-container>
    <p class="my-5">
      You can select any text on the page.
    </p>
    <p>
      <strong>Selected Text:</strong>
      <em
        :class="selectedStyle"
      >{{ text || 'No selected' }}</em>
    </p>
    <p>
      <strong>Selected rects:</strong>
      <pre lang="json">{{ rects }}</pre>
    </p>
  </v-container>
</template>