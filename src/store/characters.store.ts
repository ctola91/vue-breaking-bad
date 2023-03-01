import type { Character } from "@/characters/interfaces/character";
import { reactive } from "vue";

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
  startLoadingCharacters() {
    // console.log("Start Loading Characters");
  },
  loadedCharacters(data: Character[]) {
    // this.characters.count = data.length;
    this.characters = {
      count: data.length,
      errorMessage: null,
      hasError: false,
      isLoading: false,
      list: data,
    };
  },
  loadCharactersFailed(error: string) {},
});

characterStore.startLoadingCharacters();

export default characterStore;
