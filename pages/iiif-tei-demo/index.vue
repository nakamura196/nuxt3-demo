<script setup lang="ts">
import { curation2tei } from "@nakamura196/iiif-tei";
const url = ref<string>(
  "https://mp.ex.nii.ac.jp/api/curation/json/2fa1f0b3-c8f7-4d99-8f12-d2f559f95ac7"
);

const xml_string = ref<string>("");

const convert = async () => {
  const xml_string_ = await curation2tei(url.value);
  xml_string.value = formatXML(xml_string_);
};

function formatXML(xmlString: string) {
  // ステップ1: XML文字列をパースする
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "application/xml");

  // エラーチェック
  const parseError = xmlDoc.getElementsByTagName("parsererror");
  if (parseError.length > 0) {
    throw new Error("Invalid XML: " + parseError[0].textContent);
  }

  // ステップ2: DOMオブジェクトを整形された文字列に変換する
  const serializer = new XMLSerializer();
  let formattedXML = serializer.serializeToString(xmlDoc);

  // インデントを追加する
  formattedXML = formattedXML.replace(/(>)(<)(\/*)/g, "$1\n$2$3");
  let pad = 0;
  formattedXML = formattedXML
    .split("\n")
    .map((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/) && pad !== 0) {
        pad -= 1;
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }
      pad += indent;
      return "  ".repeat(pad - indent) + node;
    })
    .join("\n");

  return formattedXML;
}
</script>
<template>
  <v-container>
    <h1>IIIF TEI Demo</h1>

    <p class="my-4">
      以下のライブラリを使用します。IIIF Curation
      ListをTEIのfacsimile要素に変換します。
    </p>

    <p class="my-4">
      <a href="https://github.com/nakamura196/iiif-tei" traget="_blank">
        https://github.com/nakamura196/iiif-tei
      </a>
    </p>

    <h2 class="my-4">試す</h2>

    <v-text-field
      class="mt-8"
      variant="outlined"
      v-model="url"
      label="URL of Curation List"
      clearable
      clear-icon="mdi-close-circle"
    ></v-text-field>

    <v-btn rounded variant="flat" color="primary" @click="convert"
      >Convert</v-btn
    >

    <pre class="mt-5">{{ xml_string }}</pre>

    <h2 class="my-4">使い方</h2>

    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/Y5JlrJbtgz8?si=Wv1YkEV_gbwDsE4L"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </v-container>
</template>
