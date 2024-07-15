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
        <h3 class="card-title">Customer View</h3>
        <div class="card-toolbar">
          <router-link
            class="btn btn-sm btn-primary me-3"
            :to="{ name: 'customers-list' }"
          >
            <KTIcon icon-name="left" icon-class="fs-2" />
            <span>Back</span>
          </router-link>
        </div>
      </div>
      <div class="card-body pt-9 pb-0">
        <!--begin::Details-->
        <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
          <!--begin: Pic-->
          <div class="me-7 mb-4">
            <div
              class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
            >
              <img
                :src="
                  getUploadAssetPath(record.imageUrl)
                "
                alt="image"
              />
            </div>
          </div>
          <!--end::Pic-->
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
                  <span class="fs-2 fw-bold me-1">{{
                    record.name
                  }}</span>
                </div>
                <!--end::Name-->
                <!--begin::Info-->
                <div class="d-flex flex-wrap pe-2">
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">Code :</span>
                    <span class="text-gray-900 fw-semibold d-block">{{ record.code }}</span>
                  </div>
                </div>
                <!--end::Info-->
                <!--begin::Info-->
                <div class="d-flex flex-wrap pe-2">
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">Address :</span>
                    <span class="text-gray-900 fw-semibold d-block">{{ record.address }}</span>
                  </div>
                </div>
                <!--end::Info-->
                <!--begin::Info-->
                <div class="d-flex flex-wrap pe-2">
                  <div
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">PIC :</span>
                    <span class="text-gray-900 fw-semibold d-block">{{ record.pic }}</span>
                  </div>
                  <div v-if="record.taxNumber != null"
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">Tax Number :</span>
                    <span class="text-gray-900 fw-semibold d-block">{{ record.taxNumber }}</span>
                  </div>
                  <div  v-if="record.email != null"
                    class="d-flex align-items-center me-5 mb-2"
                  >
                    <span class="text-gray-700 fw-bold d-block me-2">Email :</span>
                    <span class="text-gray-900 fw-semibold d-block">{{ record.email }}</span>
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
import type { IOriginArea } from "@/core/model/OriginArea";
import ActiveInactive from "@/components/badge/ActiveInactive.vue";

const getData = async (id) => {
  try {
    ApiService.setHeader();
    const response = await ApiService.query(`customers/${id}`, {
      
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default defineComponent({
  name: "customers-view",
  components: {
    ActiveInactive
  },
  setup() {
    const route = useRoute(); // Access route to get parameters
    const dataId = route.params.id; // Get 'id' from the route
    const record = ref<IOriginArea>({} as IOriginArea);

    const fetchData = async () => {
      const data = await getData(dataId);
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
