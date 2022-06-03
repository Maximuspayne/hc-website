<template>
	<div id="details-page">
		<router-link to="/players" class="nav-link" style="background-color:gray">Back to Roster</router-link>
		<br>
		<br>
		<table style="width:88%;margin-left:6%;margin-right:6%">
			<tr>
				<td>
					<table>
						<tr>
							<td>
								<h1 style="font-size: 40px;padding-top: 40px">{{ playerInfo.rankName }}</h1>
							</td>
							<td>
								<span v-html="playerInfo.rankImage"></span>
							</td>
						</tr>
					</table>
				</td>
				<td>
					<img src="@/assets/hcn-logo.png" style="width:80px">
				</td>
				<td>
					<h1 style="color:black">Player Service Record</h1>
					<h3> ID:{{ playerInfo.id }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ playerInfo.isOnline }}</h3>
				</td>
			</tr>
		</table>
		
		<table style="width:88%;margin-left:6%;margin-right:6%">
			<tr>
				<td style="width:50%;">
					<h1 style="font-size: 50px">&nbsp;&nbsp;{{ playerInfo.name }}</h1>
				</td>
				<td style="width:50%;">
					<ul>
						<li style="color:black;">Money: ${{ playerInfo.acg_money }}</li>
						<li style="color:black;">Villagers: {{ playerInfo.villagercrew }}</li>
						<li style="color:black;">Total Time: {{ playerInfo.timePlayed }}</li>
					</ul>
				</td>
			</tr>
		</table>
		<table style="width:88%;margin-left:6%;margin-right:6%">
			<tr>
				<td style="width:40%">
					<ul> <h2>Kill Record</h2>
						<li>PVP tons (captain): {{ playerInfo.capt_pvp_tons }}</li>
						<li>Total tons (captain): {{ playerInfo.capt_total_tons }}</li>
						<li>PVP tons (crew): {{ playerInfo.crew_pvp_tons }}</li>
						<li>Total tons (crew): {{ playerInfo.crew_total_tons }}</li>
						<li>Combined tons: {{ playerInfo.crew_total_tons*1+playerInfo.capt_total_tons*1 }}</li>
						<li>Player Kills: {{ playerInfo.player_kills }}</li>
						<li>Villager Kills: {{ playerInfo.villager_kills }}</li>
						<li>Survivor Kills: {{ playerInfo.survivor_kills }}</li>
						<li>Survivors Rescued: {{ playerInfo.survivor_saves }}</li>
						<li>Deaths: {{ playerInfo.deaths }}</li>
					</ul>
				</td>
				<td style="width:60%;">
					<ul> <h2>Weapons Record</h2>
						<li>AA Damage: {{ playerInfo.aa_dmg }} ({{playerInfo.aa_dps}} dps) </li>
						<li>AA Fired/Hit: {{ playerInfo.aa_hit }}/{{ playerInfo.aa_fired }} ({{playerInfo.aa_per}}%)</li>
						<li>Cannon Damage: {{ playerInfo.cannon_dmg }} ({{playerInfo.cannon_dps}} dps)</li>
						<li>Cannon Fired/Hit: {{ playerInfo.cannon_hit }}/{{ playerInfo.cannon_fired }} ({{playerInfo.cannon_per}}%)</li>
						<li>Torpedo Damage: {{ playerInfo.torpedo_dmg }} ({{playerInfo.torpedo_dps}} dps)</li>
						<li>Torps Fired/Hit: {{ playerInfo.torpedo_hit }}/{{ playerInfo.torpedo_fired }} ({{playerInfo.torpedo_per}}%)</li>
						<li>Dpth Chrg Dmg: {{ playerInfo.depthcharge_dmg }} ({{playerInfo.depthcharge_dps}} dps)</li>
						<li>Dpth Chrg Fired: {{ playerInfo.depthcharge_fired }} </li>
						<li>Collision Damage: {{ playerInfo.collision_dmg }}</li>
						<li>TNT Damage: {{ playerInfo.tnt_dmg }}</li>
						<li>Major Fires: {{ playerInfo.major_fires }}</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td style="width:40%">
					<ul> <h2>Misc. Record</h2>
						<li>Damage Repaired: {{ playerInfo.damage_repaired }}</li>
						<li>Fire Buckets Used: {{ playerInfo.fire_buckets }}</li>
						<li>Fire Hose Used: {{ playerInfo.fire_hoses }}</li>
						<li>Bilges Pumped: {{ playerInfo.bilge_pumps }}</li>
						<li>Meals Cooked: {{ playerInfo.meals_cooked }}</li>
						<li>Respects Given: {{ playerInfo.respect_given }}</li>
					</ul>
				</td>
				<td style="width:60%">

				</td>
			</tr>
			<tr>
				<td style="width:40%">
					<ol> <h2>Ships Designed</h2>
						<li v-for="ship in playerInfo.ships" :key="ship.id">
							{{ ship.plotname }}
						</li>
					</ol>
				</td>
			</tr>
			<tr>
				<td style="width:30%">
					<ol> <h2>Command Wins Record</h2>
						<li v-for="win in playerInfo.wins" :key="win.id">
							{{ win.timestamp }}&nbsp;&nbsp;&nbsp;{{ win.vkilled_tons }} Tons
							<br>
							{{ win.vkilled_name }}
							<br>
							commanded by {{ win.rankName }}-{{ win.killed_pname }}
							<br>
							<em>&nbsp;&nbsp;victorious with the</em>
							<br>
							<em>&nbsp;&nbsp;{{ win.causer_name }}</em>
						</li>
					</ol>
				</td>
				<td style="width:30%;vertical-align: top;">
					<ol> <h2>Command Loss Record</h2>
						<li v-for="loss in playerInfo.loss" :key="loss.id">
							{{ loss.timestamp }}&nbsp;&nbsp;&nbsp;{{ loss.vkilled_tons }} Tons
							<br>
							{{ loss.vkilled_name }}
							<br>
							<em>defeated by {{ loss.rankName }}-{{ loss.causer_pname }}</em>
							<br>
							<em>&nbsp;&nbsp;commanding the</em>
							<br>
							<em>&nbsp;&nbsp;{{ loss.causer_name }}</em>
						</li>
					</ol>
				</td>
			</tr>
		</table>

		
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<router-link to="/players" class="nav-link" style="background-color:gray">Back to Roster</router-link>
	</div>
