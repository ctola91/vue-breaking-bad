import breakingBadApi from "@/api/breakingBadApi";
import { ref } from "vue";
import type { Character } from "../interfaces/character";

export const useCharacters = () => {
  const characters = ref<Character[]>([]);
  const isLoading = ref<boolean>(true);

  breakingBadApi
    .get<Character[]>("/characters")
    .then((resp) => {
      // console.log({ data: resp.data[0].name });
      const name = resp.data[0].name;
      console.log({ name });
      characters.value = resp.data;
      isLoading.value = false;
    })
    .catch(() => {
      isLoading.value = false;
    });

  return {
    characters,
    isLoading,
  };
};
