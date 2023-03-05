import { computed, ref } from "vue";
import type { Character } from "@/characters/interfaces/character";
import breakingBadApi from "@/api/breakingBadApi";
import { useQuery } from "@tanstack/vue-query";

const characterSet = ref<{ [id: string]: Character }>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async (id: string): Promise<Character> => {
  if (characterSet.value[id]) {
    return characterSet.value[id];
  }
  const { data } = await breakingBadApi.get<Character[]>(`/characters/${id}`);

  // TODO: Add error 500

  return data[0];
};

const loadedCharacter = (character: Character) => {
  hasError.value = false;
  errorMessage.value = null;
  characterSet.value[character.char_id] = character;
};

const useCharacter = (id: string) => {
  const { isLoading } = useQuery(["characters", id], () => getCharacter(id), {
    onSuccess: loadedCharacter,
  });

  return {
    // Properties
    list: characterSet,
    hasError,
    errorMessage,
    // Getters
    character: computed<Character | null>(() => characterSet.value[id]),
    // Methods
  };
};

export default useCharacter;
