<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const { id } = route.params as { id: string };
</script>
<template>
  <div>
    <!-- Si usamos directo el route.params.id preserva la reactividad -->
    <!-- <h1>Character {{ route.params.id }}</h1> -->
    <!-- Se pierde la reactividad, usar para componentes stateless generalmente -->
    <h1>Character {{ id }}</h1>
  </div>
</template>
<style scoped></style>
