<template>
   <p v-if="!notes.length">Список заметок пуст</p>
   <div v-for="note in notes" :key="note.id" class="note__item">
      <div>
         <h2>{{ note.title }}</h2>
         <ul>
            <li :class="{completed: todo.completed}" v-for="todo in note.todos" :key="todo.id">
               {{ todo.text }}
            </li>
         </ul>
      </div>
      <div class="btn-group">
         <button @click="$router.push(`/${note.id}`)">Перейти к заметке</button>
         <button @click="deleteNote(note.id)">Удалить заметку</button>
      </div>
   </div>

   <ModalWindow v-if="isModal">
      <template v-slot:modal-title>
         <h2 class="delete-text">Удалить заметку?</h2>
      </template>
      <template v-slot:modal-actions>
         <div class="modal-btn-group">
            <button @click="confirmDelete">ДА</button><button @click="isModal = false">ОТМЕНА</button>
         </div>
      </template>
   </ModalWindow>
</template>

<script lang="ts">
   import {defineComponent, computed, ref, watchEffect} from 'vue'
   import store from '@/store'
   import ModalWindow from './ModalWindow.vue'
   import {storage} from '@/storage'

   export default defineComponent({
      emits: ['deleteNote'],
      setup() {
         const notes = computed(() => store.state.notes)
         const currentNote = computed(() => store.state.currentNote)
         const isModal = ref(false)
         const noteId = ref(0)

         const deleteNote = (id: number) => {
            isModal.value = true
            noteId.value = id
         }

         const confirmDelete = () => {
            store.commit('deleteNote', noteId.value)
            isModal.value = false
         }

         watchEffect(() => {
            storage.setNotes(notes.value)
            storage.setCurrentNote(currentNote.value)
         })

         return {
            notes,
            isModal,
            confirmDelete,
            deleteNote,
         }
      },
      components: {ModalWindow},
   })
</script>

<style scoped>
   p {
      text-align: center;
      font-weight: 600;
      color: #333333;
   }
   .note__item {
      width: 100%;
      border: 1px solid #cccccc;
      border-radius: 5px;
      box-shadow: -4px -4px 8px #ffffff, 4px 4px 8px #777777;
      padding: 20px;
      margin-bottom: 25px;
   }
   .note__item h2 {
      margin-bottom: 10px;
      color: teal;
   }
   .note__item ul {
      list-style: disc;
      margin-left: 40px;
      padding-left: 30px;
      max-height: 100px;
      overflow: hidden;
      margin-bottom: 15px;
      border-bottom: 1px solid #777777;
      box-shadow: inset 0 -3px 10px #777777;
   }
   .note__item li {
      margin-bottom: 7px;
      color: #333;
      font-size: 14px;
      padding: 3px;
   }
   .btn-group {
      padding: 7px;
   }
   .btn-group button {
      margin-right: 30px;
   }
   .completed {
      text-decoration: line-through;
   }
   .delete-text {
      margin-bottom: 20px;
   }
   .modal-btn-group {
      display: flex;
      justify-content: space-between;
   }
</style>
