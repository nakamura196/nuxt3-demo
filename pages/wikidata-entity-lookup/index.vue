<script lang="ts" setup>
// @ts-ignore
import wikidataLookup from "wikidata-entity-lookup";

interface Entity {
  id: string;
  name: string;
  description: string;
  uri: string;
}

const query = ref<string>("");
const results = ref<Entity[]>([]);

const search = () => {
  wikidataLookup.findPerson(query.value).then((result: Entity[]) => {
    results.value = result;
  });
};
</script>
<template>
  <v-container>
    <h1>Wikidata Entity Lookup</h1>

    <p class="my-4">
      <a href="https://github.com/cwrc/wikidata-entity-lookup" target="_blank"
        >https://github.com/cwrc/wikidata-entity-lookup</a
      >
    </p>

    <v-card class="my-4" variant="outlined">
      <v-card-text>
        <v-text-field variant="outlined" label="Search" v-model="query" />
        <v-btn rounded variant="flat" color="primary" @click="search"
          >Search</v-btn
        >
      </v-card-text>
    </v-card>

    <v-table class="my-8">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>URI</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results">
          <td>{{ result.name }}</td>
          <td>{{ result.description }}</td>
          <td>
            <a :href="result.uri" target="_blank"> Detail </a>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
