import { computed, ref } from "vue";
import type { Character } from "@/characters/interfaces/character";
import breakingBadApi from "@/api/breakingBadApi";
import { useQuery } from "@tanstack/vue-query";

const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(false);
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharactersCacheFirst = async (): Promise<Character[]> => {
  if (characters.value.length > 0) {
    return characters.value;
  }

  const { data } = await breakingBadApi.get<Character[]>("/characters");
  return data;
};

const loadedCharacters = (data: Character[]) => {
  hasError.value = false;
  errorMessage.value = null;
  characters.value = data.filter(
    (character) => ![14, 17, 39].includes(character.char_id)
  );
};

const useCharacters = () => {
  const { isLoading } = useQuery(["characters"], getCharactersCacheFirst, {
    onSuccess: loadedCharacters,
    // onSuccess(data) {
    //   loadedCharacters(data);
    // },
  });

  return {
    // properties
    characters,
    isLoading,
    hasError,
    errorMessage,
    // Getters
    count: computed(() => characters.value.length),
    // Methods
  };
};

export default useCharacters;
