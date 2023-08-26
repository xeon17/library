<script setup lang="ts">
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const { token } = storeToRefs(userStore);
const { apiUrl } = useRuntimeConfig().public;

interface IUser {
  name: string;
  photo: string;
}

const { data: user, error } = await useFetch<IUser>("/auth/me", {
  method: "GET",
  baseURL: apiUrl,
  headers: {
    Authorization: "Bearer " + token.value,
  },
  pick: ["name", "photo"],
});
</script>

<template>
  <div v-if="error">
    <p class="text-2xl">{{ error.message }}</p>
  </div>
  <div v-if="user" class="flex items-center justify-end py-4">
    <div class="flex items-center gap-1">
      <div class="flex items-center pl-2">
        <nuxt-link
          to="/profile"
          class="flex items-center gap-1 text-sm text-blue-500"
        >
          <UAvatar :src="getImageSource(user.photo)" :alt="user.name" />

          <div class="flex flex-row items-center gap-0.5">
            <p class="font-medium">{{ user.name }}</p>
            <Icon class="h-5 w-5 text-gray-500" name="heroicons:chevron-down" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
