<script setup lang="ts">
interface Author {
  id: string;
  name: string;
  description: string;
}

const { users, search } = defineProps<{
  users: Author[];
  search: string;
}>();

const columns = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "description",
    label: "Description",
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
  return usersArray.filter((user: Author) => {
    return Object.values(user).some((value) => {
      return String(value).toLowerCase().includes(search.toLowerCase());
    });
  });
});
</script>

<template>
  <UTable :columns="columns" :rows="filteredRows" :sort="{ column: 'name' }">
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
</template>

<style scoped></style>
