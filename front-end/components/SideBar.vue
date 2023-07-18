<script setup>
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

const route = useRoute();
const currentPath = computed(() => route.path);
</script>

<template>
  <div class="flex h-screen flex-col bg-white pt-4">
    <div class="mx-4 flex h-10 w-32 items-center">
      <nuxt-link to="/">
        <nuxt-img src="/logo.png" alt="Logo" />
      </nuxt-link>
    </div>
    <nav aria-label="Main Nav" class="mt-4 flex flex-col space-y-1">
      <nuxt-link
        to="/"
        class="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700"
        :class="{
          'bg-gray-100 text-gray-700': currentPath === '/',
          'bg-white text-gray-500': currentPath !== '/',
        }"
      >
        <Icon
          class="h-5 w-5 opacity-75"
          :class="currentPath === '/' ? 'text-blue-500' : 'text-gray-500'"
          name="heroicons:home"
        />
        <span
          class="text-sm font-medium"
          :class="currentPath === '/' ? 'text-blue-500' : 'text-gray-500'"
        >
          Home
        </span>
      </nuxt-link>

      <nuxt-link
        to="/students"
        class="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700"
        :class="{
          'bg-gray-100 text-gray-700': currentPath === '/students',
          'text-gray-500 hover:bg-gray-100': currentPath !== '/students',
        }"
      >
        <Icon
          class="h-5 w-5 opacity-75"
          :class="
            currentPath === '/appointments' ? 'text-blue-500' : 'text-gray-500'
          "
          name="material-symbols:local-library-outline-rounded"
        />
        <span
          class="text-sm font-medium"
          :class="
            currentPath === '/appointments' ? 'text-blue-500' : 'text-gray-500'
          "
        >
          Students
        </span>
      </nuxt-link>

      <nuxt-link
        to="/librarians"
        class="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700"
        :class="{
          'bg-gray-100 text-gray-700': currentPath === '/librarians',
          'text-gray-500 hover:bg-gray-100': currentPath !== '/librarians',
        }"
      >
        <Icon
          class="h-5 w-5 opacity-75"
          :class="
            currentPath === '/prescriptions' ? 'text-blue-500' : 'text-gray-500'
          "
          name="heroicons:user-group"
        />
        <span
          class="text-sm font-medium"
          :class="
            currentPath === '/prescriptions' ? 'text-blue-500' : 'text-gray-500'
          "
        >
          Librarians
        </span>
      </nuxt-link>

      <nuxt-link
        to="/books"
        class="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-gray-700"
        :class="{
          'bg-gray-100 text-gray-700': currentPath === '/books',
          'text-gray-500 hover:bg-gray-100': currentPath !== '/books',
        }"
      >
        <Icon
          class="h-5 w-5 opacity-75"
          :class="
            currentPath === '/results' ? 'text-blue-500' : 'text-gray-500'
          "
          name="heroicons:book-open"
        />
        <span
          class="text-sm font-medium"
          :class="
            currentPath === '/results' ? 'text-blue-500' : 'text-gray-500'
          "
        >
          Books
        </span>
      </nuxt-link>
      <details class="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <div class="flex items-center gap-2">
            <Icon class="h-5 w-5 opacity-75" name="heroicons:user" />
            <span class="text-sm font-medium"> Account </span>
          </div>

          <span class="shrink-0 transition duration-300 group-open:-rotate-180">
            <Icon class="h-5 w-5 opacity-75" name="mdi:chevron-down" />
          </span>
        </summary>

        <nav aria-label="Account Nav" class="mt-2 flex flex-col px-4">
          <nuxt-link
            to="/profile"
            class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <Icon
              class="h-5 w-5 opacity-75"
              name="mdi:card-account-details-outline"
            />
            <span class="text-sm font-medium"> Details </span>
          </nuxt-link>
          <button
            type="button"
            class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            @click="userStore.logout()"
          >
            <Icon
              class="h-5 w-5 opacity-75"
              name="material-symbols:logout-rounded"
            />
            <span class="text-sm font-medium"> Logout </span>
          </button>
        </nav>
      </details>
    </nav>
  </div>
</template>

<style scoped></style>
