<template>
	<nav id="nav-menu">
		<div id="hc-logo">Logo</div>
		<router-link to="/" class="nav-link">Home</router-link>
		<router-link to="/about" class="nav-link">About</router-link>
		<router-link to="/media" class="nav-link">Media</router-link>
		<router-link to="/players" class="nav-link">Player Roster</router-link>
	</nav>
</template>

<script>
export default {
	name: 'NavMenu',
};
</script>

<style>
#nav-menu {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex: 0 0 180px;
	padding: 0 30px;
	background-color: magenta;
	min-height: 100vh;
}

#hc-logo {
	padding: 30px 0;
}

.nav-link {
	text-decoration: none;
}
.nav-link:hover {
	color: pink;
}
</style>
