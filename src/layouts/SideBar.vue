<template>
    <aside
      @mouseover="$emit('toggleDrawer', true)"
      @mouseleave="$emit('toggleDrawer', false)"
      :class="drawer ? 'w-64' : 'w-20'"
      class="bg-gray-800 text-white transition-width duration-300"
    >
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
    </aside>
  </template>
  
  <script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      drawer: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>