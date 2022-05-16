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
						width: '10%',
						sortable: true,
					},
					{
						label: 'Player Name',
						field: 'name',
						width: '15%',
						sortable: true,
						isKey: true,
						display: function (row) {
							return `<a href="/#/players/${row.id}">${row.name}</a>`;
						},
					},
				],
				rows: [],
				totalRecordCount: 3,
				sortable: {
					order: 'id',
					sort: 'asc',
				},
			},
		};
	},
	created() {
		// Fetch players from an API here
		this.players = [
			{
				id: 1,
				name: 'Maximus Payne',
				rank: 'Captain',
				link: 'maximus-payne',
			},
			{
				id: 2,
				name: 'Mo Jang',
				rank: 'Admiral',
				link: 'mo-jang',
			},
			{
				id: 3,
				name: 'Les Payne',
				rank: 'Seaman',
				link: 'les-payne',
			},
		];
	},
};
</script>

<style></style>
