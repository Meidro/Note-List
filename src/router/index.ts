import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import NoteList from '@/views/NoteList.vue';

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      name: 'NoteList',
      component: NoteList,
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

export default router;
