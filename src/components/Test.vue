<template>
    <slot name="image"></slot>
    <slot name="name"></slot>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "test-component",
});
</script>

<style scoped></style>