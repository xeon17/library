<script setup>
definePageMeta({
  middleware: "auth",
  layout: "default",
});

useSeoMeta({
  lang: "en",
  title: "Library - Profile",
  ogTitle: "Library - Profile",
  description: "Library App Profile Page",
  ogDescription: "Library App Profile Page",
  ogImage: "/logo.png",
});

import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const { userId } = storeToRefs(userStore);
</script>

<template>
  <user-profile :id="userId"></user-profile>
  <div class="flex gap-x-6">
    <claimed-books :id="userId"></claimed-books>
    <returned-books :id="userId"></returned-books>
  </div>
</template>

<style scoped></style>
