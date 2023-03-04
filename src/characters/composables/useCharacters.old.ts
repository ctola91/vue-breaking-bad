import breakingBadApi from "@/api/breakingBadApi";
import axios from "axios";
import { onMounted, ref } from "vue";
import type { Character } from "../interfaces/character";

// Si sacamos las propiedades reactivas fuera del composable function,
// se convierten en estado global
const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>();

export const useCharactersOld = () => {
  onMounted(async () => {
    await loadCharacters();
  });

  // loadCharacters se puede llamar desde el ciclo de vida de un component
  const loadCharacters = async () => {
    if (characters.value.length > 0) return;
    isLoading.value = true;
    try {
      const { data } = await breakingBadApi.get<Character[]>("/characters");
      characters.value = data;
      isLoading.value = false;
      hasError.value = false;
    } catch (error) {
      isLoading.value = false;
      hasError.value = true;
      if (axios.isAxiosError(error)) {
        return (errorMessage.value = error.message);
      }
      errorMessage.value = JSON.stringify(error);
    }
  };

  return {
    characters,
    isLoading,
    hasError,
    errorMessage,
  };
};
