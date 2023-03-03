<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Character } from "@/characters/interfaces/character";
import characterStore from "../../store/characters.store";
import breakingBadApi from "@/api/breakingBadApi";
import { useQuery } from "@tanstack/vue-query";

const route = useRoute();
const { id } = route.params as { id: string };

const getCharacterCacheFirst = async (
  characterId: string
): Promise<Character> => {
  if (characterStore.checkIdInStore(characterId)) {
    return characterStore.ids.list[characterId];
  }
  const { data } = await breakingBadApi.get<Character[]>(
    `/characters/${characterId}`
  );
  return data[0];
};

const { data } = useQuery(
  ["characters", id],
  () => getCharacterCacheFirst(id),
  {
    onSuccess(character) {
      characterStore.loadedCharacter(character);
    },
  }
);
</script>
<template>
  <div>
    <!-- Si usamos directo el route.params.id preserva la reactividad -->
    <!-- <h1>Character {{ route.params.id }}</h1> -->
    <!-- Se pierde la reactividad, usar para componentes stateless generalmente -->
    <h1>Character {{ id }}</h1>
    <code>{{ data }}</code>
  </div>
</template>
<style scoped></style>
