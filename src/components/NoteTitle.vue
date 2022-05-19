<template>
   <div v-if="!isEditMode">
      <h2>{{ currentNote.title }}</h2>
      <button @click="isEditMode = true">Редактировать заметку</button>
   </div>
   <form v-else @submit.prevent="isEditMode = false">
      <input type="text" :value="currentNote.title" @input="updateTitleNote" autofocus />
   </form>
</template>

<script lang="ts">
   import {defineComponent, ref, computed} from 'vue'
   import store from '@/store'

   export default defineComponent({
      setup() {
         const isEditMode = ref(false)
         const currentNote = computed(() => store.state.currentNote)

         const updateTitleNote = (e: Event) => {
            store.commit('updateTitleNote', (e.target as HTMLInputElement).value)
         }

         return {
            isEditMode,
            currentNote,
            updateTitleNote,
         }
      },
   })
</script>

<style scoped>
   input[type='text'] {
      width: 100%;
      font-size: 20px;
      border: 2px solid teal;
      border-radius: 5px;
      outline: none;
      padding: 5px;
      margin-bottom: 15px;
   }
</style>
