<template>
   <div class="app-wrapper">
      <router-view />
   </div>
</template>

<script lang="ts">
   import {defineComponent} from 'vue';

   export default defineComponent({
      name: 'App',
   });
</script>

<style>
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }
   html,
   body {
      height: 100%;
      background-color: #e6e7ee;
      font-family: Helvetica, sans-serif;
   }
   ul {
      list-style: none;
   }
   .app-wrapper {
      max-width: 900px;
      margin: 0 auto;
   }
   button {
      color: #333333;
      font-weight: 600;
      padding: 7px 25px;
      background-color: #e6e7ee;
      border: 1px solid #cccccc;
      border-radius: 5px;
      box-shadow: -4px -4px 8px #ffffff, 4px 4px 8px #777777;
   }
   button:hover {
      color: teal;
      box-shadow: inset 3px 3px 6px #777777, inset -4px -4px 8px #ffffff;
   }
</style>
