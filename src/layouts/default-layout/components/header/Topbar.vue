<template>
  <!--begin::Action group-->
  <div class="d-flex align-items-stretch overflow-auto pt-3 pt-lg-0">
    <!--begin::Theme mode-->
    <div class="d-flex align-items-center me-2">
      <!--begin::Menu toggle-->
      <a
        href="#"
        class="btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary"
        data-kt-menu-trigger="{default:'click', lg: 'hover'}"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon icon-name="night-day" icon-class="theme-light-show fs-2" />
        <KTIcon icon-name="moon" icon-class="theme-dark-show fs-2" />
      </a>
      <!--end::Menu toggle-->
      <KTThemeModeSwitcher></KTThemeModeSwitcher>
    </div>
    <!--end::Theme mode-->

    <div class="d-flex align-items-center me-5">
      <div class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px position-relative" id="kt_drawer_chat_toggle">
        <KTIcon icon-name="notification" icon-class="fs-1 me-n1 minimize-default" />
        <!-- <span class="bullet bullet-dot bg-primary h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span> -->
      </div> 
    </div>
    <!--begin::Theme mode-->
    <div class="d-flex align-items-center">
      <!--begin::Menu toggle-->
      <a @click="signOut()" class="btn btn-sm btn-outline btn-outline-danger">
        <i class="ki-duotone ki-exit-left fs-1 me-n1 minimize-default">
          <span class="path1"></span><span class="path2"></span>
        </i>
        LOGOUT
      </a>
      <!--end::Menu toggle-->
    </div>
    <!--end::Theme mode-->
  </div>
  <!--end::Action group-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted } from "vue";
import noUiSlider, { type target } from "nouislider";
import KTThemeModeSwitcher from "@/layouts/default-layout/components/theme-mode/ThemeModeSwitcher.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "layout-topbar",
  components: {
    KTThemeModeSwitcher,
  },
  setup() {

    const router = useRouter();
    const store = useAuthStore();

    const signOut = () => {
      store.logout();
      router.replace({ name: "", force: true });
    };

    const initSlider = (): void => {
      const slider: target = document.querySelector(
        "#kt_toolbar_slider"
      ) as target;
      const rangeSliderValueElement: Element | null = document.querySelector(
        "#kt_toolbar_slider_value"
      );

      if (!slider) {
        return;
      }

      slider.innerHTML = "";

      noUiSlider.create(slider, {
        start: [5],
        connect: [true, false],
        step: 1,
        range: {
          min: [1],
          max: [10],
        },
      });

      slider.noUiSlider?.on("update", function (values: any, handle: any) {
        if (!rangeSliderValueElement) {
          return;
        }

        rangeSliderValueElement.innerHTML = parseInt(values[handle]).toFixed(1);
      });
    };

    onMounted(() => {
      initSlider();
    });

    return {
      getAssetPath,
      signOut,
    };
  },
});
</script>

<style scoped>
/* Add any necessary styles here */
</style>
