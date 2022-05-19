<template>
   <div class="note-list">
      <CreatingNote />
      <NoteList />
   </div>
</template>

<script lang="ts">
   import {defineComponent, onMounted} from 'vue';
   import CreatingNote from '@/components/CreatingNote.vue';
   import NoteList from '@/components/NoteList.vue';
   import store from '@/store';

   export default defineComponent({
      components: {CreatingNote, NoteList},
      setup() {
         // onMounted(() => {
         //    store.commit('resetCurrentNote');
         // });
         return {};
      },
   });
</script>

<style scoped>
   .note-list {
      padding-top: 20px;
   }
</style>
