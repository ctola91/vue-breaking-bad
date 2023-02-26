<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/shared/components/NavBar.vue";
import { characterRoute } from "../router/index";
import type { RouterLink } from "../../router/link-routes";

const routeLink: RouterLink[] = characterRoute
  .children!.filter((route) => (route.props as { visible: boolean }).visible)
  .map((route) => ({
    name: route.name as string,
    path: route.path,
    title: (route.props as { title: string; visible: boolean }).title,
  }));
</script>
<template>
  <div>
    <h1>Personajes</h1>
    <!-- Navbar -->
    <NavBar :show-icon="false" :links="routeLink" />
    <!-- Ro uterView + Suspense -->
    <!-- <Suspense> -->
      <RouterView />
    <!-- </Suspense> -->
  </div>
</template>
<style scoped></style>
