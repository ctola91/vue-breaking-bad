import type { RouteRecordRaw } from "vue-router";
import CharacterLayout from "@/characters/layout/CharacterLayout.vue";
import CharacterId from "../pages/CharacterId.vue";
import CharacterList from "../pages/CharacterList.vue";
import CharacterSearch from "../pages/CharacterSearch.vue";

const ROUTE_NAME = "characters";

export const characterRoute: RouteRecordRaw = {
  path: "/characters",
  redirect: `/${ROUTE_NAME}/list`,
  component: CharacterLayout,
  children: [
    {
      path: "by/:id",
      props: { title: "Por Id", visible: false },
      name: "character-id",
      component: CharacterId,
    },
    {
      path: `/${ROUTE_NAME}/list`,
      props: { title: "Lista Completa", visible: true },
      name: "character-list",
      component: CharacterList,
    },
    {
      path: `/${ROUTE_NAME}/search`,
      props: { title: "Busqueda", visible: true },
      name: "character-search",
      component: CharacterSearch,
    },
  ],
};
