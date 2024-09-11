<template>
  <div
    @mouseover="$emit('toggleDrawer', true)"
    @mouseleave="$emit('toggleDrawer', false)"
    :class="drawer ? 'w-64' : 'w-20'"
    class="bg-gray-800 text-white transition-width duration-300 fixed top-0 left-0 h-screen z-50"
  >
    <div class="p-4 flex items-center border-b border-gray-700">
      <div class="flex flex-col items-center min-w-12">
        <img
          v-if="userImage && userImage.base64Content"
          :src="`data:image/jpeg;base64,${userImage.base64Content}`"
          alt="Profile"
          class="w-12 h-12 rounded-full mb-2 object-cover"
        />
        <img
          v-else
          :src="defaultImage"
          alt="Default Profile"
          class="w-12 h-12 rounded-full mb-2 object-cover"
        />
        <div class="text-sm">{{ userProfile.username }}</div>
      </div>
      <div v-if="drawer" class="ml-4 text-sm">
        <div class="font-semibold">{{ userProfile.fullName }}</div>
        <div class="text-gray-400">{{ userProfile.role }}</div>
      </div>
    </div>

    <nav>
      <ul>
        <li v-for="item in items" :key="item.key">
          <button
            @click="$emit('changeComponent', item.display)"
            class="w-full text-left p-4 hover:bg-gray-700 flex items-center"
          >
            <span
              :class="drawer ? 'text-xl' : 'text-3xl'"
              class="mr-2 transition-all duration-300"
            >
              {{ item.icon }}
            </span>
            <span
              v-if="drawer"
              class="whitespace-nowrap overflow-hidden transition-all duration-300"
            >
              {{ item.title }}
            </span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiClient from '@/api/ApiClient';
import type { UserProfile } from '@/entities/UserProfile';
import type { ImageResponse } from '@/entities/ImageResponse';
import type { SidebarItem } from '@/entities/SidebarItem';

defineProps<{
  items: SidebarItem[];
  drawer: boolean;
}>();  

const userProfile = ref<UserProfile>({
  fullName: '',
  username: '',
  role: '',
});

const defaultImage = '/public/defaultProfilePhoto.png';
const userImage = ref<ImageResponse | null>(null);

const fetchUserProfile = async () => {
  try {
    const profileResponse = await apiClient.get<UserProfile>('/users');
    userProfile.value = profileResponse;

    try {
      const imageResponse = await apiClient.get<ImageResponse>('/user/image');
      userImage.value = imageResponse;
    } catch {
      userImage.value = null;
    }

  } catch (error) {
    console.error('Error fetching user profile or image:', error);
  }
};

onMounted(() => {
  fetchUserProfile();
});
</script>

<style scoped>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
}

.h-screen {
  height: 100vh;
}
</style>
