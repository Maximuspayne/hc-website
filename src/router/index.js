import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/components/pages/Home';
import About from '@/components/pages/About';
import Media from '@/components/pages/Media';
import PlayerRoster from '@/components/pages/PlayerRoster';
import PlayerDetails from '@/components/pages/PlayerDetails';

const routes = [
	{ path: '/', component: Home },
	{ path: '/about', component: About },
	{ path: '/media', component: Media },
	{ path: '/players', component: PlayerRoster },
	{ path: '/players/:id', component: PlayerDetails }
];

const router = createRouter({
	history: createWebHashHistory(),
	routes, // short for `routes: routes`
});

export default router;
