<template>
  <div class="p-6 bg-gray-100 full-height">
    <div class="flex items-center justify-center">
      <h1 class="text-2xl font-bold mb-6">Find Patient</h1>
    </div>

    <div class="max-w-7xl my-5 w-full mx-auto bg-white shadow-lg rounded-lg p-10 border border-gray-200">
      <form @submit.prevent="findPatient" class="space-y-4">
        <div class="mb-4">
          <label class="block text-gray-700">Personal Number</label>
          <input
            v-model="personalNumber"
            type="text"
            placeholder="Enter personal number"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="text-right">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Find
          </button>
        </div>
      </form>

      <div v-if="patientData" class="mt-6">
        <h2 class="text-xl font-semibold mb-4">Patient Details</h2>
        <div class="space-y-4">
          <div><strong>First Name:</strong> {{ patientData.firstName }}</div>
          <div><strong>Last Name:</strong> {{ patientData.lastName }}</div>
          <div><strong>Father Name:</strong> {{ patientData.fatherName }}</div>
          <div><strong>Gender:</strong> {{ patientData.gender }}</div>
          <div><strong>Date of Birth:</strong> {{ formatDate(patientData.dateOfBirth) }}</div>
          <div><strong>Address:</strong> {{ patientData.address }}</div>
          <div><strong>Phone:</strong> {{ patientData.phone }}</div>
          <div><strong>Email:</strong> {{ patientData.email }}</div>
          
          <div v-if="patientData.allergies.length" class="mt-4">
            <h3 class="text-lg font-semibold">Allergies</h3>
            <ul class="list-disc pl-5">
              <li v-for="allergy in patientData.allergies" :key="allergy.id">
                <strong>Allergen:</strong> {{ allergy.allergen }} - 
                <strong>Reaction:</strong> {{ allergy.reaction }} - 
                <strong>Severity:</strong> {{ allergy.severity }}
              </li>
            </ul>
          </div>

          <div v-if="patientData.chronicDiseases.length" class="mt-4">
            <h3 class="text-lg font-semibold">Chronic Diseases</h3>
            <ul class="list-disc pl-5">
              <li v-for="disease in patientData.chronicDiseases" :key="disease.id">
                <strong>Disease Name:</strong> {{ disease.diseaseName }} - 
                <strong>Symptoms:</strong> {{ disease.symptoms }} - 
                <strong>Treatment:</strong> {{ disease.treatment }}
              </li>
            </ul>
          </div>

          <div v-if="patientData.history.length" class="mt-4">
            <h3 class="text-lg font-semibold">Medical History</h3>
            <ul class="list-disc pl-5">
              <li v-for="history in patientData.history" :key="history.id">
                <strong>Visit Date:</strong> {{ formatDate(history.visitDate) }} - 
                <strong>Doctor Description:</strong> {{ history.doctorDescription }} - 
                <strong>Nurse Work:</strong> {{ history.nurseWork || 'N/A' }} - 
                <strong>Diagnosis:</strong> {{ history.diagnosis }} - 
                <strong>Treatment:</strong> {{ history.treatment }} - 
                <strong>Prescription:</strong> {{ history.prescription }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="!patientData && showAddPatientButton" class="mt-6">
        <button
          @click="redirectToAddPatient"
          class="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add New Patient
        </button>
      </div>
    </div>

    <DialogBox 
      :dialogmessage="dialogData" 
      @update:dialogmessage="updateDialogData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DialogBox from '@/components/common/DialogBox.vue';
import apiClient from '@/api/ApiClient';
import type { DialogMessage } from '@/entities/DialogMessage';
import type { PatientViewData } from '@/entities/PatientViewData';

export default defineComponent({
  name: 'FindPatient',
  components: {
    DialogBox
  },
  setup() {
    const personalNumber = ref<string>('');
    const patientData = ref<PatientViewData | null>(null);
    const showAddPatientButton = ref<boolean>(false);
    const dialogData = ref<DialogMessage>({
      show: false,
      type: '',
      title: '',
      message: '',
      buttontext: ''
    });

    const findPatient = async () => {
      if (!personalNumber.value) {
        dialogData.value = {
          title: 'Validation Error',
          message: 'Personal number is required.',
          buttontext: 'Ok',
          type: 'warning',
          show: true
        };
        return;
      }

      try {
        const response = await apiClient.get<PatientViewData>(`/patients/${personalNumber.value}`);
        patientData.value = response;
        showAddPatientButton.value = false;
      } catch (err) {
        if (err === 404) {
          patientData.value = null;
          showAddPatientButton.value = true;
          dialogData.value = {
            title: 'Patient Not Found',
            message: 'No patient found with the provided personal number.',
            buttontext: 'Ok',
            type: 'info',
            show: true
          };
        } else {
          dialogData.value = {
            title: 'Error',
            message: 'An error occurred while fetching the patient data.',
            buttontext: 'Ok',
            type: 'error',
            show: true
          };
        }
      }
    };

    const redirectToAddPatient = () => {
      window.location.href = '/add-patient';
    };

    const formatDate = (timestamp: number) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    };

    const updateDialogData = (newData: DialogMessage) => {
      dialogData.value = newData;
    };

    return {
      personalNumber,
      patientData,
      showAddPatientButton,
      findPatient,
      redirectToAddPatient,
      formatDate,
      dialogData,
      updateDialogData
    };
  }
});
</script>

<style scoped>
.full-height {
  min-height: 100vh; 
}
</style>
