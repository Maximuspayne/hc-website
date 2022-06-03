<template>
	<div id="sinkings-page">
		<div style="text-align: center">
			<table style="text-align: left">
				<tr>
					<td>
						<img src="@/assets/hcwn.png" style="width:200px">
					</td>
					<td>
						<h1 style="background-color:rgba(0,0,0,0.5);color:white">High Caliber World News</h1>
                        <h1 style="background-color:rgba(0,0,0,0.5);color:white">Breaking News!... Latest Ship Sinkings...</h1>
					</td>
					<td>

					</td>
				</tr>
			</table>
			<label style="background-color:rgba(0,0,0,0.5);color:white;text-align:center">Victorious Vehicle Search:</label><input v-model="causerSearchTerm" />
            &nbsp;&nbsp;
            <label style="background-color:rgba(0,0,0,0.5);color:white;text-align:center">Defeated Vehicle Search:</label><input v-model="killedSearchTerm" />
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
            <template v-slot:killed_pname="data">
				<LeaderboardNameGrid>
                    <template v-slot:rank-text><h6>{{data.value.killedRankName}}</h6></template>
					<template v-slot:name-text><h3>{{data.value.killed_pname}}</h3></template>
				</LeaderboardNameGrid>	
			</template>
            <template v-slot:causer_pname="data">
				<LeaderboardNameGrid>
                    <template v-slot:rank-text><h6>{{data.value.causerRankName}}</h6></template>
					<template v-slot:name-text><h3>{{data.value.causer_pname}}</h3></template>
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

	const fetchData = (table, offset, limit, order, sort, likeKilledText, likeCausedText) => {
		const axios = require('axios').default;
        // Start use axios to get data from Server
		let desc = 1;
		if( sort == "asc" )
			desc = 0;

		let urlA = "https://navalbattlezone.com/test/ship_sinkings.php?count=1";

		if( likeKilledText != null )
			urlA += "&likekilled=" + likeKilledText;
        if( likeCausedText != null )
			urlA += "&likecaused=" + likeCausedText;

		axios.get(urlA).then((response) => {
			table.totalRecordCount = response.data[0].count;
		});

		let urlB = "https://navalbattlezone.com/test/ship_sinkings.php?offset=" + offset + "&limit=" + limit + "&sort=" + order + "&desc=" + desc;
		if( likeKilledText != null )
			urlB += "&likekilled=" + likeKilledText;    
        if( likeCausedText != null )
			urlB += "&likecaused=" + likeCausedText;

		axios.get(urlB).then((response) => {
			table.rows = response.data;

            for( let row of table.rows ){
				row.killedRankName = rankIDToName(row.killed_rank);
                row.causerRankName = rankIDToName(row.causer_rank);
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
			const killedSearchTerm = ref(""); // Search text
            const causerSearchTerm = ref(""); 

			// Table config
			const table = reactive({
				isLoading: false,
				columns: [
                    {
						label: "Date/Time",
						field: "timestamp",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
                    {
						label: "Victorious Captain",
						field: "causer_pname",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
                    {
						label: "Victorious Vehicle",
						field: "causer_name",
						width: "2%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
                    {
						label: "Defeated Captain",
						field: "killed_pname",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
                    {
						label: "Defeated Vehicle",
						field: "vkilled_name",
						width: "2%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
                    {
						label: "Tonnage",
						field: "vkilled_tons",
						width: "1%",
						sortable: true,
						columnStyles: { color: "white", border: "none" },
					},
				],
				rows: [],
				totalRecordCount: 0,
				sortable: {
					order: "timestamp",
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

					let likeKilledText = null;
					if( killedSearchTerm.value != null && killedSearchTerm.value != "" ){
						likeKilledText = killedSearchTerm.value;
					}
                    let likeCausedText = null;
					if( causerSearchTerm.value != null && causerSearchTerm.value != "" ){
						likeCausedText = causerSearchTerm.value;
					}

					fetchData(table, offset, limit, order, sort, likeKilledText, likeCausedText);

					
				}, 600);
			};
			

			// First get data
			doSearch(0, 10, 'timestamp', 'desc');
			return {
				table,
				doSearch,
				killedSearchTerm,
                causerSearchTerm
			};
		},
		methods: {
			rowClicked: function(row) {
                console.log(row);
				//this.$router.push("/players/" + row.id);
			}
		},
		watch: {
			killedSearchTerm() {
				this.doSearch(this.table.sortable.offset, this.table.sortable.limit, this.table.sortable.order, this.table.sortable.sort);
			},
            causerSearchTerm() {
				this.doSearch(this.table.sortable.offset, this.table.sortable.limit, this.table.sortable.order, this.table.sortable.sort);
			}
		},
	});
</script>

<style>
#sinkings-page {
	background-image: url("https://navalbattlezone.com/test/breakingnews.jpg");
	background-repeat: no-repeat;
	background-position: right center;
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

.vtl-table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.9) !important;
}

</style>