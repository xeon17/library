<script setup>
definePageMeta({
  middleware: "auth",
  layout: false,
});
useSeoMeta({
  lang: "en",
  title: "Library - Registration",
  ogTitle: "Library - Registration",
  description: "Library App Registration Page",
  ogDescription: "Library App Registration Page",
  ogImage: "/logo.png",
});
useHead({
  link: [
    {
      rel: "icon",
      type: "image/icon",
      href: "/favicon.ico",
    },
  ],
});
</script>

<template>
  <NuxtLayout name="auth">
    <template #image>
      <nuxt-img alt="Login image" src="/loginImage.jpg" />
    </template>
    <template #content>
      <registration-form></registration-form>
    </template>
  </NuxtLayout>
</template>

<style scoped></style>
