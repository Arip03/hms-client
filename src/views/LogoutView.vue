<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <transition name="fade">
      <div v-if="dialog" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4">
          <h3 class="text-xl font-semibold mb-4">Thank you</h3>
          <p class="mb-6">Are you sure you want to logout</p>
          <div class="flex justify-end space-x-4">
            <button
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              @click="cancelLogout"
            >
              Cancel
            </button>
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              @click="gotologin"
            >
              Login again?
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const router = useRouter();
const dialog = ref(true);

const gotologin = () => {
  cookies.remove('role');
  cookies.remove('token');

  router.push('/login');
};

const cancelLogout = () => {
  router.push('/register');
};

onUnmounted(() => {
  router.go(0);
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
