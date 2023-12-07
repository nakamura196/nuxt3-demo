<template>
  <v-container id="view">
    <v-row class="py-4">
      <v-col>
        <v-btn color="primary" v-on:click="addNode">push</v-btn>
      </v-col>
      <v-col>
        <div>クリックされたノード, {{ clickedIdList }}</div>
      </v-col>
    </v-row>

    <div id="cy"></div>
  </v-container>
</template>
<script setup lang="ts">
import cytoscape from "cytoscape";

let cy: any = null;

let count: number = 0;

const addNode = () => {
  cy.add([
    {
      group: "nodes",
      data: { id: "node" + count },
      position: { x: 300, y: 200 },
    },
  ]);

  count += 1;
};

const clickedIdList = ref<string[]>([]);

onMounted(() => {
  cy = cytoscape({
    container: document.getElementById("cy"),
    boxSelectionEnabled: false,
    autounselectify: true,
    style: cytoscape
      .stylesheet()
      .selector("node")
      .css({
        height: 80,
        width: 80,
        "background-fit": "cover",
        "border-color": "#000",
        "border-width": 3,
        "border-opacity": 0.5,
        content: "data(id)",
        "text-valign": "center",
      })
      .selector("edge")
      .css({
        width: 6,
        "target-arrow-shape": "triangle",
        "line-color": "#ffaaaa",
        "target-arrow-color": "#ffaaaa",
        "curve-style": "bezier",
      }),
    elements: {
      nodes: [
        { data: { id: "cat" } },
        { data: { id: "bird" } },
        { data: { id: "ladybug" } },
        { data: { id: "aphid" } },
        { data: { id: "rose" } },
        { data: { id: "grasshopper" } },
        { data: { id: "plant" } },
        { data: { id: "wheat" } },
      ],
      edges: [
        { data: { source: "cat", target: "bird" } },
        { data: { source: "bird", target: "ladybug" } },
        { data: { source: "bird", target: "grasshopper" } },
        { data: { source: "grasshopper", target: "plant" } },
        { data: { source: "grasshopper", target: "wheat" } },
        { data: { source: "ladybug", target: "aphid" } },
        { data: { source: "aphid", target: "rose" } },
      ],
    },
    layout: {
      name: "breadthfirst",
      directed: true,
      padding: 10,
    },
  });

  cy.on("click", "node", function (evt: { target: any }) {
    var node = evt.target;

    const nodeId = node.id();

    let clonedClickedIdList = [...clickedIdList.value];

    if (!clonedClickedIdList.includes(nodeId)) {
      clonedClickedIdList.push(nodeId);
    } else {
      clonedClickedIdList = clonedClickedIdList.filter((id) => id !== nodeId);
    }

    clickedIdList.value = clonedClickedIdList.slice(-2);

    addEdge();
  });

  const addEdge = () => {
    const [id1, id2] = clickedIdList.value;

    if (id1 && id2) {
      const edge = {
        group: "edges",
        data: { id: "edge" + count, source: id1, target: id2 },
      };

      count += 1;

      cy.add([edge]);
    }
  };
});
</script>
<style scoped>
#cy {
  width: 100%;
  height: 80vh;
  background-color: lightcyan;
}
</style>
