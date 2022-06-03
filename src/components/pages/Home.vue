<template>
	<img src="@/assets/hc-logo-1.jpg" alt="HC Logo" style="display:block;margin:auto;width:30%">
	<p>NavalBattleZone: High Caliber is game that focuses on the building, sailing, and combat of World War 1 and 2 era ships and submarines.</p>

	<img src="@/assets/shipyard_1.webp" alt="Shipyard" class="img-group">
	<img src="@/assets/ship_1.webp" alt="Ship" class="img-group">
	<img src="@/assets/bb_fire.gif" alt="Texas Firing" class="img-group">

	<p>The game itself is a modified Minecraft (Java Edition) server, it uses Minecraft as a game engine (along with Bukkit/Spigot/Paper) to create a unique Naval block-based building and combat experience.</p>
	<br>
	<br>
	<p>The original NavalBattleZone server was started back in 2011, and High Caliber is a sequel and complete remake of the original project, done by the same developer. It primarily focuses on greater realism and more features for ships and submarines.</p>
	<br>
	<br>
	<p>You can find both naval shipbuilding and naval combat on this server...you can...</p>
	<ul>
		<li>Build a realistic 1:1 Minecraft scale ship using our custom resource pack, textures, and models to build the finest looking ships and interiors in Minecraft. Build in a protected plot with our Shipyard system, and enjoy the convenience of WorldEdit to help you do large-scale builds.</li>
		<li>Sail as crew or captain onboard a ship using our Navycraft plugin (similar to Movecraft style movement). Man the cannons, fire the torpedoes, watch the radar and sonar, and perform repairs on your ship. No mod downloads required, though we always recommend Optifine.</li>
		<li>Do both! Build your ship in the drydock, and then test your ship in Sea Trials. Test your weapons, perform armor tests, speed tests, and then recruit a crew and go on a mission.</li>
	</ul>
</template>

<script>
export default {
	name: 'Home',
};
</script>

<style>
p,li {
	color: white;
	font-size: 1.5em;
}
.img-group{
	margin:auto;
	width:30%
}

@media only screen and (max-width: 768px) {
  .img-group {width: 100%;}
}
</style>
