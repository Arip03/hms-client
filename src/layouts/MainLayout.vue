<template>
  <div class="flex">
    <Sidebar
      :items="currentSidebarItems"
      :drawer="drawer"
      @toggleDrawer="handleToggleDrawer"
      @changeComponent="changeComponent"
    />
    <div class="flex flex-col flex-1" :style="{ marginLeft: sidebarWidth }">
      <HeaderComponent :sidebarWidth="sidebarWidth" />
      <main class="flex-1 mt-16">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderComponent from '@/components/layouts/HeaderComponent.vue'
import Sidebar from '@/layouts/SideBar.vue'
import type { SidebarItem } from '@/entities/SidebarItem'

const drawer = ref<boolean>(false)
const router = useRouter()
const route = useRoute()

const currentSidebarItems = computed<SidebarItem[]>(() => {
  const sidebarItems = route.meta.sidebarItems as SidebarItem[] | undefined
  return sidebarItems || []
})

const sidebarWidth = computed(() => (drawer.value ? 'w-64' : 'w-20'))

const handleToggleDrawer = (value: boolean) => {
  drawer.value = value
}

const changeComponent = (componentName: string) => {
  router.push({ name: componentName })
}
</script>
