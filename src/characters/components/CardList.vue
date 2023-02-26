<script setup lang="ts">
import breakingBadApi from "@/api/breakingBadApi";
import type { Character } from "@/characters/interfaces/character";

breakingBadApi.get<Character[]>("/characters").then((resp) => {
  // console.log({ data: resp.data[0].name });
  const name = resp.data[0].name;
  console.log({ name });
});
</script>
<template>
  <ul>
    <li>Hola</li>
    <li>Hola</li>
    <li>Hola</li>
  </ul>
</template>

<style lang="scss" scoped></style>
