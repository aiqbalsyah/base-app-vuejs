<template>
  <div>
    <!-- If club data is null, display a loading message or spinner -->
    <div v-if="record.id === undefined">
      <p>Loading data details...</p>
      <!-- Optionally, add a loading spinner -->
      <div class="spinner"></div>
    </div>

    <!--begin::FORM-->
    <div v-else class="">
      <!--begin::Basic info-->
      <div class="card mb-5 mb-xl-10">
        <!--begin::Card header-->
        <div class="card-header border-0 cursor-pointer">
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">Edit Origin Area</h3>
          </div>
          <div class="card-toolbar">
            <router-link
              class="btn btn-sm btn-primary me-3"
              :to="{ name: 'origin-areas-list' }"
            >
              <KTIcon icon-name="left" icon-class="fs-2" />
              <span>Back</span>
            </router-link>
          </div>
          <!--end::Card title-->
        </div>
        <!--begin::Card header-->

        <!--begin::Content-->
        <div id="kt_form_edit" class="collapse show">
          <!--begin::Form-->
          <VForm
            id="kt_form_edit_form"
            class="form"
            novalidate
            :validation-schema="validationForm"
            @submit="saveSubmitHandle()"
          >
            <!--begin::Card body-->
            <div class="card-body border-top p-9">
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-2 col-md-2 col-form-label fw-semibold fs-6">
                  <span class="required">Country</span>
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-4 col-md-5 fv-row">
                  <Multiselect
                    v-bind="options"
                    v-model="options.value"
                    class="form-control form-control-lg"
                    placeholder="Country"
                    name="country"
                    aria-readonly="readonly"
                    @select="handleOnSelectCountry"
                    @deselect="handleDeselectCountry"
                  />
                  <Field
                    type="hidden"
                    name="country_id"
                    class="form-control form-control-lg"
                    placeholder="country_id"
                    aria-readonly="readonly"
                    v-model="options.value"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="country_id" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-2 col-md-2 col-form-label fw-semibold fs-6">
                  <span class="required">Code</span>
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-4 col-md-5 fv-row">
                  <Field
                    type="text"
                    name="code"
                    class="form-control form-control-lg"
                    placeholder="Code"
                    aria-readonly="readonly"
                    v-model="record.code"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="code" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-2 col-md-2 col-form-label fw-semibold fs-6">
                  <span class="required">Name</span>
                </label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-4 col-md-5 fv-row">
                  <Field
                    type="text"
                    name="name"
                    class="form-control form-control-lg"
                    placeholder="Name"
                    aria-readonly="readonly"
                    v-model="record.name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="name" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-0">
                <!--begin::Label-->
                <label class="col-lg-2 col-md-2 col-form-label fw-semibold fs-6"
                  >Status</label
                >
                <!--begin::Label-->
                <!--begin::Label-->
                <div class="col-lg-4 col-md-5 d-flex align-items-center">
                  <div class="form-check form-check-solid form-switch fv-row">
                    <input
                      class="form-check-input w-45px h-30px"
                      type="checkbox"
                      value="0"
                      :checked="record.status"
                      v-model="record.status"
                      id="status"
                    />
                    
                  </div>
                </div>
                <!--begin::Label-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Card body-->
            <!--begin::Actions-->
            <div class="card-footer d-flex justify-content-end py-6 px-9">
              <button
                type="submit"
                id="kt_form_edit_submit"
                ref="submitButtonEl"
                class="btn btn-primary"
              >
                <span class="indicator-label"> Save</span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
            </div>
            <!--end::Actions-->
          </VForm>
          <!--end::Form-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Basic info-->
    </div>
  </div>
</template>

<script lang="ts">
import ApiService from "@/core/services/ApiService";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { dateTolocaleFormat } from "@/assets/ts/_utils/_TypesHelpers";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import router from "@/router";
import * as Yup from "yup";
import type { IOriginArea } from "@/core/model/OriginArea";
import Multiselect from "@vueform/multiselect";

const getData = async (id) => {
  try {
    ApiService.setHeader();
    const response = await ApiService.query(`origin-areas/${id}`, {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
const postEditHandle = async (id, params) => {
  ApiService.setHeader();
  return ApiService.patch(`origin-areas/${id}`, params)
  .then(({ data }) => {
    return { data: data, status: true, message:"success" };
  })
  .catch(({ response }) => {
    return { data: {}, status: false, "message" : response.data.error.message };
  });
};
const getCountries = async () => {
  try {
    ApiService.setHeader();
    const response = await ApiService.query(`countries`, {
        params: {
          filter : {
            "fields": {
              "name": true,
              "code": true,
              "id": true,
            },
            where : {
              status : 1,
            }
          }
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export default defineComponent({
  name: "origin-areas-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
    Multiselect
  },
  setup() {
    const submitButtonEl = ref<HTMLElement | null>(null);
    const route = useRoute(); // Access route to get parameters
    const recordId = route.params.id; // Get 'id' from the route
    const record = ref<IOriginArea>({} as IOriginArea);
    const fetchUserData = async () => {
      const data = await getData(recordId);
      record.value = data;
      record.value.status = (data.status === 1) ? true : false;
      options.value.value = data.country.id;
    };
    const validationForm = Yup.object().shape({
      code: Yup.string().required().label("code"),
      country_id: Yup.string().required("Please select country").label("country_id"),
      name: Yup.string().required().label("name"),
    });

    const options = ref({
        value: null,
        options: [],
        searchable: true,
        trackBy:"name",
        label: "name",
        valueProp: "id",
    });

    const handleOnSelectCountry = (_,option :object) => {
      record.value.country = option;
    }

    const handleDeselectCountry =  () => {
      record.value.country = null;
    }

    const saveSubmitHandle = async () => {
      if (submitButtonEl.value) {
        // Activate indicator
        submitButtonEl.value.setAttribute("data-kt-indicator", "on");
        submitButtonEl.value.setAttribute("disabled", "disabled");
        const data = {...record.value,
          status: (record.value.status ? 1 : 0),
        };
        const postData = await postEditHandle(recordId, data);
        submitButtonEl.value?.removeAttribute("data-kt-indicator");
        submitButtonEl.value?.removeAttribute("disabled");
        if (postData.status) {
          Swal.fire({
            text: "You have successfully edit record!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "OK",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-primary",
            },
          }).then(() => {
            router.push("/origin-areas");
          });
        } else {
          Swal.fire({
            title: "Something not right",
            text: postData.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-danger",
              title:"fw-semibold text-danger fs-3",
            },
          });
        }
      }
    };

    onMounted( async () => {
      await fetchUserData(); 
      await getCountries().then((data) => {
        options.value.options = data;
      });
    });

    return {
      validationForm,
      submitButtonEl,
      saveSubmitHandle,
      dateTolocaleFormat,
      record,
      options,
      handleOnSelectCountry,
      handleDeselectCountry
    };
  },
});
</script>