<template>
    <div class="add-emergency p-6 bg-gray-50 flex items-center justify-center minheight">
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 class="text-3xl font-bold mb-8 text-center">Add New Emergency Case</h2>
        <form @submit.prevent="submitEmergencyCase" class="space-y-6">
          <div class="mb-6">
            <label class="block text-base font-medium text-gray-700">Personal Number</label>
            <input
              v-model="personalNumber"
              type="text"
              class="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter personal number"
            />
          </div>
  
          <div class="mb-6">
            <label class="block text-base font-medium text-gray-700">Doctor</label>
            <select
              v-model="doctorId"
              class="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Doctor</option>
              <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                {{ doctor.name }}
              </option>
            </select>
          </div>
  
          <div class="mb-6">
            <label class="block text-base font-medium text-gray-700">Room</label>
            <select
              v-model="roomId"
              class="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Room</option>
              <option v-for="room in rooms" :key="room.id" :value="room.id">
                Room {{ room.roomNumber }} ({{ room.status }})
              </option>
            </select>
          </div>
  
          <div class="mb-6">
            <label class="block text-base font-medium text-gray-700">Case Description</label>
            <textarea
              v-model="caseDescription"
              class="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the emergency case"
              rows="4"
            />
          </div>
  
          <div class="flex justify-center">
            <button
              type="submit"
              class="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Emergency Case
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import apiClient from '@/api/ApiClient';
  
  interface Doctor {
    id: number;
    name: string;
  }
  
  interface Room {
    id: number;
    roomNumber: string;
    status: string;
  }
  
  const personalNumber = ref('');
  const doctorId = ref('');
  const roomId = ref('');
  const caseDescription = ref('');
  const doctors = ref<Doctor[]>([]);
  const rooms = ref<Room[]>([]);
  
  const fetchDoctors = async () => {
    try {
      const response = await apiClient.get<Doctor[]>('/doctors/on-duty');
      doctors.value = response;
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
  
  const fetchRooms = async () => {
    try {
      const response = await apiClient.get<Room[]>('/rooms/available');
      rooms.value = response;
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };
  
  const submitEmergencyCase = async () => {
    try {
      await apiClient.post('/emergencies', {
        personalNumber: personalNumber.value,
        doctorId: doctorId.value,
        roomId: roomId.value,
        caseDescription: caseDescription.value,
      });
      alert('Emergency case added successfully');
      // Reset the form
      personalNumber.value = '';
      doctorId.value = '';
      roomId.value = '';
      caseDescription.value = '';
    } catch (error) {
      console.error('Error adding emergency case:', error);
    }
  };
  
  onMounted(() => {
    fetchDoctors();
    fetchRooms();
  });
  </script>

<style scoped>
.minheight {
    height: calc(100% + 100px);
  }
</style>
  