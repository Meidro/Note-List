<template>
   <div class="note-list">
      <form @submit.prevent="formHandler">
         <input type="text" v-model="inputValue" placeholder="Введите название заметки" />
         <button>Создать заметку</button>
      </form>
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
            <button @click="onDeleteNote(note.id)">Удалить заметку</button>
         </div>
      </div>
   </div>
   <ModalWindow v-if="isModal">
      <template v-slot:modal-title>
         <h2 class="delete-text">Удалить заметку?</h2>
      </template>
      <template v-slot:modal-actions>
         <div class="modal-btn-group">
            <button @click="confirmDelete(true)">ДА</button><button @click="confirmDelete(false)">ОТМЕНА</button>
         </div>
      </template>
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
         const closeModal = () => {
            store.commit('setCurrentId', 0);
            isModal.value = false;
         };
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
      font-size: 20px;
      border: 2px solid teal;
      border-radius: 5px;
      outline: none;
      padding: 5px;
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
