<template>
	<div id="top-banner">
		<table>
			<tr>
				<td style="width:70%"><h2><i>Welcome to our new website - Work in Progress!</i></h2></td>
				<td><router-link to="/"><img src="@/assets/banner-logo.png" id="banner-image" alt="Banner"></router-link></td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {

}
</script>

<style>
#top-banner {
	background-image: url("~@/assets/iron_block.png");
	background-repeat: repeat;

	padding: 1rem 1rem;
	background-color: black;
	color: rgb(48, 48, 48);
	text-align: left;

}
i {
	background-color: orange;
	margin-left: 50px;
}
#banner-image {
	background-color: black;
	border-style: inset;
	border-color: gray;
}
</style>