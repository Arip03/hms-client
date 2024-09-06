<template>
  <div class="flex flex-col">
    <HeaderComponent />

    <div class="flex mt-[64px] max-h-screen overflow-hidden">
      <Sidebar
        :items="currentSidebarItems"
        :drawer="drawer"
        @toggleDrawer="handleToggleDrawer"
        @changeComponent="changeComponent"
      />
      <main class="flex-1">
        <router-view />
      </main>
    </div>

    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderComponent from '@/components/layouts/HeaderComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import Sidebar from '@/layouts/SideBar.vue';
import type { SidebarItem } from '@/entities/SidebarItem';

const drawer = ref<boolean>(false);

const route = useRoute();
const currentSidebarItems = computed<SidebarItem[]>(() => {
  const sidebarItems = route.meta.sidebarItems as SidebarItem[] | undefined;
  return sidebarItems || [];
});

const handleToggleDrawer = (value: boolean) => {
  drawer.value = value;
};

const changeComponent = (componentName: string) => {
  const router = useRouter();
  router.push({ name: componentName });
};
</script>
