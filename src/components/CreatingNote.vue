<template>
   <form @submit.prevent="addNote">
      <input type="text" v-model="inputValue" placeholder="Введите название заметки" />
      <button>Создать заметку</button>
   </form>
</template>

<script lang="ts">
   import {defineComponent, ref} from 'vue';
   import store from '@/store';

   export default defineComponent({
      setup() {
         const inputValue = ref('');

         const addNote = () => {
            if (inputValue.value.trim()) {
               store.commit('addNote', inputValue);
               inputValue.value = '';
            }
         };

         return {
            inputValue,
            addNote,
         };
      },
   });
</script>

<style scoped>
   form {
      display: flex;
      flex-direction: column;
      margin-bottom: 25px;
   }
   input {
      font-size: 20px;
      border: 2px solid teal;
      border-radius: 5px;
      outline: none;
      padding: 5px;
      margin-bottom: 15px;
   }
   form button {
      align-self: center;
   }
</style>
