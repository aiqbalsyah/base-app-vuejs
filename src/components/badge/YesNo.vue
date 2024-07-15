<template>
    <span v-if="status" :class="`badge badge-light-primary`">
      YES
    </span>
    <span v-else :class="`badge badge-light-warning`">
      NO
    </span>
  </template>
  
<script lang="ts">
    import { defineComponent, type PropType } from "vue";

    export default defineComponent({
    name: "YesNoBadge",
    props: {
        status: {
        type: Boolean as PropType<boolean>,
        required: true,
        },
    },
    });
</script>