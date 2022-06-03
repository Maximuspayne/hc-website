<template>
	<div id="roster-page">
		<div style="text-align: center">
			<table style="margin:auto">
				<tr>
					<td>
						<img src="@/assets/hcn-logo.png" style="width:80px">
					</td>
					<td>
						<h1 style="background-color:rgba(0,0,0,0.5);color:white"> High Caliber Navy Roster</h1>
					</td>
					<td>
						<img src="@/assets/hcn-logo.png" style="width:80px">
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
			<template v-slot:hcn_rank_id="data">
				<RankGrid>
					<template v-slot:image> <span v-html="data.value.rankImage"></span> </template>
					<template v-slot:name>{{data.value.rankName}}</template>
				</RankGrid>	
			</template>
			<template v-slot:name="data">
				<NameGrid>
					<template v-slot:name-text><h1>{{data.value.name}}</h1></template>
				</NameGrid>	
			</template>
			<template v-slot:is_online="data">
				<OnlineGrid>
					<template v-slot:online-text>{{data.value.onlineText}}</template>
				</OnlineGrid>	
			</template>
		</table-lite>
	</div>
</template>

<script>
	import { defineComponent, reactive, ref } from "vue";
	import TableLite from "vue3-table-lite";
	import RankGrid from "@/components/structural/RankGrid.vue";
	import OnlineGrid from "@/components/structural/OnlineGrid.vue";
	import NameGrid from "@/components/structural/NameGrid.vue";
	import {rankIDToImage,rankIDToName} from "@/utils/ranks.js";


	const fetchData = (table, offset, limit, order, sort, likeText) => {
		const axios = require('axios').default;
        // Start use axios to get data from Server
		let desc = 1;
		if( sort == "asc" )
			desc = 0;

		let urlA = "https://navalbattlezone.com/test/testphp.php?count=1";

		if( likeText != null )
			urlA += "&like=" + likeText;
		axios.get(urlA).then((response) => {
			table.totalRecordCount = response.data[0].count;
		});

		let urlB = "https://navalbattlezone.com/test/testphp.php?offset=" + offset + "&limit=" + limit + "&sort=" + order + "&desc=" + desc;
		if( likeText != null )
			urlB += "&like=" + likeText;

		axios.get(urlB).then((response) => {
			table.rows = response.data;

			for( let row of table.rows ){
				let rankFile = rankIDToImage(row.hcn_rank_id);
				row.rankImage = '<img style="width:80px" src="https://navalbattlezone.com/test/ranks/' + rankFile + '">';
				row.rankName = rankIDToName(row.hcn_rank_id);
				if( row.is_online > 0 )
					row.onlineText = "Online!";
			}

			table.sortable.order = order;
			table.sortable.sort = sort;
			table.sortable.offset = offset;
			table.sortable.limit = limit;
		});
		
	};

	export default defineComponent({
		name: "App",
		components: { TableLite, RankGrid, OnlineGrid, NameGrid },
		setup() {
			const searchTerm = ref(""); // Search text

			// Table config
			const table = reactive({
				isLoading: false,
				columns: [
					{
						label: "Rank",
						field: "hcn_rank_id",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none"  },
					},
					{
						label: "Player Name",
						field: "name",
						width: "16%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
					{
						label: "Online",
						field: "is_online",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
				],
				rows: [],
				totalRecordCount: 0,
				sortable: {
					order: "hcn_rank_id",
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
			doSearch(0, 10, 'hcn_rank_id', 'desc');
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
#roster-page {
	background-image: url("https://navalbattlezone.com/test/crew_1.jpg");
	background-repeat: no-repeat;
	background-position: center center;
	background-attachment: fixed;
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