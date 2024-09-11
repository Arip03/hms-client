<template>
    <div class="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 class="text-2xl font-bold mb-4">View Appointments</h2>
      <div class="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">

          <div class="md:w-1/4 mb-4 md:mb-0">
            <label class="block text-gray-700 font-semibold mb-2">Search Patient by Personal Number</label>
            <input 
              v-model="searchPersonalNumber" 
              type="text"
              placeholder="Enter personal number"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="md:w-1/4 mb-4 md:mb-0">
            <label class="block text-gray-700 font-semibold mb-2">Filter by Doctor</label>
            <select v-model="selectedDoctor" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Doctors</option>
              <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                {{ doctor.fullName }}
              </option>
            </select>
          </div>
  
          <div class="md:w-1/4">
            <label class="block text-gray-700 font-semibold mb-2">Filter by Date</label>
            <input 
              type="date" 
              v-model="selectedDate"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> 
          <div class="mt-5 text-center">
          <button @click="filterAppointments" class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Apply
          </button>
        </div>
        </div>
  
       
  
        <div v-if="appointments.length">
          <table class="w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr class="bg-gray-100 border-b">
                <th class="p-2 text-left">Patient</th>
                <th class="p-2 text-left">Doctor</th>
                <th class="p-2 text-left">Date</th>
                <th class="p-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in appointments" :key="appointment.id">
                <td class="p-2">{{ appointment.patientName }}</td>
                <td class="p-2">{{ appointment.doctorName }}</td>
                <td class="p-2">{{ new Date(appointment.date).toLocaleDateString() }}</td>
                <td class="p-2">{{ new Date(appointment.time).toLocaleTimeString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center text-gray-700 mt-4">
          No appointments found.
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiClient from '@/api/ApiClient';
import { AxiosHeaders } from 'axios';

interface Doctor {
  id: number;
  fullName: string;
}

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
}

const doctors = ref<Doctor[]>([]);
const appointments = ref<Appointment[]>([]);
const selectedDoctor = ref<string>('');
const searchPersonalNumber = ref<string>('');
const selectedDate = ref<string>('');

const fetchDoctors = async () => {
  try {
    const response = await apiClient.get<Doctor[]>('/users/doctors');
    doctors.value = response;
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
};

const fetchAppointments = async () => {
  try {
    const response = await apiClient.get<Appointment[]>('/appointments', {
      params: {
        doctorId: selectedDoctor.value,
        personalNumber: searchPersonalNumber.value,
        date: selectedDate.value
      },
      headers: new AxiosHeaders()
    });
    appointments.value = response;
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }
};

const filterAppointments = () => {
  fetchAppointments();
};

onMounted(() => {
  fetchDoctors();
  fetchAppointments();
});
</script>
