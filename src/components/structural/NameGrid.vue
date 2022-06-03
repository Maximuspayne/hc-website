<template>
    <span style="text-align=center"><slot name="name-text"></slot></span>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "name-grid",
});
</script>

<style scoped></style>