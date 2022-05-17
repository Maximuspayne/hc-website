<template>
	<h1>Player Roster</h1>
	<TableLite
		:is-loading="table.isLoading"
		:columns="table.columns"
		:rows="players"
		:total="table.totalRecordCount"
		:sortable="table.sortable"
		:messages="table.messages"
		@do-search="doSearch"
		@is-finished="table.isLoading = false"
	/>
</template>

<script>
// TableLite docs: https://linmasahiro.github.io/vue3-table-lite/dist/
// But feel free to use whatever library works best for your purposes - just make sure it's compatible with Vue 3
import TableLite from 'vue3-table-lite';
export default {
	name: 'PlayerRoster',
	components: {
		TableLite,
	},
	data() {
		return {
			players: [],
			table: {
				isLoading: false,
				columns: [
					{
						label: 'Rank',
						field: 'rank',
						width: '5%',
						sortable: true,
					},
					{
						label: 'Player Name',
						field: 'name',
						width: '10%',
						sortable: true,
						isKey: true,
						display: function (row) {
							// usually you'd use a router-link for internal links but it doesn't seem to work with this package
							return `<a href="/#/players/${row.id}" class="nav-link">${row.name}</a>`;
						},
					},
				],
				rows: [],
				totalRecordCount: 3,
				sortable: {
					order: 'rank',
					sort: 'asc',
				},
			},
		};
	},
	created() {
		// TODO: Fetch players from an API here
		this.players = [
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
		];
	},
};
</script>

<style></style>
