import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddView from '../views/AddView.vue';
import ListView from '../views/ListView.vue';
import UploadFile from '../views/FileUpload.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/bitacora',
    name: 'bitacora',
    component: ListView,
  },
  {
    path: '/Add',
    name: 'add',
    component: AddView,
  },
  {
    path: '/UploadFile',
    name: 'UploadFile',
    component: UploadFile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
