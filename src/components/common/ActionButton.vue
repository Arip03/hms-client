<script lang="ts" setup>
defineProps<{
  rightIcon?: object
  leftIcon?: object
  label?: string
  classname?: string
  disabled?: boolean
}>()
</script>

<template>
  <button
    class="flex items-center justify-center p-1 text-darkTone80"
    :class="[classname]"
    :style="disabled ? { backgroundColor: '#CBCBCB' } : {}"
    :disabled="disabled"
  >
    <component :is="rightIcon" :style="{ marginRight: !!label ? '0.5rem' : '' }" />
    <span class="text-small whitespace-nowrap">{{ label }}</span>
    <component :is="leftIcon" :style="{ marginLeft: !!label ? '0.5rem' : '' }" />
  </button>
</template>
