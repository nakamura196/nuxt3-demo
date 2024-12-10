<script lang="ts" setup>
// @ts-ignore
import wikidataLookup from "wikidata-entity-lookup";
// @ts-ignore
import viafLookup from "viaf-entity-lookup";
// @ts-ignore
import jpsLookup from "jps-entity-lookup";
// @ts-ignore
import hutimeLookup from "hutime-entity-lookup";

// 定数定義
const HEADERS = [
  { title: "Name", key: "name", width: "30%" },
  { title: "Description", key: "description", width: "50%" },
  { title: "URI", key: "uri" },
];

const REPOSITORIES = [
  "https://github.com/cwrc/wikidata-entity-lookup",
  "https://github.com/cwrc/viaf-entity-lookup",
  "https://github.com/nakamura196/jps-entity-lookup",
  "https://github.com/nakamura196/hutime-entity-lookup",
];

const TYPES = [
  {
    title: "Person",
    value: "findPerson",
  },
  {
    title: "Place",
    value: "findPlace",
  },
  {
    title: "Organization",
    value: "findOrganization",
  },
  {
    title: "Title",
    value: "findTitle",
  },
  {
    title: "RS",
    value: "findRS",
  },
];

// インターフェース定義
interface Item {
  name: string;
  search: (query: string) => Promise<Entity[]>;
  results: Entity[];
}

interface Entity {
  id: string;
  name: string;
  description: string;
  uri: string;
}

// 反応変数
const query = ref<string>("");
const type = ref<string>(TYPES[0].value);

const config = ref<Item[]>([
  {
    name: "JPS",
    search: jpsLookup,
    results: [],
  },
  {
    name: "HuTime",
    search: hutimeLookup,
    results: [],
  },
  {
    name: "Wikidata",
    search: wikidataLookup,
    results: [],
  },
  {
    name: "VIAF",
    search: viafLookup,
    results: [],
  },
]);

// 検索関数
const search = async () => {
  for (const source of config.value) {
    // @ts-ignore
    const search: {
      [key: string]: (query: string) => Promise<Entity[]>;
    } = source.search;
    // console.log({ search });
    try {
      if (!search[type.value]) {
        console.error(`Error: ${source.name} does not support ${type.value}`);
        continue;
      }
      const result = await search[type.value](query.value);
      source.results = result;
    } catch (error) {
      console.error(`Error fetching data from ${source.name}:`, error);
    }
  }
};
</script>
<template>
  <v-container>
    <h1>Entity Lookup</h1>

    <ul class="my-4">
      <li v-for="repository in REPOSITORIES">
        <a :href="repository" target="_blank">{{ repository }}</a>
      </li>
    </ul>

    <v-card class="my-4" variant="outlined">
      <v-card-text>
        <v-text-field variant="outlined" label="Search" v-model="query" />
        <v-radio-group v-model="type" inline>
          <v-radio
            v-for="value in TYPES"
            :key="value.value"
            :label="value.title"
            :value="value.value"
          ></v-radio>
        </v-radio-group>
        <v-btn rounded variant="flat" color="primary" @click="search">
          Search
        </v-btn>
      </v-card-text>
    </v-card>

    <template v-for="source in config" :key="source.name">
      <h2 class="mt-8">{{ source.name }}</h2>
      <v-data-table
        :headers="HEADERS"
        :items="source.results"
        density="compact"
      >
        <template v-slot:item.uri="{ item }">
          <a :href="item.uri" target="_blank">Detail</a>
        </template>
      </v-data-table>
    </template>
  </v-container>
</template>
