import {Note, ToDo} from '@/types';
import {createStore} from 'vuex';
import {ref} from 'vue';
import {useRefHistory} from '@vueuse/core';
import createPersistedState from 'vuex-persistedstate';

const note = ref({
   id: 0,
   title: '',
   todos: [] as ToDo[],
});
const {undo, redo, history, clear} = useRefHistory(note, {
   deep: true,
});

export default createStore({
   state: {
      notes: [] as Note[],
      currentNote: note as unknown as Note,
   },

   mutations: {
      resetCurrentNote(state) {
         state.currentNote = {} as Note;
      },
      setNotes(state, notes) {
         state.notes = notes;
      },
      addNote(state, title) {
         state.notes = [{id: Date.now(), title: title.value, todos: []}, ...state.notes];
      },
      deleteNote(state, noteId) {
         state.notes = state.notes.filter((note) => note.id !== noteId);
      },
      setCurrentNote(state, note: Note) {
         state.currentNote = note;
      },
      updateTitleNote(state, title) {
         state.currentNote.title = title;
      },
      updateNotes(state, currentNoteId) {
         state.notes = state.notes.map((note) => (note.id === currentNoteId ? state.currentNote : note));
      },
      addTodo(state, value: string) {
         state.currentNote.todos = [
            {id: Date.now(), text: value, completed: false, isEdit: false},
            ...state.currentNote.todos,
         ];
      },
      toggleChecked(state, todoId: number) {
         state.currentNote.todos = state.currentNote.todos.map((todo) =>
            todo.id === todoId ? {...todo, completed: !todo.completed} : todo
         );
      },
      toggleIsEdit(state, id: number) {
         state.currentNote.todos = state.currentNote.todos.map((todo) =>
            todo.id === id ? {...todo, isEdit: !todo.isEdit} : todo
         );
      },
      deleteTodo(state, id: number) {
         state.currentNote.todos = state.currentNote.todos.filter((todo) => todo.id !== id);
      },
      updateTextTodo(state, value: string) {
         state.currentNote.todos = state.currentNote.todos.map((todo) => (todo.isEdit ? {...todo, text: value} : todo));
      },

      undoChanges() {
         console.log(history.value);
         undo();
      },
      redoChanges() {
         console.log('redo');
         redo();
      },
      clearHistory() {
         clear();
         console.log('clear');
      },
   },

   actions: {
      fetchCurrentNote({commit}, noteId: number) {
         const noteCopy = JSON.parse(JSON.stringify(this.state.notes.find((note) => note.id === noteId)));
         commit('setCurrentNote', noteCopy);
      },
   },
   strict: true,
   // plugins: [createPersistedState()],
});
