<template>
   <teleport to="body">
      <div class="modal-wrapper">
         <div class="modal">
            <slot name="modal-title"></slot>
            <slot name="modal-actions"></slot>
         </div>
      </div>
   </teleport>
</template>

<script lang="ts">
   import {defineComponent} from 'vue';

   export default defineComponent({
      name: 'ModalWindow',
   });
</script>

<style scoped>
   .modal-wrapper {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
   }
   .modal {
      width: 400px;
      background-color: #e6e7ee;
      border: 1px solid #cccccc;
      border-radius: 5px;
      box-shadow: -4px -4px 8px #ffffff, 4px 4px 8px #777777;
      padding: 25px;
      text-align: center;
   }
</style>
