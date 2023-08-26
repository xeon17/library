<script setup>
definePageMeta({
  middleware: "auth",
  layout: false,
});
useSeoMeta({
  lang: "en",
  title: "Library - Reset password",
  ogTitle: "Library - Reset password",
  description: "Library Reset password Page",
  ogDescription: "Library App Reset password Page",
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
      <LazyResetPasswordForm/>
    </template>
  </NuxtLayout>
</template>

<style scoped></style>
