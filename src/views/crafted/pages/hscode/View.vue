<template>
  <div>
    <!-- If club data is null, display a loading message or spinner -->
    <div v-if="record.id === undefined">
      <p>Loading data details...</p>
      <!-- Optionally, add a loading spinner -->
      <div class="spinner"></div>
    </div>

    <!--begin::Navbar-->
    <div v-else class="card mb-5 mb-xxl-8">
      <div class="card-header">
        <h3 class="card-title">HS Code View</h3>
        <div class="card-toolbar">
          <router-link
            class="btn btn-sm btn-primary me-3"
            :to="{ name: 'hscodes-list' }"
          >
            <KTIcon icon-name="left" icon-class="fs-2" />
            <span>Back</span>
          </router-link>
        </div>
      </div>
      <div class="card-body pt-9 pb-0">
        <!--begin::Details-->
        <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
          <!--begin::Info-->
          <div class="flex-grow-1">
            <!--begin::Title-->
            <div
              class="d-flex justify-content-between align-items-start flex-wrap mb-2"
            >
              <!--begin::User-->
              <div class="d-flex flex-column">
                <!--begin::Name-->
                <div class="d-flex align-items-center mb-2">
                  <span class="text-gray-800 fs-2 fw-bold me-1">{{
                    record.name
                  }}</span>
                </div>
                <!--end::Name-->

                <!--begin::Info-->
                <div class="d-flex flex-wrap fw-semibold pe-2">
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">Code :</span>
                    <span class="text-gray-900 fw-semibold d-block">{{ record.code }}</span>
                  </div>
                </div>
                <!--end::Info-->
                <!--begin::Info-->
                <div class="d-flex flex-wrap fw-semibold pe-2">
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">Description :</span>
                    <span class="text-gray-900 fw-semibold d-block">{{ record.description }} </span>
                  </div>
                </div>
                <!--end::Info-->
                <!--begin::Info-->
                <div class="d-flex flex-wrap fw-semibold pe-2">
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                      <span class="text-gray-700 fw-bold d-block me-2">BM :</span>
                      <span class="text-gray-900 fw-semibold d-block">{{ record.bm }}% </span>
                  </div>
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                      <span class="text-gray-700 fw-bold d-block me-2">PPH :</span>
                      <span class="text-gray-900 fw-semibold d-block">{{ record.pph }}% </span>
                  </div>
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                      <span class="text-gray-700 fw-bold d-block me-2">PPN :</span>
                      <span class="text-gray-900 fw-semibold d-block">{{ record.ppn }}% </span>
                  </div>
                </div>
                <!--end::Info-->
                <!--begin::Info-->
                <div class="d-flex flex-wrap fw-semibold fs-5 pe-2">
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">Lartas :</span>
                    <YesNoBadge :status="record.lartas!"/>
                  </div>
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">SPI Permit :</span>
                    <YesNoBadge :status="record.spiPermit!"/>
                  </div>
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">SNI :</span>
                    <YesNoBadge :status="record.sni!"/>
                  </div>
                </div>
                <!--end::Info-->
                <!--begin::Info-->
                <div class="d-flex flex-wrap fw-semibold pe-2">
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">Status :</span>
                    <ActiveInactive :status="record.status!"/>
                  </div>
                </div>
                <!--end::Info-->
                <!--begin::Info-->
                <div class="d-flex flex-wrap fw-semibold pe-2">
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">Created At :</span>
                    <span :class="`text-gray-900 fw-semibold d-block`">
                      {{ getLocaleFormatted(record.createdAt) }}
                    </span>
                  </div>
                </div>
                <!--end::Info-->
                <!--begin::Info-->
                <div class="d-flex flex-wrap fw-semibold pe-2">
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">Update At :</span>
                    <span class="text-gray-900 fw-semibold d-block">
                      {{ getLocaleFormatted(record.updatedAt) }}
                    </span>
                  </div>
                </div>
                <!--end::Info-->
              </div>
              <!--end::User-->
            </div>
            <!--end::Title-->
          </div>
          <!--end::Info-->
        </div>
        <!--end::Details-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getUploadAssetPath } from "@/core/helpers/assets";
import ApiService from "@/core/services/ApiService";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import  {getLocaleFormatted}  from "@/core/helpers/date_utils";
import type { IHscode } from "@/core/model/HsCode";
import YesNoBadge from "@/components/badge/YesNo.vue";
import ActiveInactive from "@/components/badge/ActiveInactive.vue";

const getData = async (id) => {
  try {
    ApiService.setHeader();
    const response = await ApiService.query(`hscodes/${id}`, {
      
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default defineComponent({
  name: "hscodes-view",
  components: {
    YesNoBadge,
    ActiveInactive,
  },
  setup() {
    const route = useRoute(); // Access route to get parameters
    const dataId = route.params.id; // Get 'id' from the route
    const record = ref<IHscode>({} as IHscode);

    const fetchData = async () => {
      const data = await getData(dataId);
      data.lartas = data.lartas === 1;
      data.spiPermit = data.spiPermit === 1;
      data.sni = data.sni === 1;
      data.status = data.status === 1;
      record.value = data;
    };

    onMounted(() => {
      fetchData(); // Fetch data when component is mounted
    });

    return {
      getUploadAssetPath,
      getLocaleFormatted,
      record,
    };
  },
});
</script>
