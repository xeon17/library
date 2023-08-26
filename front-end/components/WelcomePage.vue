<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const { token } = storeToRefs(userStore);
const { apiUrl } = useRuntimeConfig().public;

interface IUser {
  name: string;
}

const { data: user, error } = await useFetch<IUser>("/auth/me", {
  method: "GET",
  baseURL: apiUrl,
  headers: {
    Authorization: "Bearer " + token.value,
  },
  pick: ["name"],
});

let firstName: string = "";
if (user?.value) {
  firstName = user.value.name.split(" ")[0];
}
</script>

<template>
  <div v-if="error">
    <p class="text-2xl">{{ error.message }}</p>
  </div>
  <div v-if="user" class="flex flex-col gap-1">
    <div class="flex flex-row items-center">
      <p class="text-2xl">Welcome back, {{ firstName }}</p>
      <nuxt-img alt="Wave icon" class="ml-2 w-5" src="/wave.png" />
    </div>
    <p class="text-sm text-gray-500">
      Discover, Imagine, Explore: Where Words Come Alive.
    </p>
  </div>
</template>

<style scoped></style>
