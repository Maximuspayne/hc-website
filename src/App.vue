<template>
  <div id="page-wrapper">
    <NavMenu />
    <div id="content-wrapper">
      <TopBanner />
      <div class="main-content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import TopBanner from "@/components/structural/TopBanner.vue";
import NavMenu from "@/components/structural/NavMenu.vue";

export default {
  name: "App",
  components: {
    TopBanner,
    NavMenu,
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#page-wrapper {
  display: flex;
}

.content-wrapper {
  display: flex;
}

.main-content-wrapper {
  padding: 0 2.5rem 1rem;
  background-color: black;
}

h1 {
  margin-top: 0;
}
</style>
