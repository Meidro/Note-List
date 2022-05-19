<template>
   <div class="note-list">
      <CreatingNote />
      <NoteList />
   </div>
</template>

<script lang="ts">
   import {defineComponent} from 'vue'
   import CreatingNote from '@/components/CreatingNote.vue'
   import NoteList from '@/components/NoteList.vue'

   export default defineComponent({
      components: {CreatingNote, NoteList},
      setup() {
         return {}
      },
   })
</script>

<style scoped>
   .note-list {
      padding-top: 20px;
   }
</style>
