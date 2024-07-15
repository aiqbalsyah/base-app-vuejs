<template>
  <div class="flex-grow-1">
    <div
      class="d-flex justify-content-between align-items-between flex-wrap mb-2"
    >
      <div class="d-flex flex-column">

      </div>
      <div class="d-flex flex-row align-items-center gap-5">
        <div class="d-flex align-items-center">
          <div class="input-group input-group-transparent">
            <span class="input-group-text" id="basic-addon1">
              <KTIcon icon-name="magnifier" icon-class="fs-2" />
            </span>
            <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Search"
              />
        </div>
        </div>
        <div class="d-flex align-items-center">
          <router-link
              class="btn  btn-primary me-3"
              :to="{ name: 'customers-create' }"
            >
              <span>Create New Customer</span>
            </router-link>
        </div>
      </div>
    </div>
    <div
      class="d-flex justify-content-start align-items-start flex-wrap mb-2 gap-10"
    >
      <div v-for="customer in tableData"  class="card customer-card shadow-sm">
        <div class="card-header align-items-center">
          <div class="card-header-icon">
            <div>
              <KTIcon icon-name="folder"  />
            </div>
          </div>
          <div class="card-toolbar">
            <DefaultAction :action-list="[
                { label: 'View', type: 'link', target: { name: 'customers-view', params: { id: customer.id } } },
                { label: 'Edit', type: 'link', target: { name: 'customers-edit', params: { id: customer.id } } },
                { label: 'Delete', type: 'handleFunction', handler: () => handleDelete(customer.id) },
              ]"/>
          </div>
        </div>
        <div class="card-body">
          <h3>{{ customer.name }}</h3>
          <div
            class="d-flex align-items-center fs-8 me-5 mb-2"
          >
            <KTIcon icon-name="book"  icon-class="text-gray-700 fs-5  me-2" />
            <span class="text-gray-700 fw-bold d-block me-1">Purchase Order :</span>
            <span class="text-gray-900 fw-semibold d-block">{{ 0 }}</span>
          </div>
          <div class="divider"></div>
          <div
            class="d-flex align-items-center fs-8 me-5 mb-1"
          >
            <KTIcon icon-name="arrows-circle"  icon-class="text-warning fs-5  me-2" />
            <span class="text-gray-700 fw-bold d-block me-1">On Process :</span>
            <span class="text-gray-900 fw-semibold d-block">{{ 0 }}</span>
          </div>
          <div
            class="d-flex align-items-center fs-8 me-5 mb-2"
          >
            <KTIcon icon-name="check-circle"  icon-class="text-success  fs-5 me-2" />
            <span class="text-gray-700 fw-bold d-block me-1">Success :</span>
            <span class="text-gray-900 fw-semibold d-block">{{ 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
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
import type { ICustomer } from "@/core/model/Customer";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";
import { MenuComponent } from "@/assets/ts/components/MenuComponent";
const deleteData = async (id) => {
  try {
    ApiService.setHeader();
    const response = await ApiService.delete(`customers/${id}`);
    return true;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
};

export default defineComponent({
  name: "customers-list",
  components: {
    Datatable,
    ActiveInactive,
    DefaultAction,
  },
  setup() {
    const tableHeader = ref([
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
    const tableData = ref<ICustomer[]>([]);
    const countData = ref<number>(0);
    const params = ref(DataTablesService.loadParamsFromStorage() || { offset: 0, limit: 10, where: {}, order: {}, });
    const reverseColumn = DataTablesService.reverseSort(params.value.order);
    const coloumDefaultLabel = ref();
    const coloumDefaultSort = ref();
    if(reverseColumn != null){
      coloumDefaultLabel.value = reverseColumn[0];
      coloumDefaultSort.value = reverseColumn[1];
    }
    const urlPagination = "/customers/pagination";
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



    onMounted( async () => {
      await fetchData();
      console.log("WAWKWAW");
      MenuComponent.reinitialization();
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
