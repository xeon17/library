<script setup>
definePageMeta({
  middleware: "auth",
  layout: false,
});
useSeoMeta({
  lang: "en",
  title: "Patient Portal - Login",
  ogTitle: "Patient Portal - Login",
  description: "Patient Portal App Login Page",
  ogDescription: "Patient Portal App Login Page",
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
      <Login></Login>
    </template>
  </NuxtLayout>
</template>

<style scoped></style>
