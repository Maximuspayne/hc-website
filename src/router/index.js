import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/components/pages/Home';
import About from '@/components/pages/About';
import Media from '@/components/pages/Media';
import PlayerRoster from '@/components/pages/PlayerRoster';
import PlayerDetails from '@/components/pages/PlayerDetails';
import ShipSinkings from '@/components/pages/ShipSinkings';
//leaderboards
import TonnageBoard from '@/components/pages/leaderboards/TonnageBoard';
import AABoard from '@/components/pages/leaderboards/AABoard';
import CannonBoard from '@/components/pages/leaderboards/CannonBoard';
import TorpedoBoard from '@/components/pages/leaderboards/TorpedoBoard';
import OtherWeaponsBoard from '@/components/pages/leaderboards/OtherWeaponsBoard';
import KillsBoard from '@/components/pages/leaderboards/KillsBoard';
import MiscBoard from '@/components/pages/leaderboards/MiscBoard';

const routes = [
	{ path: '/', component: Home },
	{ path: '/about', component: About },
	{ path: '/media', component: Media },
	{ path: '/players', component: PlayerRoster },
	{ path: '/players/:id', component: PlayerDetails },
	{ path: '/shipsinkings', component: ShipSinkings },
	//leaderboards
	{ path: '/tonnageboard', component: TonnageBoard },
	{ path: '/aaboard', component: AABoard },
	{ path: '/cannonboard', component: CannonBoard },
	{ path: '/torpedoboard', component: TorpedoBoard },
	{ path: '/otherweaponsboard', component: OtherWeaponsBoard },
	{ path: '/killsboard', component: KillsBoard },
	{ path: '/miscboard', component: MiscBoard }
];

const router = createRouter({
	history: createWebHashHistory(),
	routes, // short for `routes: routes`
});

export default router;
