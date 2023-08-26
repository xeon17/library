<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const { token, role } = storeToRefs(userStore);

const apiUrl = "http://localhost:8080/api/v1/books/";
const search = ref("");

definePageMeta({
  middleware: "auth",
  layout: "default",
});

useSeoMeta({
  title: "Library - Students",
  ogTitle: "Library - Students",
  description: "Library App Students Page",
  ogDescription: "Library App Students Page",
  ogImage: "/logo.png",
});

interface IBook {
  id: string;
  title: string;
  categories: object[];
  authors: object[];
  genres: object[];
  publisher: string;
}

const {
  data: books,
  error,
  refresh,
} = await useFetch<IBook>(apiUrl, {
  method: "GET",
  headers: {
    Authorization: "Bearer " + token.value,
  },
});

const columns = [
  {
    key: "title",
    label: "Title",
    sortable: true,
  },
  {
    key: "categories",
    label: "Category",
    sortable: true,
  },
  {
    key: "authors",
    label: "Authors",
    sortable: true,
  },
  {
    key: "genres",
    label: "Genre",
    sortable: true,
  },
  {
    key: "publisher",
    label: "Publisher",
    sortable: true,
  },
  {
    key: "actions",
    label: "Actions",
  },
];

interface MenuItem {
  label: string;
  icon: string;
  click?: () => void;
  id?: string;
}

const items = (row: { id: string }): MenuItem[][] => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => navigateTo(`/books/${row.id}/edit`),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];

const filteredRows = computed(() => {
  const booksArray = books.value ?? [];

  if (!search?.value) {
    return booksArray;
  }
  return booksArray.filter((book: IBook) => {
    return Object.values(book).some((value) => {
      return String(value).toLowerCase().includes(search.value.toLowerCase());
    });
  });
});

const select = (row) => {
  navigateTo(`/books/${row.id}`);
};
</script>

<template>
  <UCard
    class="w-full"
    :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: {
        padding: '',
        base: 'divide-y divide-gray-200 dark:divide-gray-700',
      },
      footer: { padding: 'p-4' },
    }"
  >
    <template #header>
      <h2
        class="text-xl font-semibold leading-tight text-gray-900 dark:text-white"
      >
        Books
      </h2>
    </template>

    <div class="flex justify-between px-4 py-4">
      <div class="relative max-w-xs">
        <UInput
          size="md"
          v-model="search"
          placeholder="Search..."
          icon="i-heroicons-magnifying-glass"
        />
      </div>
      <div class="justify-end" v-if="role === 'Librarian' || role === 'Admin'">
        <UButton
          class="font-medium"
          to="/books/add"
          color="blue"
          label="Add book"
          size="lg"
          variant="outline"
          icon="i-heroicons-user-plus"
        />
      </div>
    </div>

    <div class="overflow-auto">
      <UTable
        :columns="columns"
        @select="select"
        :rows="filteredRows"
        :sort="{ column: 'title' }"
      >
        <template #categories-data="{ row }">
          <div class="whitespace-nowrap">
            {{
              row.categories.map((category: string) => category.name).join(", ")
            }}
          </div>
        </template>
        <template #genres-data="{ row }">
          {{ row.genres.map((genre) => genre.name).join(", ") }}
        </template>
        <template class="whitespace-nowrap" #authors-data="{ row }">
          {{ row.authors.map((author: string) => author.name).join(", ") }}
        </template>
        <template #publisher-data="{ row }">
          {{ row.title }}
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </div>
  </UCard>
</template>

<style scoped></style>
