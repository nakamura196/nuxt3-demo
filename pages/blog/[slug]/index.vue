<script setup lang="ts">
const route = useRoute();
const params = route.params;
const slug = params.slug;
const post = await queryContent(`/blog/${slug}`).findOne();
</script>
<template>
  <v-container>
    <h2 class="mb-4">{{ post.title }}</h2>
    <ContentRenderer :value="post" />
  </v-container>
</template>
