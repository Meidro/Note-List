import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import NotePage from '@/views/NotePage.vue';
import NoteItem from '@/views/NoteItem.vue';

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',

      component: NotePage,
   },
   {
      path: '/:id',

      component: NoteItem,
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

export default router;
