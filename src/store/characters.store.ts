import type { Character } from "@/characters/interfaces/character";
import { reactive } from "vue";
import breakingBadApi from "@/api/breakingBadApi";

interface Store {
  characters: {
    list: Character[];
    count: number;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
  };

  startLoadingCharacters: () => void;
  loadedCharacters: (data: Character[]) => void;
  loadCharactersFailed: (error: string) => void;
}
// Initial State
const characterStore = reactive<Store>({
  characters: {
    count: 0,
    errorMessage: null,
    hasError: false,
    isLoading: false,
    list: [],
  },

  // Methods
  async startLoadingCharacters() {
    const { data } = await breakingBadApi.get<Character[]>("/characters");
    this.loadedCharacters(data);
  },
  loadedCharacters(data: Character[] | string) {
    if (typeof data === "string") {
      return this.loadCharactersFailed(
        "La respuesta no es un arreglo de personajes."
      );
    }
    const characters = data.filter(
      (character) => ![14, 17, 39].includes(character.char_id)
    );
    this.characters = {
      count: characters.length,
      errorMessage: null,
      hasError: false,
      isLoading: false,
      list: characters,
    };
  },
  loadCharactersFailed(error: string) {
    this.characters = {
      count: 0,
      errorMessage: error,
      hasError: true,
      isLoading: false,
      list: []
    }
  },
});

// characterStore.startLoadingCharacters();

export default characterStore;
