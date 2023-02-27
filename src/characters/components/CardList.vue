<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useCharacters } from "@/characters/composables/useCharacters";
import breakingBadApi from "@/api/breakingBadApi";
import type { Character } from "../interfaces/character";
import CharacterCard from "@/characters/components/CharacterCard.vue";

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
      resolve(
        data.filter((character) => ![14, 17, 39].includes(character.char_id))
      );
    }, 1);
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
  <div class="card-list">
    <CharacterCard
      v-for="character of characters"
      :key="character.char_id"
      :character="character"
    />
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
