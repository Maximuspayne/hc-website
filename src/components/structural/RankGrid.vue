<template>
    <slot name="image"></slot>
    <br>
    <span style="text-align=center"><slot name="name"></slot></span>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "rank-grid",
});
</script>

<style scoped></style>