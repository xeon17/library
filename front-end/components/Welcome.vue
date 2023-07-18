<script setup>
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userId } = storeToRefs(userStore);
const apiUrl = "http://localhost:8080/api/v1/users/me";

const { data: user } = await useFetch(apiUrl, {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
  params: {
    id: userId.value,
  },
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex flex-row items-center">
      <p class="text-2xl">Welcome back, {{ user.firstName }}</p>
      <nuxt-img alt="Wave icon" class="ml-2 w-5" src="/wave.png" />
    </div>
    <p class="text-sm text-gray-500">Discover, Imagine, Explore: Where Words Come Alive.</p>
  </div>
</template>

<style scoped></style>
