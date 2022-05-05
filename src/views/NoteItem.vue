<template>
   <div class="note-title">
      <div v-if="!isEditMode">
         <h2>{{ note.title }}</h2>
         <button @click="isEditMode = true">Редактировать заметку</button>
      </div>
      <form v-else @submit.prevent="formHandler(note.title)">
         <input type="text" :value="note.title" @input="onTextChange" />
      </form>
      <form @submit.prevent="addTodo">
         <input type="text" v-model="inputValue" placeholder="Введите текст задачи" />
         <button>Добавить задачу</button>
      </form>
      <ul>
         <li v-for="todo in note.todos" :key="todo.id">
            <input type="checkbox" :checked="todo.completed" @change="onChangeCompleted(todo.id)" />
            <span :class="{completed: todo.completed}">{{ todo.text }}</span>
         </li>
      </ul>
      <button @click="undo">Отменить изменения</button>
      <button @click="redo">Повторить изменения</button>
   </div>
</template>

<script lang="ts">
   import {defineComponent, onMounted, computed, ref} from 'vue';
   import router from '@/router';
   import store from '@/store';

   export default defineComponent({
      setup() {
         onMounted(() => {
            const routeId: number = +router.currentRoute.value.params.id;
            store.dispatch('fetchCurrentNote', routeId);
         });
         const note = computed(() => store.state.currentNote);
         const isEditMode = ref(false);
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

         return {
            note,
            isEditMode,
            inputValue,
            onTextChange,
            formHandler,
            addTodo,
            onChangeCompleted,
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
   .note-title input[type='text'] {
      width: 100%;
      font-size: 20px;
      border: 2px solid teal;
      border-radius: 5px;
      outline: none;
      padding: 5px;
      margin-bottom: 15px;
   }
   .completed {
      text-decoration: line-through;
   }
</style>
