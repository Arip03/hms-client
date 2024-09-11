<template>
  <div class="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
    <h2 class="text-2xl font-bold mb-4">Schedule Appointment</h2>
    <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <form @submit.prevent="scheduleAppointment" class="space-y-4">
        
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Search Patient by Personal Number</label>
          <input 
            v-model="searchPersonalNumber" 
            @input="searchPatient"
            type="text"
            placeholder="Enter personal number"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div v-if="patientSearchResult.length" class="space-y-2">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Select Patient</label>
            <select v-model="selectedPatient" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option v-for="patient in patientSearchResult" :key="patient.id" :value="patient.id">
                {{ patient.firstName }} {{ patient.lastName }}
              </option>
            </select>
          </div>
          <button v-if="!patientFound" @click="addNewPatient" class="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Add New Patient
          </button>
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-2">Doctor</label>
          <select v-model="selectedDoctor" @change="fetchAvailableTimeSlots" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
              {{ doctor.fullName }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-2">Date</label>
          <input 
            type="date" 
            v-model="selectedDate" 
            @change="fetchAvailableTimeSlots"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div v-if="availableTimeSlots.length">
          <label class="block text-gray-700 font-semibold mb-2">Available Time Slots</label>
          <select v-model="selectedTimeSlot" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option v-for="slot in availableTimeSlots" :key="slot" :value="slot">
              {{ new Date(slot).toLocaleTimeString() }}
            </option>
          </select>
        </div>

        <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Schedule Appointment
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiClient from '@/api/ApiClient';
import { AxiosHeaders } from 'axios';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  personalNumber: string;
}

interface Doctor {
  id: number;
  fullName: string;
  username: string;
}

const patients = ref<Patient[]>([]);
const doctors = ref<Doctor[]>([]);
const selectedPatient = ref<number | null>(null);
const selectedDoctor = ref<number | null>(null);
const selectedDate = ref<string>('');
const selectedTimeSlot = ref<string | null>(null);
const searchPersonalNumber = ref<string>('');
const patientSearchResult = ref<Patient[]>([]);
const patientFound = ref<boolean>(false);
const availableTimeSlots = ref<string[]>([]);

const searchPatient = async () => {
  if (searchPersonalNumber.value) {
    try {
      const response = await apiClient.get<Patient[]>(`/patients/search?personalNumber=${searchPersonalNumber.value}`);
      patientSearchResult.value = response;
      patientFound.value = response.length > 0;
    } catch (error) {
      console.error('Error searching patient:', error);
    }
  } else {
    patientSearchResult.value = [];
    patientFound.value = false;
  }
};

const fetchAvailableTimeSlots = async () => {
  if (selectedDoctor.value && selectedDate.value) {
    try {
      const response = await apiClient.get<string[]>('/appointments/available-slots', {
        params: {
          doctorId: selectedDoctor.value,
          date: selectedDate.value
        },
        headers: new AxiosHeaders()
      });
      availableTimeSlots.value = response;
    } catch (error) {
      console.error('Error fetching available time slots:', error);
    }
  }
};

const addNewPatient = () => {
  window.location.href = '/add-patient';
};

const scheduleAppointment = async () => {
  if (selectedPatient.value && selectedDoctor.value && selectedTimeSlot.value) {
    try {
      await apiClient.post('/appointments', {
        patientId: selectedPatient.value,
        doctorId: selectedDoctor.value,
        appointmentDate: selectedTimeSlot.value
      });
      alert('Appointment successfully scheduled');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  } else {
    console.error('Please fill in all required fields.');
  }
};

onMounted(async () => {
  try {
    const doctorsResponse = await apiClient.get<Doctor[]>('/users/doctors');
    doctors.value = doctorsResponse;
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
});
</script>
