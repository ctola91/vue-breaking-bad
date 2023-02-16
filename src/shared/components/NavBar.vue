<script setup lang="ts">
import type { RouterLink } from "@/router/link-routes";

interface Props {
  title: string;
  bar?: number;
  links: RouterLink[];
}

const props = withDefaults(defineProps<Props>(), {
  title: "no title",
});
</script>
<template>
  <nav>
    <img src="@/assets/logo.svg" alt="Vue logo" height="25" width="25" />
    <span>{{ props.title }}</span>

    <RouterLink v-for="link of props.links" :key="link.path" :to="link.path">{{
      link.title
    }}</RouterLink>
  </nav>
</template>
<style scoped>
nav {
  align-items: flex-start;
  display: flex;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
  width: 100%;
}
img {
  margin-right: 5px;
}
span {
  margin-right: 10px;
}
a {
  margin-right: 5px;
}
</style>
