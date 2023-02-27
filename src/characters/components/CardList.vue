<script setup lang="ts">
import { useCharacters } from "@/characters/composables/useCharacters";

// Con Suspense
// const { data } = await breakingBadApi.get<Character[]>("/characters");
// const characters = ref<Character[]>(data);
// Sin Suspense

const { isLoading, characters } = useCharacters();
</script>
<template>
  <h1 v-if="isLoading">Loading</h1>
  <h1>ERROR!!!</h1>
  <ul>
    <li v-for="{ char_id, name } of characters" :key="char_id">
      {{ name }}
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
