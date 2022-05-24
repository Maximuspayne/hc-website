<template>
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
	>
		<template v-slot:hcn_rank_id="data">
			<Test>
				<template v-slot:image> <span v-html="data.value.rankImage"></span> </template>
				<template v-slot:name>{{data.value.rankName}}</template>
			</Test>	
		</template>
	</table-lite>
</template>

<script>
	import { defineComponent, reactive } from "vue";
	import TableLite from "vue3-table-lite";
	import Test from "@/components/Test.vue";
	


	const fetchData = (table, offset, limit, order, sort) => {
		const axios = require('axios').default;
        // Start use axios to get data from Server
		let desc = 1;
		if( sort == "asc" )
			desc = 0;

		let urlA = "https://navalbattlezone.com/test/testphp.php?count=1";
		axios.get(urlA).then((response) => {
			table.totalRecordCount = response.data[0].count;
		});

		let urlB = "https://navalbattlezone.com/test/testphp.php?offset=" + offset + "&limit=" + limit + "&sort=" + order + "&desc=" + desc;
		axios.get(urlB).then((response) => {
			table.rows = response.data;

			for( let row of table.rows ){
				let rankFile = rankIDToImage(row.hcn_rank_id);
				row.rankImage = '<img src="/assets/ranks/' + rankFile + '">';
				row.rankName = rankIDToName(row.hcn_rank_id);
				console.log(row);
			}

			table.sortable.order = order;
			table.sortable.sort = sort;
		});
		
	};

	export default defineComponent({
		name: "App",
		components: { TableLite, Test },
		setup() {
			// Table config
			const table = reactive({
				isLoading: false,
				columns: [
					{
						label: "ID",
						field: "id",
						width: "1%",
						sortable: true,
						isKey: true,
					},
					{
						label: "Rank",
						field: "hcn_rank_id",
						width: "3%",
						sortable: true,
						/*isplay: function (row) {
							let rankName = rankIDToName(row.hcn_rank_id);
							return (
								rankName
							);
						},*/
					},
					{
						label: "Player Name",
						field: "name",
						width: "10%",
						sortable: true,
					},
				],
				rows: [],
				totalRecordCount: 0,
				sortable: {
					order: "hcn_rank_id",
					sort: "desc",
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

					fetchData(table, offset, limit, order, sort);

					
				}, 600);
			};
			// First get data
			doSearch(0, 10, 'hcn_rank_id', 'desc');
			return {
				table,
				doSearch,
			};
		},
	});

	function rankIDToImage(rankID) {
		switch(rankID){
			case 1:
				return "rank-seaman.png";
			case 35:
				return "rank-adm5.png";
		}
	}

	function rankIDToName(rankID) {
		switch(rankID){
			case 1:
				return "Seaman-Recruit";
			case 35:
				return "Fleet Admiral";
		}
	}
</script>