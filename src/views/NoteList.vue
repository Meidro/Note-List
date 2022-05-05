<template>
   <div class="note-list">
      <form @submit.prevent="formHandler">
         <input type="text" v-model="inputValue" />
         <button>Создать заметку</button>
      </form>
      <div v-for="note in notes" :key="note.id">
         <div>
            <h2>{{ note.title }}</h2>
            <ul>
               <li :class="{completed: todo.completed}" v-for="todo in note.todos" :key="todo.id">
                  {{ todo.text }}
               </li>
            </ul>
         </div>
         <div>
            <button @click="$router.push(`/${note.id}`)">Перейти к заметке</button>
            <button @click="onDeleteNote(note.id)">Удалить заметку</button>
         </div>
      </div>
   </div>
   <ModalWindow v-if="isModal">
      <template v-slot:modal-actions
         ><button @click="confirmDelete(true)">ДА</button
         ><button @click="confirmDelete(false)">ОТМЕНА</button></template
      >
   </ModalWindow>
   <p v-if="!notes.length">Список заметок пуст</p>
</template>

<script lang="ts">
   import {computed, defineComponent, ref} from 'vue';
   import store from '@/store';
   import ModalWindow from '@/components/ModalWindow.vue';

   export default defineComponent({
      name: 'NoteList',
      components: {ModalWindow},
      setup() {
         const notes = computed(() => store.state.notes);
         const isModal = ref(false);
         const inputValue = ref('');
         const formHandler = () => {
            store.commit('addNote', inputValue);
            inputValue.value = '';
         };
         const onDeleteNote = (id: number) => {
            store.commit('setCurrentId', id);
            isModal.value = true;
         };
         const confirmDelete = (flag: boolean): void => {
            if (flag) {
               store.commit('deleteNote');
            }
            closeModal();
         };
         function closeModal() {
            store.commit('setCurrentId', 0);
            isModal.value = false;
         }
         return {
            notes,
            formHandler,
            onDeleteNote,
            isModal,
            inputValue,
            confirmDelete,
         };
      },
   });
</script>

<style scoped>
   .note-list {
      padding-top: 20px;
   }
   .note-list form {
      display: flex;
      flex-direction: column;
      margin-bottom: 25px;
   }
   .note-list input {
      border: 2px solid teal;
      border-radius: 5px;
      outline: none;
      padding: 10px;
      margin-bottom: 15px;
   }
   .note-list form button {
      align-self: center;
   }
   p {
      text-align: center;
      font-weight: 600;
      color: #333333;
   }
   .completed {
      text-decoration: line-through;
   }
</style>
