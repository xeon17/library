<script setup>
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { userId } = storeToRefs(userStore);
const apiUrl = "http://localhost:8080/api/v1/users/";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { data: user } = await useFetch(apiUrl + props.id, {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
});
</script>

<template>
  <div class="flex flex-row gap-x-4">
    <div
      class="flex flex-row items-center justify-center rounded-md bg-white px-16 py-16 shadow-default"
    >
      <section class="flex flex-col items-center gap-y-6">
        <div class="h-28 w-28">
          <nuxt-img
            class="h-full w-full rounded-full object-cover object-center"
            :src="getImageSource(user.photo)"
            alt="Default picture"
          />
        </div>
        <div class="flex flex-col items-center">
          <p class="text-2xl font-bold">
            {{ user.firstName }} {{ user.lastName }}
          </p>
          <p class="text-sm text-gray-600 opacity-75">
            {{ user.email }}
          </p>
        </div>
      </section>
    </div>
    <div
      class="flex flex-col justify-around rounded-md bg-white px-4 py-6 shadow-default"
    >
      <div class="grid grid-cols-3 gap-2">
        <div class="w-17 p-2">
          <p class="text-gray-500 opacity-75">Gender</p>
          <p>{{ user.gender || "Unknown" }}</p>
        </div>
        <div class="w-17 p-2">
          <p class="text-gray-500 opacity-75">Birthday</p>
          <p>{{ formatDate(user.birthDate) || "Unknown" }}</p>
        </div>
        <div class="w-17 p-2">
          <p class="text-gray-500 opacity-75">Username</p>
          <p>{{ user.username || "Unknown" }}</p>
        </div>
        <div class="w-17 p-2">
          <p class="text-gray-500 opacity-75">Street Address:</p>
          <p>{{ user.address || "Unknown" }}</p>
        </div>
        <div class="w-17 p-2">
          <p class="text-gray-500 opacity-75">City</p>
          <p>{{ user.city || "Unknown" }}</p>
        </div>
        <div class="w-17 p-2">
          <p class="text-gray-500 opacity-75">Country:</p>
          <p>{{ user.city || "Unknown" }}</p>
        </div>
        <div class="w-17 p-2">
          <p class="text-gray-500 opacity-75">Registered Date:</p>
          <p>{{ formatDate(user.createdAt) || "Unknown" }}</p>
        </div>
      </div>
      <div v-if="userId === id">
        <button
          type="button"
          class="flex items-center rounded border border-blue-500 px-4 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
          @click="navigateTo('/profile/edit')"
        >
          <Icon class="mr-1 h-5 w-5" name="heroicons:pencil-square" />
          Edit profile
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
