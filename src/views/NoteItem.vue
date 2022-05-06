<template>
   <div class="note-title">
      <div v-if="!isEditMode">
         <h2>{{ note.title }}</h2>
         <button @click="isEditMode = true">Редактировать заметку</button>
      </div>
      <form v-else @submit.prevent="formHandler(note.title)">
         <input type="text" :value="note.title" @input="onChangeInput" />
      </form>
      <form @submit.prevent="addTodo" class="add-todo">
         <input type="text" v-model="inputValue" placeholder="Введите текст задачи" />
         <button>Добавить задачу</button>
      </form>
      <ul class="todo__list">
         <li v-for="todo in note.todos" :key="todo.id" class="todo__item">
            <div v-if="!todo.isEdit" class="todo__body">
               <input
                  :id="todo.id.toString()"
                  type="checkbox"
                  :checked="todo.completed"
                  @change="onChangeCompleted(todo.id)"
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
               @input="onChangeTodo"
               v-on:keydown.enter="toggleIsEdit(todo.id)"
               autofocus
            />
         </li>
      </ul>
      <div class="btn-group">
         <button @click="fixed">Сохранить изменения</button>
         <button @click="isModal = true">Отменить редактирование</button>
         <button @click="undo">Отменить изменения</button>
         <button @click="redo">Повторить изменения</button>
      </div>
   </div>
   <ModalWindow v-if="isModal">
      <template v-slot:modal-title>
         <h2>Отменить редактирование? Все изменения будут потеряны!</h2>
      </template>
      <template v-slot:modal-actions>
         <button @click="confirmCancelEdit(true)">ДА</button><button @click="confirmCancelEdit(false)">ОТМЕНА</button>
      </template>
   </ModalWindow>
</template>

<script lang="ts">
   import {defineComponent, onMounted, computed, ref} from 'vue';
   import router from '@/router';
   import store from '@/store';
   import ModalWindow from '@/components/ModalWindow.vue';

   export default defineComponent({
      components: {ModalWindow},
      setup() {
         onMounted(() => {
            const routeId: number = +router.currentRoute.value.params.id;
            store.dispatch('fetchCurrentNote', routeId);
         });
         const note = computed(() => store.state.currentNote);
         const isEditMode = ref(false);
         const isModal = ref(false);
         const inputValue = ref('');

         const onChangeTodo = (e: Event) => {
            store.commit('updateTextTodo', (e.target as HTMLInputElement).value);
         };
         const formHandler = (title: string) => {
            store.commit('updateTitleNote', title);
            isEditMode.value = false;
         };
         const onChangeInput = (e: Event) => {
            store.commit('updateTitle', (e.target as HTMLInputElement).value);
         };
         const addTodo = () => {
            store.commit('addTodo', inputValue.value);
            inputValue.value = '';
         };
         const onChangeCompleted = (todoId: number) => {
            store.commit('toggleChecked', todoId);
         };
         const undo = () => {
            store.commit('undoChanges');
         };
         const redo = () => {
            store.commit('redoChanges');
         };

         const fixed = () => {
            store.commit('fixed');
         };
         const confirmCancelEdit = (flag: boolean) => {
            if (flag) {
               store.commit('cancelFixed');
               router.push('/');
            }
            isModal.value = false;
         };
         const toggleIsEdit = (id: number) => {
            store.commit('toggleIsEdit', id);
         };
         const deleteTodo = (id: number) => {
            store.commit('deleteTodo', id);
         };

         return {
            note,
            isEditMode,
            inputValue,
            isModal,
            onChangeInput,
            onChangeTodo,
            formHandler,
            addTodo,
            onChangeCompleted,
            undo,
            redo,
            fixed,
            confirmCancelEdit,
            toggleIsEdit,
            deleteTodo,
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
   .btn-group {
      display: flex;
      justify-content: space-between;
   }
</style>
