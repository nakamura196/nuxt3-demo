<template>
  <v-app-bar color="primary" dense dark flat>
    <v-app-bar-title>
      <nuxt-link
        :to="({ name: 'index' })"
        style="text-decoration: none; color: inherit"
        >{{ "Nuxt3 x IIIF Viewer" }}
      </nuxt-link>
    </v-app-bar-title>
  </v-app-bar>
</template>
