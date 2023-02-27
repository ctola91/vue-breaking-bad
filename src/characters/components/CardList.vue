<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useCharacters } from "@/characters/composables/useCharacters";
import breakingBadApi from "@/api/breakingBadApi";
import type { Character } from "../interfaces/character";

//! 1- Normal Suspense
// Con Suspense
// const { data } = await breakingBadApi.get<Character[]>("/characters");
// const characters = ref<Character[]>(data);

//! 2- Composable functions
// Sin Suspense
// const { isLoading, characters, hasError, errorMessage } = useCharacters();

const getCharactersSlow = async (): Promise<Character[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const { data } = await breakingBadApi.get<Character[]>("/characters");
      resolve(data);
    }, 3000);
  });
};

//! 3- TanStack Query
const {
  isLoading,
  isError,
  data: characters,
  error,
} = useQuery(["characters"], getCharactersSlow, {
  cacheTime: 1000 * 60,
  refetchOnReconnect: "always",
});
</script>
<template>
  <h1 v-if="isLoading">Loading</h1>
  <h1 v-if="isError">{{ error }}</h1>
  <ul>
    <li v-for="{ char_id, name } of characters" :key="char_id">
      {{ name }}
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
