import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/components/pages/Home';
import About from '@/components/pages/About';

const routes = [
	{ path: '/', component: Home },
	{ path: '/about', component: About },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes, // short for `routes: routes`
});

export default router;
