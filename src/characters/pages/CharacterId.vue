<script setup lang="ts">
import { watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import useCharacter from "@/characters/composables/useCharacter";

const route = useRoute();
const router = useRouter();
const { id } = route.params as { id: string };

const { hasError, errorMessage, character, isLoading } = useCharacter(id);

watchEffect(() => {
  if (!isLoading.value && hasError.value) {
    router.replace("/characters");
  }
});

watch(
  isLoading,
  () => {
    console.log({
      isLoading: isLoading.value,
      hasError: hasError.value,
    });
  },
  { deep: true }
);
</script>
<template>
  <h1 v-if="isLoading">Loading...</h1>
  <h1 v-else-if="hasError">{{ errorMessage }}</h1>
  <div v-else-if="character">
    <!-- Si usamos directo el route.params.id preserva la reactividad -->
    <!-- <h1>Character {{ route.params.id }}</h1> -->
    <!-- Se pierde la reactividad, usar para componentes stateless generalmente -->

    <h1>{{ character.name }}</h1>
    <div class="character-container">
      <img :src="character.img" :alt="character.name" />
      <ul>
        <li>Apodo: {{ character.nickname }}</li>
        <li>Nacio: {{ character.birthday }}</li>
        <li>Serie: {{ character.category }}</li>
        <li>Ocupation: {{ character.occupation.join(", ") }}</li>
        <li>ACtor: {{ character.portrayed }}</li>
        <li>Estado: {{ character.status }}</li>
        <li>Temporadas: {{ character.appearance.join(", ") }}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.character-container {
  display: flex;
  flex-direction: row;
}
img {
  width: 150px;
  border-radius: 5px;
}
</style>
