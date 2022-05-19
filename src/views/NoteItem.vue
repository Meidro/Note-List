<template>
   <div class="note-title">
      <div v-if="!isEditMode">
         <h2>{{ currentNote.title }}</h2>
         <button @click="isEditMode = true">Редактировать заметку</button>
      </div>
      <form v-else @submit.prevent="isEditMode = false">
         <input type="text" :value="currentNote.title" @input="updateTitleNote" autofocus />
      </form>

      <form @submit.prevent="addTodo" class="add-todo">
         <input type="text" v-model="inputValue" placeholder="Введите текст задачи" />
         <button>Добавить задачу</button>
      </form>

      <ul class="todo__list">
         <li v-for="todo in currentNote.todos" :key="todo.id" class="todo__item">
            <div v-if="!todo.isEdit" class="todo__body">
               <input
                  :id="todo.id.toString()"
                  type="checkbox"
                  :checked="todo.completed"
                  @change="changeCompleted(todo.id)"
               />
               <label :for="todo.id.toString()"></label>
               <span :class="{completed: todo.completed}">{{ todo.text }}</span>
               <button @click="toggleIsEdit(todo.id)">редактировать</button>
               <button @click="deleteTodo(todo.id)">удалить</button>
            </div>

            <input
               v-else
               type="text"
               :value="todo.text"
               @input="changeTodo"
               v-on:keydown.enter="toggleIsEdit(todo.id)"
               autofocus
            />
         </li>
      </ul>

      <div class="btn-group">
         <button @click="saveChanges">Сохранить изменения</button>
         <button @click="isModal = true">Отменить редактирование</button>
         <button @click="undo">Отменить изменения</button>
         <button @click="redo">Повторить изменения</button>
      </div>
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
   import {defineComponent, onMounted, computed, ref, watchEffect} from 'vue';
   import router from '@/router';
   import store from '@/store';
   import ModalWindow from '@/components/ModalWindow.vue';

   export default defineComponent({
      components: {ModalWindow},
      setup() {
         store.commit('clearHistory');
         const storageCurrentNote = localStorage.getItem('currentNote');
         if (storageCurrentNote) store.commit('setCurrentNote', JSON.parse(storageCurrentNote));

         const currentNote = computed(() => store.state.currentNote);
         const notes = computed(() => store.state.notes);
         const isEditMode = ref(false);
         const isModal = ref(false);
         const inputValue = ref('');

         const updateTitleNote = (e: Event) => {
            store.commit('updateTitleNote', (e.target as HTMLInputElement).value);
         };
         const saveChanges = () => {
            store.commit('updateNotes', currentNote.value.id);
         };
         const addTodo = () => {
            if (inputValue.value.trim()) {
               store.commit('addTodo', inputValue.value);
               inputValue.value = '';
            }
         };
         const changeCompleted = (todoId: number) => {
            store.commit('toggleChecked', todoId);
         };
         const toggleIsEdit = (id: number) => {
            store.commit('toggleIsEdit', id);
         };
         const deleteTodo = (id: number) => {
            store.commit('deleteTodo', id);
         };
         const changeTodo = (e: Event) => {
            store.commit('updateTextTodo', (e.target as HTMLInputElement).value);
         };
         const confirmCancelEdit = () => {
            router.push('/');
            isModal.value = false;
         };

         const undo = () => {
            store.commit('undoChanges');
         };
         const redo = () => {
            store.commit('redoChanges');
         };

         watchEffect(() => {
            localStorage.setItem('currentNote', JSON.stringify(currentNote.value));
            localStorage.setItem('notes', JSON.stringify(notes.value));
         });

         onMounted(() => {
            const routeId: number = +router.currentRoute.value.params.id;
            if (routeId !== currentNote.value.id) {
               store.dispatch('fetchCurrentNote', routeId);
            }
         });

         return {
            currentNote,
            isEditMode,
            inputValue,
            isModal,
            updateTitleNote,
            saveChanges,
            changeCompleted,
            changeTodo,
            addTodo,
            toggleIsEdit,
            deleteTodo,
            confirmCancelEdit,

            undo,
            redo,
         };
      },
   });
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
   .todo__list {
      margin-bottom: 30px;
   }
   .todo__item {
      border: 1px solid teal;
      border-radius: 5px;
      padding: 7px;
      margin-bottom: 10px;
   }
   .todo__body {
      display: flex;
      align-items: center;
   }
   .todo__body input {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0);
   }
   .todo__body label {
      position: relative;
      width: 22px;
      height: 22px;
      border: 3px solid teal;
      border-radius: 4px;
      cursor: pointer;
   }
   .todo__body input:checked + label::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 12px;
      height: 12px;
      background-color: teal;
   }
   .todo__body span {
      flex: 1 1 auto;
      text-align: left;
      padding-left: 10px;
   }
   .todo__body button {
      margin-right: 10px;
   }
   .completed {
      text-decoration: line-through;
      color: #999;
   }
   .modal-btn-group {
      display: flex;
      justify-content: space-between;
   }
   .btn-group {
      display: flex;
      justify-content: space-between;
   }
   .text {
      margin-bottom: 20px;
   }
</style>
