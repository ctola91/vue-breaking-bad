import type { RouteRecordRaw } from "vue-router";
import CharacterLayout from "@/characters/layout/CharacterLayout.vue";
import CharacterId from "../pages/CharacterId.vue";
import CharacterList from "../pages/CharacterList.vue";
import CharacterSearch from "../pages/CharacterSearch.vue";

export const characterRoute: RouteRecordRaw = {
  path: "/characters",
  redirect: "/characters/list",
  component: CharacterLayout,
  children: [
    { path: "by/id", name: "character-id", component: CharacterId },
    { path: "list", name: "character-list", component: CharacterList },
    { path: "Search", name: "character-search", component: CharacterSearch },
  ],
};