</template>

<script>
import {rankIDToImage,rankIDToName,rankIDToShortName} from "@/utils/ranks.js";

export default {
	name: 'PlayerDetails',
	data() {
		return {
			playerInfo: {},
		};
	},
	created() {
		// Grabs the player id param from the url
		const playerId = +this.$route.params.id; // the + coerces the type to be a number, not a string

		const axios = require('axios').default;

		let urlA = "https://navalbattlezone.com/test/player.php?id=" + playerId;
		axios.get(urlA).then((response) => {
			this.playerInfo = response.data[0];
			this.playerInfo.rankName = rankIDToName(this.playerInfo.hcn_rank_id);
			let rankFile = rankIDToImage(this.playerInfo.hcn_rank_id);
			
			if( this.playerInfo.is_online > 0 )
				this.playerInfo.isOnline = "Online!";
			else
				this.playerInfo.isOnline = "Offline";
			
			this.playerInfo.timePlayed = msToTime(this.playerInfo.total_time);
			this.playerInfo.capt_total_tons = Math.round(this.playerInfo.capt_pvp_tons*1 + this.playerInfo.capt_ai_tons*1);
			this.playerInfo.capt_pvp_tons = Math.round(this.playerInfo.capt_pvp_tons*1);
			this.playerInfo.crew_total_tons = Math.round(this.playerInfo.crew_pvp_tons*1 + this.playerInfo.crew_ai_tons*1);
			this.playerInfo.crew_pvp_tons = Math.round(this.playerInfo.crew_pvp_tons*1);
			this.playerInfo.aa_per = Math.round(this.playerInfo.aa_hit*100/this.playerInfo.aa_fired);
			this.playerInfo.aa_dps = Math.round(this.playerInfo.aa_dmg*100/this.playerInfo.aa_fired)/100;
			this.playerInfo.cannon_per = Math.round(this.playerInfo.cannon_hit*100/this.playerInfo.cannon_fired);
			this.playerInfo.cannon_dps = Math.round(this.playerInfo.cannon_dmg*10/this.playerInfo.cannon_fired)/10;
			this.playerInfo.torpedo_per = Math.round(this.playerInfo.torpedo_hit*100/this.playerInfo.torpedo_fired);
			this.playerInfo.torpedo_dps = Math.round(this.playerInfo.torpedo_dmg*10/this.playerInfo.torpedo_fired)/10;
			this.playerInfo.depthcharge_dps = Math.round(this.playerInfo.depthcharge_dmg*10/this.playerInfo.depthcharge_fired)/10;
			this.playerInfo.rankImage = '<img style="max-width:100px" src="https://navalbattlezone.com/test/ranks/' + rankFile + '">';
		});

		let urlB = "https://navalbattlezone.com/test/plots.php?id=" + playerId;
		axios.get(urlB).then((response) => {
			this.playerInfo.ships = response.data;
		});

		let urlC = "https://navalbattlezone.com/test/playerwins.php?id=" + playerId;
		axios.get(urlC).then((response) => {
			this.playerInfo.wins = response.data;
			for( let row of this.playerInfo.wins ){
				row.rankName = rankIDToShortName(row.killed_rank);
			}	
		});

		let urlD = "https://navalbattlezone.com/test/playerloss.php?id=" + playerId;
		axios.get(urlD).then((response) => {
			this.playerInfo.loss = response.data;
			for( let row of this.playerInfo.loss ){
				row.rankName = rankIDToShortName(row.causer_rank);
			}	
		});
	},
};

function msToTime(s) {
	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;
	var days = Math.floor(hrs/24);
	hrs = hrs%24;

	return days + 'd:' + hrs + 'h:' + mins + 'm:' + secs + 's';
}

</script>

<style>

#details-page {
	background: url("https://navalbattlezone.com/test/service_record.jpg") repeat-y center top ;
	background-size: contain;
	width: inherit !important;
	height: inherit !important;
	min-height: 1800px;
}

ul {
	list-style-type: square;
}

li {
	color:black;
}
</style>
