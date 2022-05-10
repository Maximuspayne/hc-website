<template>
  <nav id="nav-menu">
    <div id="hc-logo">Logo</div>
    <router-link to="/home">  </router-link>
  </nav>
</template>

<script>
export default {
  name: "NavMenu",
};
</script>

<style>
#nav-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 200px;
  padding: 0 30px;
  background-color: magenta;
  min-height: 100vh;
}

#hc-logo {
  padding: 30px 0;
}
</style>
