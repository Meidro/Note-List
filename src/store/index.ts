import {Note} from '@/types';
import {createStore} from 'vuex';

export default createStore({
   state: {
      notes: [] as Note[],
      currentId: 0,
   },
   getters: {},
   mutations: {
      addNote(state, title) {
         state.notes = [{id: Date.now(), title: title.value, todos: []}, ...state.notes];
      },

      deleteNote(state) {
         state.notes = state.notes.filter((note) => note.id !== state.currentId);
      },
      setCurrentId(state, id) {
         state.currentId = id;
      },
   },
   actions: {},
});
