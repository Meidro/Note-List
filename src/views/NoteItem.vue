<template>
   <div class="note-title">
      <div v-if="!isEditMode">
         <h2>{{ note.title }}</h2>
         <button @click="isEditMode = true">Редактировать заметку</button>
      </div>
      <form v-else @submit.prevent="formHandler(note.title)">
         <input type="text" :value="note.title" @input="onTextChange" />
      </form>
      <form @submit.prevent="addTodo" class="add-todo">
         <input type="text" v-model="inputValue" placeholder="Введите текст задачи" />
         <button>Добавить задачу</button>
      </form>
      <ul class="todo__list">
         <li v-for="todo in note.todos" :key="todo.id" class="todo__item">
            <input :id="todo.text" type="checkbox" :checked="todo.completed" @change="onChangeCompleted(todo.id)" />
            <label :for="todo.text"></label>
            <span :class="{completed: todo.completed}">{{ todo.text }}</span>
         </li>
      </ul>
      <button @click="isModal = true">Отменить редактирование</button>
      <button @click="undo">Отменить изменения</button>
      <button @click="redo">Повторить изменения</button>
      <button @click="save">Сохранить изменения</button>
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
         const onTextChange = (e: Event) => {
            store.commit('updateTitle', (e.target as HTMLInputElement).value);
         };
         const formHandler = (title: string) => {
            store.commit('updateTitleNote', title);
            isEditMode.value = false;
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
         const save = () => {
            store.commit('saveNote');
         };
         const confirmCancelEdit = (flag: boolean) => {
            if (flag) {
               console.log('da');
            }
            isModal.value = false;
         };

         return {
            note,
            isEditMode,
            inputValue,
            isModal,
            onTextChange,
            formHandler,
            addTodo,
            onChangeCompleted,
            undo,
            redo,
            save,
            confirmCancelEdit,
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
      display: flex;
      align-items: center;
   }
   .todo__item input {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0);
   }
   .todo__item label {
      position: relative;
      width: 22px;
      height: 22px;
      border: 3px solid teal;
      border-radius: 4px;
      cursor: pointer;
   }
   .todo__item input:checked + label::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 12px;
      height: 12px;
      background-color: teal;
   }
   .completed {
      text-decoration: line-through;
   }
</style>
