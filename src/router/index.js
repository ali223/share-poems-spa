import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import PoemShow from '@/views/PoemShow.vue';
import UserRegister from '@/views/UserRegister.vue';
import UserLogin from '@/views/UserLogin.vue';
import MyProfile from '@/views/MyProfile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/poem/:id',
    name: 'PoemShow',
    component: PoemShow,
    props: route => {
      return {
        id: Number(route.params.id)
      };
    }
  },
  {
    path: '/user-register',
    name: 'UserRegister',
    component: UserRegister
  },
  {
    path: '/user-login',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/my-profile',
    name: 'MyProfile',
    component: MyProfile,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedIn = localStorage.getItem('authUser');
    if (!loggedIn) {
      return next({ name: 'UserLogin' });
    }
  }

  next();
});

export default router;
