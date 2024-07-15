<template>
  <!--begin::Timeline-->
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Origin Area List</h3>
      <div class="card-toolbar">
        <router-link
              class="btn btn-sm btn-primary me-3"
              :to="{ name: 'origin-areas-create' }"
            >
              <span>Create New</span>
            </router-link>
      </div>
    </div>
    <div class="card-body">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control mb-4"
        placeholder="Search"
      />
      <Datatable
        :loading="loading"
        :header="tableHeader"
        :data="tableData"
        :total="countData"
        :current-page="(params.offset / params.limit) + 1"
        :items-per-page="params.limit"
        :sort-label="coloumDefaultLabel"
        :sort-order="coloumDefaultSort"
        @page-change="changePage"
        @on-items-per-page-change="changeRowsPerPageLimit"
        @on-sort="handleSort"
      >
        <template v-slot:country_name="{ row: data }">
          {{ data.country.name }}
        </template>
        <template v-slot:code="{ row: data }">
          {{ data.code }}
        </template>
        <template v-slot:name="{ row: data }">
          {{ `${data.name}` }}
        </template>
        <template v-slot:status="{ row: data }">
          <ActiveInactive :status="data.status" />
        </template>
        <template v-slot:action="{ row: data  }">
          <div class="text-end">
            <DefaultAction :action-list="[
                { label: 'View', type: 'link', target: { name: 'origin-areas-view', params: { id: data.id } } },
                { label: 'Edit', type: 'link', target: { name: 'origin-areas-edit', params: { id: data.id } } },
                { label: 'Delete', type: 'handleFunction', handler: () => handleDelete(data.id) },
              ]"/>
          </div>
         
        </template>
      </Datatable>
    </div>
  </div>
  <!--end::Timeline-->
</template>

<script lang="ts">
import { getUploadAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted, watch } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import DataTablesService from "@/core/services/DataTablesSevice";
import ActiveInactive from "@/components/badge/ActiveInactive.vue";
import DefaultAction from "@/components/dropdown/DefaultAction.vue";
const deleteData = async (id) => {
  try {
    ApiService.setHeader();
    const response = await ApiService.delete(`origin-areas/${id}`);
    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
};

export default defineComponent({
  name: "origin-areas-list",
  components: {
    Datatable,
    ActiveInactive,
    DefaultAction,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Country",
        columnLabel: "country_name",
        columnWidth: 100,
        sortEnabled: true,
      },
      {
        columnName: "Code",
        columnLabel: "code",
        columnWidth: 100,
        sortEnabled: true,
      },
      {
        columnName: "Name",
        columnLabel: "name",
        columnWidth: 150,
        sortEnabled: true,
      },
      {
        columnName: "Status",
        columnLabel: "status",
        columnWidth: 100,
        sortEnabled: true,
      },
      {
        columnName: "#",
        columnLabel: "action",
        columnWidth: 100,
      },
    ]);
    const handleDelete = async(id) =>{
      Swal.fire({
          text: "Are you sure delete this record?",
          icon: "info",
          buttonsStyling: false,
          confirmButtonText: "Confirm",
          showCancelButton: true,
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-primary",
            cancelButton: "btn fw-semibold btn-light-danger",
          },
        }).then(async (result) => {
           if (result.isConfirmed) {
            var response = await deleteData(id);
            if(response){
              fetchData();
              Swal.fire({
                text: "You have successfully delete record!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "OK",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn fw-semibold btn-light-primary",
                },
              })
            }else{
              Swal.fire({
                text: "Failed delete record!",
                icon: "danger",
                buttonsStyling: false,
                confirmButtonText: "OK",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn fw-semibold btn-light-primary",
                },
              })
            }
          }
        });
    }
    const loading = ref(true);
    const searchQuery = ref(DataTablesService.loadSearchValue());
    const tableData = ref([]);
    const countData = ref<number>(0);
    const params = ref(DataTablesService.loadParamsFromStorage() || { offset: 0, limit: 10, where: {}, order: {}, });
    const reverseColumn = DataTablesService.reverseSort(params.value.order);
    const coloumDefaultLabel = ref();
    const coloumDefaultSort = ref();
    if(reverseColumn != null){
      coloumDefaultLabel.value = reverseColumn[0];
      coloumDefaultSort.value = reverseColumn[1];
    }
    const urlPagination = "/origin-areas/pagination";
    const fetchData = async () => {
      loading.value = true;
      const { data, params: updatedParams } = await DataTablesService.fetchDatax(urlPagination, params.value);
      tableData.value = data.records;
      countData.value = data.totalCount;
      params.value = updatedParams; // Update params in the component
      DataTablesService.saveParamsToStorage(updatedParams,searchQuery.value); 
      loading.value = false;
    };

    const handleSort = async (sLabel) => {
      await DataTablesService.handleSort(sLabel,params.value, fetchData);
    };

    const changeRowsPerPageLimit = async (num) => {
      await DataTablesService.changeRowsPerPageLimit(num, params.value, fetchData);
    };

    const changePage = async (num) => {
      await DataTablesService.changePage(num, params.value, fetchData);
    };

    const filterData = async () => {
      var paramsQuery = {};
      if(searchQuery.value.trim() != ''){
        const searchVal = searchQuery.value.trim();
        const regexPattern = searchVal.replace(/\*\*/g, '.*');
        const regexOptions = { like: regexPattern, options: "i" };
        paramsQuery = {
        or: [
          { code: regexOptions },
          { name: regexOptions },
          { 'country.name': regexOptions },
          ],
        };
      }
      await DataTablesService.filterData(params.value, paramsQuery, fetchData);
    };



    onMounted(() => {
      fetchData();
    });
    

    watch(searchQuery, filterData);
    return {
      coloumDefaultLabel,
      coloumDefaultSort,
      params,
      changePage,
      changeRowsPerPageLimit,
      countData,
      handleDelete,
      getUploadAssetPath,
      loading,
      tableHeader,
      tableData,
      searchQuery,
      handleSort,
    };
  },
});
</script>
