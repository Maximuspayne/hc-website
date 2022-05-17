<template>
	<h1>{{ playerInfo.name }}</h1>
	<h3>{{ playerInfo.rank }}</h3>
	<router-link to="/players" class="nav-link">Back to Roster</router-link>
</template>

<script>
export default {
	name: 'PlayerDetails',
	data() {
		return {
			playerInfo: {},
			players: [
				{
					id: 1,
					name: 'Maximus Payne',
					rank: 'Captain',
				},
				{
					id: 2,
					name: 'Mo Jang',
					rank: 'Admiral',
				},
				{
					id: 3,
					name: 'Les Payne',
					rank: 'Seaman',
				},
			],
		};
	},
	created() {
		// Grabs the player id param from the url
		const playerId = +this.$route.params.id; // the + coerces the type to be a number, not a string

		// Finds and sets the player info for the player with the matching id
		this.playerInfo = this.players.find((player) => player.id === playerId);

		// TODO: Instead of hardcoding like we're doing here, you probably will want to fetch info for a single player from an endpoint using axios or something similar
		// Do this here in the 'created' hook or in the 'mounted' one
	},
};
</script>

<style></style>
