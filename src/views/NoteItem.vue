<template>
   <div class="note-title">
      <NoteTitle />
      <form @submit.prevent="addTodo" class="add-todo">
         <input type="text" v-model="inputValue" placeholder="Введите текст задачи" />
         <button>Добавить задачу</button>
      </form>
      <ul class="todo__list">
         <TodoList />
      </ul>
      <ButtonGroup @saveChanges="saveChanges" @modalTrue="isModal = true" @undo="undo" @redo="redo" />
   </div>
   <ModalWindow v-if="isModal">
      <template v-slot:modal-title>
         <div class="text">
            <h2>Отменить редактирование? Все изменения будут потеряны!</h2>
         </div>
      </template>
      <template v-slot:modal-actions>
         <div class="modal-btn-group">
            <button @click="confirmCancelEdit">ДА</button><button @click="isModal = false">ОТМЕНА</button>
         </div>
      </template>
   </ModalWindow>
</template>

<script lang="ts">
   import {defineComponent, onMounted, computed, ref, watchEffect} from 'vue'
   import router from '@/router'
   import store from '@/store'
   import ModalWindow from '@/components/ModalWindow.vue'
   import ButtonGroup from '@/components/ButtonGroup.vue'
   import NoteTitle from '@/components/NoteTitle.vue'
   import {storage} from '@/storage'
   import TodoList from '@/components/TodoList.vue'

   export default defineComponent({
      components: {ModalWindow, ButtonGroup, NoteTitle, TodoList},
      setup() {
         const storageCurrentNote = storage.getCurrentNote()
         if (storageCurrentNote) store.commit('setCurrentNote', storageCurrentNote)

         const currentNote = computed(() => store.state.currentNote)
         const notes = computed(() => store.state.notes)

         const isModal = ref(false)
         const inputValue = ref('')

         const addTodo = () => {
            if (inputValue.value.trim()) {
               store.commit('addTodo', inputValue.value)
               inputValue.value = ''
            }
         }
         const confirmCancelEdit = () => {
            router.push('/')
            isModal.value = false
         }
         const saveChanges = () => {
            store.commit('updateNotes', currentNote.value.id)
            store.commit('clearHistory')
         }

         const undo = () => {
            store.commit('undoChanges')
         }
         const redo = () => {
            store.commit('redoChanges')
         }

         watchEffect(() => {
            storage.setNotes(notes.value)
            storage.setCurrentNote(currentNote.value)
         })

         const fetchNote = () => {
            const routeId: number = +router.currentRoute.value.params.id
            if (routeId !== currentNote.value.id) {
               store.dispatch('fetchCurrentNote', routeId)
            }
         }

         onMounted(fetchNote)

         return {
            currentNote,
            inputValue,
            isModal,
            saveChanges,
            addTodo,
            confirmCancelEdit,
            undo,
            redo,
         }
      },
   })
</script>

<style scoped>
   .note-title {
      text-align: center;
   }

   .add-todo {
      margin-bottom: 35px;
   }
   .note-title input[type='text'] {
      width: 100%;
      font-size: 20px;
      border: 2px solid teal;
      border-radius: 5px;
      outline: none;
      padding: 5px;
      margin-bottom: 15px;
   }

   .modal-btn-group {
      display: flex;
      justify-content: space-between;
   }

   .text {
      margin-bottom: 20px;
   }
</style>
