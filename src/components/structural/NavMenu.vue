<template>
	<nav id="nav-menu">
		<router-link to="/" id="hc-logo" class="nav-link"><img src="@/assets/hc_flag.gif" alt="Logo" style="width:100%"></router-link>
		<router-link to="/" class="nav-link" :class="currentRoute === '/' && 'active-path'">Home</router-link>
		<router-link to="/about" class="nav-link" :class="currentRoute === '/about' && 'active-path'">About</router-link>
		<router-link to="/media" class="nav-link" :class="currentRoute === '/media' && 'active-path'">Media</router-link>
		<router-link to="/players" class="nav-link" :class="currentRoute === '/players' && 'active-path'">Player Roster</router-link>
	</nav>
</template>

<script>
export default {
	name: 'NavMenu',
	data() {
		return {
			currentRoute: '/',
		};
	},
	watch: {
		$route: function () {
			this.currentRoute = this.$route.path;
		},
	},
};
</script>

<style>
#nav-menu {
	background-image: url("~@/assets/gray_concrete.png");
	background-repeat: repeat;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex: 0 0 180px;
	padding: 0 30px;
	background-color: black;
	min-height: 100vh;
	
	/*border-style: dotted;
	border-width: 5px 5px 5px 5px;
	border-color: gray;*/
}

#hc-logo {
	margin: 10px;
	padding: 0 0;
	border-style: inset;
	border-color: gray;
}

.nav-link {
	color: rgb(61, 211, 184);
	text-decoration: none;
}
.nav-link:hover {
	color: rgb(48, 180, 156);
}

.active-path {
	color: rgb(1, 114, 94);
	pointer-events: none;
}
</style>
