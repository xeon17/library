<script setup lang="ts">
import { safeParse } from "valibot"; // 0.51 kB
const error = ref<string | null>("");
const modelValue = defineModel();
const { schema } = defineProps<{
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  schema: any;
  autocomplete?: string;
}>();

const validateInput = () => {
  const isValid = safeParse(schema, modelValue.value, { abortEarly: true });
  error.value = isValid.success ? null : isValid.error.message;
};
</script>
<template>
  <label :for="id"
    >{{ label }} <span v-if="required" class="text-red-600">*</span></label
  >
  <div class="relative">
    <input
      :type="type"
      :id="id"
      :autocomplete="autocomplete"
      v-model.trim="modelValue"
      @input="validateInput"
      @blur="validateInput"
      :placeholder="placeholder"
      class="mt-1 block w-full rounded-md border-0 px-3 py-2.5 pl-9 text-sm placeholder-gray-400 shadow-sm outline-none ring-1 ring-inset ring-gray-300"
      :class="{
        'ring-red-600': error,
        'ring-gray-300': !error,
      }"
    />
    <div
      v-if="icon"
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <Icon
        class="h-5 w-5 text-gray-400"
        :class="{
          'text-red-600': error,
          'text-gray-400': !error,
        }"
        :name="icon"
      />
    </div>
  </div>
  <p v-if="error" class="pt-1 text-sm text-red-600">
    {{ error }}
  </p>
</template>

<style scoped></style>
