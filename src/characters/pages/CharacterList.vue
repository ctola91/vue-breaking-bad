<script setup lang="ts">
import CardList from "@/characters/components/CardList.vue";
import { useQuery } from "@tanstack/vue-query";
import breakingBadApi from "@/api/breakingBadApi";
import type { Character } from "../interfaces/character";
import characterStore from "../../store/characters.store";
import axios from "axios";

const props = defineProps<{ title: string; visible: boolean }>();

const getCharactersCacheFirst = async (): Promise<Character[]> => {
  if (characterStore.characters.count > 0) {
    return characterStore.characters.list;
  }

  const { data } = await breakingBadApi.get<Character[]>("/characters");
  return data;
};

useQuery(["characters"], getCharactersCacheFirst, {
  onSuccess(data) {
    characterStore.loadedCharacters(data);
  },
  onError(error) {
    axios.isAxiosError(error);
  },
});
</script>
<template>
  <div>
    <h1 v-if="characterStore.characters.isLoading">Loading...</h1>
    <div v-else-if="characterStore.characters.hasError">
      <h1>Error al cargar</h1>
      <p>{{ characterStore.characters.errorMessage }}</p>
    </div>
    <template v-else>
      <h2>{{ props.title }}</h2>
      <CardList :characters="characterStore.characters.list" />
    </template>
  </div>
</template>
<style scoped></style>
