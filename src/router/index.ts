import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import NoteList from '@/views/NoteList.vue';
import NoteItem from '@/views/NoteItem.vue';

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      name: 'NoteList',
      component: NoteList,
   },
   {
      path: '/:id',
      name: 'NoteItem',
      component: NoteItem,
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

export default router;
