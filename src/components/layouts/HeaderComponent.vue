<template>
  <header class="bg-gray-800 text-blue-800 flex items-center justify-between p-3 fixed top-0 left-20  z-40 maxwidth" :style="{ marginLeft: sidebarWidth }">
    <div class="flex items-center">
      <span class="text-xl font-semibold">HMS</span>
    </div>
    <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
      Logout
    </button>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
  sidebarWidth: string;
}>();

const router = useRouter();

const logout = () => {
  router.push('/logout');
};
</script>

<style scoped>
.bg-gray-800 {
  background-color: rgba(219, 220, 224, 0.75); 
}

.maxwidth {
  width: calc(100% - 80px);
}
</style>
