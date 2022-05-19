<template>
   <li v-for="todo in currentNote.todos" :key="todo.id" class="todo__item">
      <div v-if="!todo.isEdit" class="todo__body">
         <input :id="todo.id.toString()" type="checkbox" :checked="todo.completed" @change="changeCompleted(todo.id)" />
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
</template>

<script lang="ts">
   import {defineComponent, computed} from 'vue'
   import store from '@/store'

   export default defineComponent({
      setup() {
         const currentNote = computed(() => store.state.currentNote)

         const changeCompleted = (todoId: number) => {
            store.commit('toggleChecked', todoId)
         }
         const toggleIsEdit = (id: number) => {
            store.commit('toggleIsEdit', id)
         }
         const deleteTodo = (id: number) => {
            store.commit('deleteTodo', id)
         }
         const changeTodo = (e: Event) => {
            store.commit('updateTextTodo', (e.target as HTMLInputElement).value)
         }

         return {
            currentNote,
            changeCompleted,
            toggleIsEdit,
            deleteTodo,
            changeTodo,
         }
      },
   })
</script>

<style scoped>
   input[type='text'] {
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
</style>
