<template>
	<div id="otherweapons-page">
		<div style="text-align: center">
			<table style="margin:auto">
				<tr>
					<td>

					</td>
					<td>
						<h1 style="background-color:rgba(0,0,0,0.5);color:white">Other Weapons Leaderboard</h1>
					</td>
					<td>

					</td>
				</tr>
			</table>
			<label style="background-color:rgba(0,0,0,0.5);color:white">Name Search:</label><input v-model="searchTerm" />
		</div>
		<br>
		<table-lite
			:is-slot-mode="true"
			:is-loading="table.isLoading"
			:columns="table.columns"
			:rows="table.rows"
			:total="table.totalRecordCount"
			:sortable="table.sortable"
			:messages="table.messages"
			@do-search="doSearch"
			@is-finished="table.isLoading = false"
			@row-clicked="rowClicked"
		>
			<template v-slot:name="data">
				<LeaderboardNameGrid>
                    <template v-slot:rank-text>{{data.value.rankName}}</template>
					<template v-slot:name-text><h1>{{data.value.name}}</h1></template>
				</LeaderboardNameGrid>	
			</template>
		</table-lite>
	</div>
</template>

<script>
	import { defineComponent, reactive, ref } from "vue";
	import TableLite from "vue3-table-lite";
	import LeaderboardNameGrid from "@/components/structural/LeaderboardNameGrid.vue";
	import {rankIDToName} from "@/utils/ranks.js";

	const fetchData = (table, offset, limit, order, sort, likeText) => {
		const axios = require('axios').default;
        // Start use axios to get data from Server
		let desc = 1;
		if( sort == "asc" )
			desc = 0;

		let urlA = "https://navalbattlezone.com/test/leader_otherweapon.php?count=1";

		if( likeText != null )
			urlA += "&like=" + likeText;
		axios.get(urlA).then((response) => {
			table.totalRecordCount = response.data[0].count;
		});

		let urlB = "https://navalbattlezone.com/test/leader_otherweapon.php?offset=" + offset + "&limit=" + limit + "&sort=" + order + "&desc=" + desc;
		if( likeText != null )
			urlB += "&like=" + likeText;

		axios.get(urlB).then((response) => {
			table.rows = response.data;

			for( let row of table.rows ){
				row.rankName = rankIDToName(row.hcn_rank_id);
                row.depthcharge_dps = Math.round(row.depthcharge_dps*100)/100;
			}

			table.sortable.order = order;
			table.sortable.sort = sort;
			table.sortable.offset = offset;
			table.sortable.limit = limit;
		});
		
	};

	export default defineComponent({
		name: "App",
		components: { TableLite, LeaderboardNameGrid },
		setup() {
			const searchTerm = ref(""); // Search text

			// Table config
			const table = reactive({
				isLoading: false,
				columns: [
                    {
						label: "Player Name",
						field: "name",
						width: "5%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
                    {
						label: "Depth Charge Damage",
						field: "depthcharge_dmg",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
                    {
						label: "D/C Fired",
						field: "depthcharge_fired",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
                    {
						label: "Dmg per D/C",
						field: "depthcharge_dps",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
                    {
						label: "Collision Damage",
						field: "collision_dmg",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
                    {
						label: "TNT Damage",
						field: "tnt_dmg",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
                    {
						label: "Major Fires Started",
						field: "major_fires",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
				],
				rows: [],
				totalRecordCount: 0,
				sortable: {
					order: "depthcharge",
					sort: "desc",
					offset: 0,
					limit: 10,
				},
			});
			/**
			 * Search Event
			 */
			const doSearch = (offset, limit, order, sort) => {
				table.isLoading = true;
				setTimeout(() => {
					table.isReSearch = offset == undefined ? true : false;
					//if (offset >= 10 || limit >= 20) {
					//	limit = 20;
					//}

					let likeText = null;
					if( searchTerm.value != null && searchTerm.value != "" ){
						likeText = searchTerm.value;
					}

					fetchData(table, offset, limit, order, sort, likeText);

					
				}, 600);
			};
			

			// First get data
			doSearch(0, 10, 'depthcharge_dmg', 'desc');
			return {
				table,
				doSearch,
				searchTerm,
			};
		},
		methods: {
			rowClicked: function(row) {
				this.$router.push("/players/" + row.id);
			}
		},
		watch: {
			searchTerm() {
				this.doSearch(this.table.sortable.offset, this.table.sortable.limit, this.table.sortable.order, this.table.sortable.sort);
			}
		},
	});
</script>

<style>
#otherweapons-page {
	background-image: url("https://navalbattlezone.com/test/planes.jpg");
	background-repeat: no-repeat;
	background-position: center right;
	background-attachment: fixed;
    background-size: contain;
    width: inherit !important;
	height: inherit !important;
	padding: 20px;
}

.vtl {
	background-color: rgba(0, 0, 0, 0.5) !important;
}

.vtl-card {
	background-color: rgba(0, 0, 0, 0.5) !important;
}

.vtl-table thead th {
	background-color: rgba(0, 0, 0, 0.5) !important;
}

table {
	border: none;
}

.vtl-paging {
	color: white;
}

</style>