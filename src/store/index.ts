import {Note, ToDo} from '@/types';
import {createStore} from 'vuex';
import {ref} from 'vue';
import {useRefHistory} from '@vueuse/core';

const note = ref({
   id: 0,
   title: '',
   todos: [] as ToDo[],
});
const {undo, redo} = useRefHistory(note, {
   deep: true,
});

export default createStore({
   state: {
      notes: [] as Note[],
      currentNote: note as unknown as Note,
      currentId: 0,
   },
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
      setCurrentNote(state, note: Note) {
         state.currentNote = note;
      },
      updateTitleNote(state, title) {
         state.currentNote.title = title;
      },
      updateTitle(state, value: string) {
         state.currentNote.title = value;
      },
      addTodo(state, value: string) {
         state.currentNote.todos = [{id: Date.now(), text: value, completed: false}, ...state.currentNote.todos];
      },
      toggleChecked(state, todoId: number) {
         state.currentNote.todos = state.currentNote.todos.map((todo) =>
            todo.id === todoId ? {...todo, completed: !todo.completed} : todo
         );
      },
      undoChanges() {
         undo();
      },
      redoChanges() {
         redo();
      },
      saveNote(state) {
         state.notes = state.notes.map((note) => (note.id === state.currentId ? state.currentNote : note));
      },
   },
   actions: {
      fetchCurrentNote({commit}, noteId: number) {
         const note = JSON.parse(JSON.stringify(this.state.notes.find((note) => note.id === noteId)));
         commit('setCurrentNote', note);
         commit('setCurrentId', noteId);
      },
   },
});
