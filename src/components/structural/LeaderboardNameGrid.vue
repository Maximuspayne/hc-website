<template>
    <span><slot name="rank-text"></slot></span>
    <span><slot name="name-text"></slot></span>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "leaderboard-name-grid",
});
</script>

<style scoped></style>