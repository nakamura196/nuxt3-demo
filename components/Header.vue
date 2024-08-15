<template>
  <v-app-bar color="primary" density="compact" flat>
    <v-app-bar-title>
      <nuxt-link
        :to="{ name: 'index' }"
        style="text-decoration: none; color: inherit"
        >{{ "Nuxt3 Demo" }}
      </nuxt-link>
    </v-app-bar-title>
  </v-app-bar>
</template>
