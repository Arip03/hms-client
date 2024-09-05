<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <div class="bg-blue-900 text-white p-4 flex items-center justify-between">
      <h1 class="text-xl font-bold">Queue</h1>
      <div class="flex items-center">
        <span class="mr-2">Refresh</span>
        <button @click="refresh" class="text-white hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4V1l-4 4 4 4V5a7 7 0 1 1 7 7h-3.1A4.993 4.993 0 0 0 12 8V4zm-5.707 7.293a1 1 0 0 0 1.414 0L12 8.414l3.293 3.293a1 1 0 0 0 1.414-1.414L12 5.586 6.707 10.879a1 1 0 0 0 0 1.414z"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="attendingque.length > 0" class="mt-4">
      <div class="text-center text-lg font-bold mb-2">Attending</div>
      <div v-for="(item, i) in attendingque" :key="i" class="bg-white shadow-md rounded-lg p-4 mb-4">
        <div class="text-gray-700">Token no: {{ item.token_no }}</div>
        <div class="text-xl font-semibold">{{ item.patient_name }}</div>
        <div class="text-gray-600">Visiting doctor: {{ item.visiting_doctor }}</div>
        <div class="flex justify-end mt-2">
          <button @click="checkout(item)" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Checkout</button>
        </div>
      </div>
    </div>

    <div v-if="waitingque.length > 0" class="mt-4">
      <div class="text-center text-lg font-bold mb-2">Waiting</div>
      <div v-for="(item, i) in waitingque" :key="i" class="bg-white shadow-md rounded-lg p-4 mb-4">
        <div class="text-gray-700">Token no: {{ item.token_no }}</div>
        <div class="text-xl font-semibold">{{ item.patient_name }}</div>
        <div class="text-gray-600">To visit doctor: {{ item.visiting_doctor }}</div>
        <div class="flex justify-end space-x-2 mt-2">
          <button @click="letin(item)" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Let In</button>
          <button @click="left(item)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Left</button>
        </div>
      </div>
    </div>

    <DialogBox :dialogmessage="dialogdata" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DialogBox from '../common/DialogBox.vue';
import apiClient from '../../api/ApiClient'
import type { Patient } from '@/entities/Patient';
import type { DialogMessage } from '@/entities/DialogMessage';


export default defineComponent({
  name: "QueueComponent",
  components: {
    DialogBox
  },
  data() {
    return {
      fetchedque: [] as Patient[],
      attendingque: [] as Patient[],
      waitingque: [] as Patient[],
      dialogdata: {
        show: false,
        type: "",
        title: "",
        message: "",
        buttontext: ""
      } as DialogMessage
    };
  },
  methods: {
    async refresh(): Promise<void> {
      this.fetchedque = [];
      this.attendingque = [];
      this.waitingque = [];
      
      try {
        const response = await apiClient.post<{ success: Patient[] }>("/patient/que/get", {});
        if (response.success.length > 0) {
          response.success.forEach((x: Patient) => {
            if (x.quetype === "waiting") {
              this.waitingque.push(x);
            } else if (x.quetype === "attending") {
              this.attendingque.push(x);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching queue data:", error);
      }
    },
    async letin(item: Patient): Promise<void> {
      try {
        const response = await apiClient.post<{ success: boolean }>("/patient/que/letinside", { patient_id: item.patient_id });
        if (response.success) {
          const index = this.waitingque.indexOf(item);
          if (index > -1) {
            this.waitingque.splice(index, 1);
            this.attendingque.push(item);
          }
        }
      } catch (error) {
        console.error("Error letting in patient:", error);
      }
    },
    async checkout(item: Patient): Promise<void> {
      try {
        const response = await apiClient.post<{ success: boolean }>("/patient/que/delete", { patient_id: item.patient_id });
        if (response.success) {
          const index = this.attendingque.indexOf(item);
          if (index > -1) {
            this.attendingque.splice(index, 1);
            this.dialogdata = {
              title: "Success",
              message: `Removed patient ${item.patient_name} from queue`,
              buttontext: "Ok",
              type: "success",
              show: true
            };
          }
        }
      } catch (error) {
        console.error("Error checking out patient:", error);
      }
    },
    async left(item: Patient): Promise<void> {
      try {
        const response = await apiClient.post<{ success: boolean }>("/patient/que/delete", { patient_id: item.patient_id });
        if (response.success) {
          const index = this.waitingque.indexOf(item);
          if (index > -1) {
            this.waitingque.splice(index, 1);
            this.dialogdata = {
              title: "Success",
              message: `Removed patient ${item.patient_name} from queue`,
              buttontext: "Ok",
              type: "success",
              show: true
            };
          }
        }
      } catch (error) {
        console.error("Error handling left patient:", error);
      }
    }
  }
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
