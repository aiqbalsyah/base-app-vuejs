<template>
    <span v-if="status" :class="`badge badge-primary`">
      ACTIVE
    </span>
    <span v-else :class="`badge badge-danger`">
      INACTIVE
    </span>
  </template>
  
<script lang="ts">
    import { defineComponent, type PropType } from "vue";

    export default defineComponent({
    name: "ActiveInactiveBadge",
    props: {
        status: {
        type: Boolean as PropType<boolean>,
        required: true,
        },
    },
    });
</script>