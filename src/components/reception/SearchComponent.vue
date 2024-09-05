<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Searchbar -->
    <div class="flex justify-center mb-6">
      <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <form class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:space-x-4">
            <div class="flex-1">
              <input
                v-model="search.patient_name"
                @keypress.enter="submitsearch"
                type="text"
                placeholder="Patient's name"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="flex-1 mt-4 sm:mt-0">
              <input
                v-model="search.patient_phoneno"
                @keypress.enter="submitsearch"
                type="text"
                placeholder="Phone number"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Results view -->
    <div class="flex justify-center">
      <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <EditPatientForm :fetch="fetched" @clearfetch="resetfetch" />
      </div>
    </div>

    <DialogBox :dialogmessage="dialogdata" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import EditPatientForm from './AddEditPatientForm.vue';
import DialogBox from '../DialogBox/Message.vue';
import apiClient from '../../api/ApiClient'
import type { DialogMessage } from '@/entities/DialogMessage';

interface SearchParams {
  patient_name?: string;
  patient_phoneno?: string;
}

interface Patient {
  patient_name: string;
  patient_phoneno: string;
}

export default defineComponent({
  name: 'SearchComponent',
  components: {
    EditPatientForm,
    DialogBox
  },
  setup() {
    const search = ref<SearchParams>({});
    const fetched = ref<Patient[]>([]);
    const dialogdata = ref<DialogMessage>({
      show: false,
      type: '',
      title: '',
      message: '',
      buttontext: ''
    });

    const submitsearch = async () => {
      try {
        const response = await apiClient.post<{ success: Patient[], error?: string }>('/patient/getdata', search.value);
        if (response.success) {
          fetched.value = response.success;
        }
        if (response.error) {
          dialogdata.value = {
            title: 'Error',
            message: response.error,
            buttontext: 'Ok',
            type: 'warning',
            show: true
          };
        }
      } catch (err) {
        console.error(err);
      }
    };

    const resetfetch = async () => {
      try {
        const response = await apiClient.post<{ success: Patient[], error?: string }>('/patient/getdata', search.value);
        if (response.success) {
          fetched.value = response.success;
        }
        if (response.error) {
          dialogdata.value = {
            title: 'Error',
            message: response.error,
            buttontext: 'Ok',
            type: 'warning',
            show: true
          };
        }
      } catch (err) {
        console.error(err);
      }
    };

    const phone = computed(() => [...new Set(fetched.value.map(x => x.patient_phoneno))]);
    const names = computed(() => [...new Set(fetched.value.map(x => x.patient_name))]);

    return {
      search,
      fetched,
      dialogdata,
      submitsearch,
      resetfetch,
      phone,
      names
    };
  }
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
