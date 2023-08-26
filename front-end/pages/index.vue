<script setup>
definePageMeta({
  middleware: "auth",
  layout: "default",
});

useSeoMeta({
  lang: "en",
  title: "Library - Home",
  ogTitle: "Library - Home",
  description: "Library App Home Page",
  ogDescription: "Library App Home Page",
  ogImage: "/logo.png",
});
</script>

<template>
  <div class="flex flex-col gap-y-6">
    <welcome-page></welcome-page>
  </div>
</template>

<style scoped></style>
