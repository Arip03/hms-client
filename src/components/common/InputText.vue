<template>
  <div class="w-full">
    <input
      type="text"
      :name="name"
      :value="internalValue"
      class="border rounded-lg w-full p-2 placeholder-style focus:outline-none focus:border-blue-400 text-[13px]"
      :disabled="disabled"
      @input="handleInput"
      @blur="handleBlur"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  value: string;
  disabled?: boolean; // Make disabled optional
  name: string;
  placeholder?: string;
}>();

const emit = defineEmits(['change', 'blur']);

const internalValue = ref(props.value);

watch(
  () => props.value,
  (newValue) => {
    internalValue.value = newValue;
  }
);

watch(
  () => props.disabled,
  (newValue) => {
    if (newValue) {
      internalValue.value = '';
    }
  }
);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  internalValue.value = target.value;
  emit('change', target.value);
};

const handleBlur = (event: Event) => {
  emit('blur', event);
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
