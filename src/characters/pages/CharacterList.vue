<script setup lang="ts">
import CardList from "@/characters/components/CardList.vue";
import { useQuery } from "@tanstack/vue-query";
import breakingBadApi from "@/api/breakingBadApi";
import type { Character } from "../interfaces/character";
import characterStore from "../../store/characters.store";

const props = defineProps<{ title: string; visible: boolean }>();

const getCharacters = async (): Promise<Character[]> => {
  const { data } = await breakingBadApi.get<Character[]>("/characters");
  return data.filter((character) => ![14, 17, 39].includes(character.char_id));
};

const { isLoading, data: characters } = useQuery(
  ["characters"],
  getCharacters,
  {
    onSuccess(data) {
      characterStore.loadedCharacters(data);
    },
  }
);
</script>
<template>
  <div>
    <h1 v-if="characterStore.characters.isLoading">Loading...</h1>
    <template v-else>
      <h2>{{ props.title }}</h2>
      <CardList :characters="characterStore.characters.list" />
    </template>
  </div>
</template>
<style scoped></style>
