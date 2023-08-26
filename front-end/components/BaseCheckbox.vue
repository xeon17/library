<script setup lang="ts">
import { safeParse } from "valibot"; // 0.51 kB
const error = ref<string | null>("");
const modelValue = defineModel();
const { schema } = defineProps<{
  id: string;
  label: string;
  required?: boolean;
  schema: any;
}>();

const validateInput = () => {
  const isValid = safeParse(schema, modelValue.value, { abortEarly: true });
  error.value = isValid.success ? null : isValid.error.message;
};
</script>
<template>
  <div class="flex items-center gap-x-2">
    <input
      type="checkbox"
      :id="id"
      v-model="modelValue"
      @input="validateInput"
      @blur="validateInput"
      class="h-4 w-4 rounded-full text-white accent-green-500 focus:ring-0 focus:ring-transparent focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:checked:border-transparent dark:checked:bg-current dark:indeterminate:border-transparent dark:indeterminate:bg-current"
    />
    <label
      class="text-sm font-medium text-gray-700 dark:text-gray-200"
      :for="id"
      >{{ label }} <span v-if="required" class="text-red-600">*</span>
    </label>
  </div>
  <p v-if="error" class="pt-1 text-sm text-red-600">
    {{ error }}
  </p>
</template>

<style scoped></style>
