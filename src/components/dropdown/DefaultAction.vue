<template>
  <button type="button" class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
    data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
    <KTIcon icon-name="abstract-28" icon-class="fs-2" />
  </button>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold py-4 w-200px fs-6"
    data-kt-menu="true">
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content text-muted pb-2 px-3 fs-7 text-uppercase text-start">
        Action
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu items-->
    <div v-for="action in actionList" :key="action.label" class="menu-item px-3">
      <div v-if="action.type === 'link'">
        <router-link class="menu-link px-3" :to="action.target!">{{ action.label }}</router-link>
      </div>
      <div v-else-if="action.type === 'handleFunction'">
        <a href="#" class="menu-link text-danger px-3" @click.prevent="action.handler">{{ action.label }}</a>
      </div>
    </div>
    <!--end::Menu items-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { RouteLocationRaw } from "vue-router";

interface Action {
  label: string;
  type: 'link' | 'handleFunction';
  target?: RouteLocationRaw;
  handler?: () => void;
}

export default defineComponent({
  name: "DefaultAction",
  props: {
    actionList: {
      type: Array as PropType<Action[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
/* Gaya khusus untuk komponen ini */
</style>
