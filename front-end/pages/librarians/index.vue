<script setup>
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const { userId, role } = storeToRefs(userStore);

const { apiUrl } = useRuntimeConfig().public;
const removeVisible = ref(false);
const currentlySelectedLibrarian = ref();
const search = ref();
const librarians = ref([]);

definePageMeta({
  middleware: "auth",
  layout: "default",
});

useSeoMeta({
  lang: "en",
  title: "Library - Librarians",
  ogTitle: "Library - Librarians",
  description: "Library App Librarians Page",
  ogDescription: "Library App Librarians Page",
  ogImage: "/logo.png",
});

const { data, error, refresh } = await useFetch(apiUrl + '/users', {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
  params: {
    role: "Librarian",
  },
});

if (data) {
  librarians.value = data.value;
}

const toggleRemoveMenu = (value, librarian) => {
  removeVisible.value = value;
  if (librarian) {
    currentlySelectedLibrarian.value = librarian;
  }
};

const filterLibrarians = async () => {
  const { data } = await useFetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
    params: {
      role: "Librarian",
      search: search.value,
    },
  });
  if (data) {
    librarians.value = data.value;
  }
};

const attemptRemoveLibrarian = async () => {
  const { data: response } = await useFetch(
    apiUrl + '/users/' + currentlySelectedLibrarian.value,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userStore.token,
      },
    }
  );
  if (response.value) {
    toggleRemoveMenu(false);
    refresh();
  }
};
</script>

<template>
  <teleport to="body">
    <div
      v-if="removeVisible"
      class="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center"
    >
      <LazyRemoveDialog
        :visible="removeVisible"
        title="Remove Librarian"
        text="Are you sure you want to remove this librarian?"
        @close="toggleRemoveMenu(false)"
        @cancel="attemptRemoveLibrarian"
      ></LazyRemoveDialog>
    </div>
  </teleport>
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="inline-block min-w-full p-1.5 align-middle">
        <div class="divide-y divide-gray-200 rounded-lg border bg-white">
          <div class="flex flex-col gap-y-6 px-4 py-3">
            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-y-2">
                <h2 class="text-xl leading-6">Librarians</h2>
                <p class="text-sm text-gray-500">
                  Unlocking the World of Knowledge: Your Essential Resource for
                  Librarians and Library Enthusiasts.
                </p>
              </div>
              <div v-if="role === 'Admin'">
                <button
                  class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                  type="button"
                  @click="navigateTo('/librarians/add')"
                >
                  <Icon
                    class="mr-1 h-5 w-5"
                    name="material-symbols:person-book"
                  />
                  Add librarian
                </button>
              </div>
            </div>
            <div class="relative max-w-xs">
              <label for="hs-table-search" class="sr-only">Search</label>
              <input
                type="text"
                v-model="search"
                @change="filterLibrarians"
                name="hs-table-search"
                id="hs-table-search"
                class="block w-full rounded-md border-gray-200 p-3 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search for items"
              />
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
              >
                <svg
                  class="h-3.5 w-3.5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    Birth date
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    Last login
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  class="hover:cursor-pointer hover:bg-gray-50"
                  v-for="librarian in librarians"
                  :key="librarian.id"
                >
                  <td
                    class="flex items-center gap-x-2 whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800"
                  >
                    <div class="h-8 w-8">
                      <nuxt-img
                        class="h-full w-full rounded-full object-cover object-center"
                        :src="getImageSource(librarian.photo)"
                        alt="Librarian picture"
                      />
                    </div>
                    <div>
                      {{ librarian.firstName }} {{ librarian.lastName }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                    {{ librarian.email }}
                  </td>
                  <td
                    v-if="librarian.birthDate === null"
                    class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                  >
                    Unknown
                  </td>
                  <td
                    v-else
                    class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                  >
                    {{ formatDate(librarian.birthDate) }}
                  </td>
                  <td
                    v-if="librarian.lastLogin === null"
                    class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                  >
                    Did not login yet
                  </td>
                  <td
                    v-else
                    class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                  >
                    {{ getTimeSinceDate(librarian.lastLogin) }}
                  </td>
                  <td
                    class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                  >
                    <div class="flex items-center gap-x-3">
                      <button
                        class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                        type="button"
                        @click="navigateTo('/profile/' + librarian.id)"
                      >
                        <Icon
                          class="mr-1 h-5 w-5"
                          name="heroicons:identification"
                        />
                        Details
                      </button>
                      <div
                        v-if="role === 'Admin'"
                        class="flex items-center gap-x-3"
                      >
                        <button
                          class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                          type="button"
                          @click="navigateTo('/librarians/add')"
                        >
                          <Icon
                            class="mr-1 h-5 w-5"
                            name="heroicons:pencil-square"
                          />
                          Edit
                        </button>
                        <button
                          class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                          type="button"
                          @click="toggleRemoveMenu(true, librarian.id)"
                        >
                          <Icon class="mr-1 h-5 w-5" name="heroicons:trash" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
