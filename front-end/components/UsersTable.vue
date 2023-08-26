<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";
interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  lastLogin: string;
}

const { users, search } = defineProps<{
  users: User[];
  search: string;
}>();

const columns = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
  },
  {
    key: "birthDate",
    label: "Birth Date",
    sortable: true,
  },
  {
    key: "lastLogin",
    label: "Last login",
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
      label: "View",
      icon: "i-heroicons-user-circle",
      click: () => navigateTo(`/profile/${row.id}`),
    },
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
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
  const usersArray = users ?? [];

  if (!search) {
    return usersArray;
  }
  return usersArray.filter((user: User) => {
    return Object.values(user).some((value) => {
      return String(value).toLowerCase().includes(search.toLowerCase());
    });
  });
});
</script>

<template>
  <UTable :columns="columns" :rows="filteredRows" :sort="{ column: 'name' }">
    <template #birthDate-data="{ row }">
      {{ formatDate(row.birthDate) || "Unknown" }}
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
    <template #lastLogin-data="{ row }">
      <span v-if="row.lastLogin">{{
        formatTimeAgo(new Date(row.lastLogin))
      }}</span>
      <span v-else>Never</span>
    </template>
    <template #name-data="{ row }">
      <div class="flex items-center gap-x-2 whitespace-nowrap text-sm">
        <div class="h-8 w-8">
          <nuxt-img
            class="h-full w-full rounded-full object-cover object-center"
            :src="getImageSource(row.photo)"
            alt="Librarian picture"
          />
        </div>
        <div>
          {{ row.name }}
        </div>
      </div>
    </template>
  </UTable>
</template>

<style scoped></style>
