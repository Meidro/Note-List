import {Note, ToDo} from '@/types';
import {createStore} from 'vuex';
import {useRefHistory} from '@vueuse/core';
import {ref} from 'vue';

const note = ref({
   title: '',
   todos: [] as ToDo[],
});
const {history, undo, redo, canUndo, canRedo, clear} = useRefHistory(note, {
   deep: true,
});

export default createStore({
   state: {
      notes: [] as Note[],
      currentNote: note as unknown as Note,
      currentId: 0,
   },
   getters: {
      getIdOfLastNote(state): number {
         if (state.notes.length > 0) {
            const index = state.notes.length - 1;
            return state.notes[index].id;
         } else {
            return 0;
         }
      },
   },
   mutations: {
      addNote(state, title) {
         const id = state.currentId;
         state.notes = [{...state.currentNote, id, title: title.value}, ...state.notes];
      },
   },
   actions: {},
});
