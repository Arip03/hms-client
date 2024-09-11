<template>
    <div class="monitor-emergency p-6 bg-gray-50 flex justify-center">
      <div class="w-full max-w-7xl">
        <h2 class="text-2xl font-bold mb-5 text-center">Monitor Emergency Cases</h2>
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr class="bg-gray-200 text-gray-700">
              <th class="py-4 px-6 border-b">Case ID</th>
              <th class="py-4 px-6 border-b">Patient Name / Personal Number</th>
              <th class="py-4 px-6 border-b">Doctor</th>
              <th class="py-4 px-6 border-b">Room</th>
              <th class="py-4 px-6 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="case1 in emergencyCases" :key="case1.id" class="hover:bg-gray-100">
              <td class="py-2 px-4 border-b">{{ case1.id }}</td>
              <td class="py-2 px-4 border-b">{{ case1.patientName || case1.personalNumber }}</td>
              <td class="py-2 px-4 border-b">{{ case1.doctorName }}</td>
              <td class="py-2 px-4 border-b">{{ case1.roomNumber }}</td>
              <td class="py-2 px-4 border-b">{{ case1.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import apiClient from '@/api/ApiClient';
  
  interface EmergencyCase {
    id: number;
    patientName?: string;
    personalNumber?: string;
    doctorName: string;
    roomNumber: string;
    status: string;
  }
  
  const emergencyCases = ref<EmergencyCase[]>([]);
  
  const fetchEmergencyCases = async () => {
    try {
      const response = await apiClient.get<EmergencyCase[]>('/emergencies');
      emergencyCases.value = response;
    } catch (error) {
      console.error('Error fetching emergency cases:', error);
    }
  };
  
  onMounted(() => {
    fetchEmergencyCases();
  });
  </script>

<style scoped>
.maxwidth {
    width: calc(100% - 100px);
  }
</style>
  