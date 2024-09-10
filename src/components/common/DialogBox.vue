<template>
  <!-- {{ dialogmessage }} -->
  <transition name="fade">
    <div v-if="isDialogVisible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div :class="`p-4 ${dialogmessage.type} text-white`">
          <h2 class="text-xl font-bold">{{ dialogmessage.title }}</h2>
        </div>
        <div class="flex justify-center p-4">
          <p>{{ dialogmessage.message }}</p>
        </div>
        <div class="flex justify-center p-4">
          <button @click="closeDialog" class="bg-blue-500 text-white px-10 py-3 rounded hover:bg-blue-600">
            {{ dialogmessage.buttontext }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref, watch } from 'vue';
import type { DialogMessage } from '@/entities/DialogMessage';

export default defineComponent({
  name: 'DialogBox',
  props: {
    dialogmessage: {
      type: Object as PropType<DialogMessage>,
      required: true
    }
  },
  emits: ['update:dialogmessage'],
  setup(props, { emit }) {
    const isDialogVisible = ref(props.dialogmessage.show);

    watch(
      () => props.dialogmessage.show,
      (newValue) => {
        isDialogVisible.value = newValue;
      }
    );

    // Close dialog method
    const closeDialog = () => {
      isDialogVisible.value = false;
      emit('update:dialogmessage', { ...props.dialogmessage, show: false });
    };

    return {
      isDialogVisible,
      closeDialog
    };
  }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
