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
  <div class="flex items-center justify-end py-4">
    <div class="flex items-center gap-1">
      <div class="flex items-center pl-2">
        <nuxt-link to="/profile" class="flex items-center gap-1 text-sm text-blue-500">
          <Icon class="h-5 w-5" name="heroicons:user" />

          <div class="flex flex-row items-center gap-0.5">
            <p class="font-medium">
              {{ user.firstName }} {{ user.lastName }}
            </p>
            <Icon class="h-5 w-5 text-gray-500" name="heroicons:chevron-down" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
