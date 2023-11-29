<script setup lang="ts">
const posts = await queryContent("/blog/").sort({ date: -1 }).find();
</script>
<template>
  <v-container>
    <v-list>
      <v-list-item class="mb-2" v-for="post of posts">
        <NuxtLink :to="post._path">
          {{ post.title }}
        </NuxtLink>
      </v-list-item>
    </v-list>
  </v-container>
</template>
