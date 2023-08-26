<script setup>
definePageMeta({
  middleware: "auth",
  layout: false,
});
useSeoMeta({
  lang: "en",
  title: "Library - Login",
  ogTitle: "Library - Login",
  description: "Library Login Page",
  ogDescription: "Library App Login Page",
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
      <login-form></login-form>
    </template>
  </NuxtLayout>
</template>

<style scoped></style>
