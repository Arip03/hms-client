<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-container>
      <v-data-table :headers="headers" :items="fetched" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-container class="pa-0">
            <v-row justify="space-around" class="pa-2" dense>
              <v-col cols="12" sm="3" class="flex items-center">
                <h3>Patients</h3>
              </v-col>
              <v-col cols="12" sm="6" class="flex items-center">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-filter"
                  label="Filter"
                  single-line
                  hide-details
                  class="pb-5"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="flex items-center">
                <v-btn small class="ml-2 primary" @click="addNewPatient">
                  <v-icon color="white">mdi-plus-circle</v-icon>Add new
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon large class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
        </template>
        <template v-slot:item.changepassword="{ item }">
          <v-icon large class="mr-2" @click="tokenGenerate(item)">mdi-hospital-box</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  
  export default defineComponent({
    props: {
      headers: Array as PropType<any[]>,
      fetched: Array as PropType<any[]>,
      search: String,
    },
    methods: {
      addNewPatient() {
        this.$emit('add-new-patient');
      },
      editItem(item: any) {
        this.$emit('edit-item', item);
      },
      tokenGenerate(item: any) {
        this.$emit('generate-token', item);
      }
    }
  });
  </script>
  
  <style scoped>
  /* Tailwind CSS classes applied inline or in <style> block */
  </style>
  