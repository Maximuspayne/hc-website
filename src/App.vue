<template>
  <div id="page-wrapper">
    <NavMenu />
    <div id="main-content-wrapper">
      <TopBanner />
      <Main />
    </div>
  </div>
</template>

<script>
import TopBanner from "@/components/structural/TopBanner.vue";
import NavMenu from "@/components/structural/NavMenu.vue";
import Main from "@/components/structural/Main.vue";

export default {
  name: "App",
  components: {
    TopBanner,
    NavMenu,
    Main,
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
  text-align: center;
  color: #2c3e50;
}

#page-wrapper {
  display: flex;
}

.main-content-wrapper {
  display: flex;
}
</style>
