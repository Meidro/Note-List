<template>
   <div class="btn-group">
      <button @click="$emit('saveChanges')">Сохранить изменения</button>
      <button @click="$emit('modalTrue')">Отменить редактирование</button>
      <button @click="$emit('undo')" :disabled="!canUndo">Отменить изменения</button>
      <button @click="$emit('redo')" :disabled="!canRedo">Повторить изменения</button>
   </div>
</template>

<script lang="ts">
   import {defineComponent, computed} from 'vue'
   import store from '@/store'

   export default defineComponent({
      setup() {
         const canUndo = computed(() => store.getters.canUndo)
         const canRedo = computed(() => store.getters.canRedo)

         return {
            canUndo,
            canRedo,
         }
      },
   })
</script>

<style scoped>
   .btn-group {
      display: flex;
      justify-content: space-between;
   }
   button:disabled {
      opacity: 0.5;
   }
</style>
