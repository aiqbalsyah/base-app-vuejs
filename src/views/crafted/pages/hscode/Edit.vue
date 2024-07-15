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
            <h3 class="fw-bold m-0">Edit HS Code</h3>
          </div>
          <div class="card-toolbar">
            <router-link
              class="btn btn-sm btn-primary me-2"
              :to="{ name: 'hscodes-list' }"
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
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-2 col-md-2 col-form-label fw-semibold fs-6">
                  <span class="">Description</span>
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-4 col-md-5 fv-row">
                  <Field
                    type="text"
                    name="description"
                    class="form-control form-control-lg"
                    placeholder="Description"
                    aria-readonly="readonly"
                    v-model="record.description"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="description" />
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
                  <span class="">BM%</span>
                </label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-2 col-md-2 fv-row">
                  <Field
                    type="number"
                    name="bm"
                    class="form-control form-control-lg"
                    placeholder="BM"
                    aria-readonly="readonly"
                    v-model="record.bm"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="bm" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Label-->
                <label class="col-lg-1 col-md-1 col-form-label fw-semibold fs-6">
                  <span class="">PPN%</span>
                </label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-2 col-md-2 fv-row">
                  <Field
                    type="number"
                    name="ppn"
                    class="form-control form-control-lg"
                    placeholder="PPN"
                    aria-readonly="readonly"
                    v-model="record.ppn"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="ppn" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Label-->
                <label class="col-lg-1 col-md-1 col-form-label fw-semibold fs-6">
                  <span class="">PPH%</span>
                </label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-2 col-md-2 fv-row">
                  <Field
                    type="number"
                    name="pph"
                    class="form-control form-control-lg"
                    placeholder="pph"
                    aria-readonly="readonly"
                    v-model="record.pph"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="pph" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-6 align-items-center">
                <!--begin::Label-->
                <label class="col-lg-2 col-md-2 col-form-label fw-semibold fs-6">Lartas</label>
                <!--end::Label-->
                <!--begin::Label-->
                <div class="col-lg-1 col-md-1 d-flex align-items-center">
                  <div class="form-check form-check-solid form-switch fv-row">
                    <input
                      class="form-check-input w-45px h-30px"
                      type="checkbox"
                      value="0"
                      name="lartas"
                      :checked="record.lartas"
                      v-model="record.lartas"
                      id="lartas"
                    />
                    
                  </div>
                </div>
                <!--begin::Label-->
                <label class="col-lg-1 col-md-2 col-form-label fw-semibold fs-6">SPI Permit</label>
                <!--end::Label-->
                <!--begin::Label-->
                <div class="col-lg-1 col-md-1 d-flex align-items-center">
                  <div class="form-check form-check-solid form-switch fv-row">
                    <input
                      class="form-check-input w-45px h-30px"
                      type="checkbox"
                      value="0"
                      name="spiPermit"
                      :checked="record.spiPermit"
                      v-model="record.spiPermit"
                      id="spiPermit"
                    />
                    
                  </div>
                </div>
                <!--end::Label-->
                <!--begin::Label-->
                <label class="col-lg-1 col-md-1 col-form-label fw-semibold fs-6">SNI</label>
                <!--end::Label-->
                <!--begin::Label-->
                <div class="col-lg-2 col-md-2 d-flex align-items-center">
                  <div class="form-check form-check-solid form-switch fv-row">
                    <input
                      class="form-check-input w-45px h-30px"
                      type="checkbox"
                      name="sni"
                      value="0"
                      :checked="record.sni"
                      v-model="record.sni"
                      id="sni"
                    />
                    
                  </div>
                </div>
                <!--end::Label-->
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
                <span class="indicator-label"> Save Changes </span>
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
import type { User } from "@/core/model/User";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import router from "@/router";
import * as Yup from "yup";
import { ImageInputComponent } from "@/assets/ts/components/_ImageInputComponent";
import type { IHscode } from "@/core/model/HsCode";

const getData = async (id) => {
  try {
    ApiService.setHeader();
    const response = await ApiService.query(`hscodes/${id}`, {});
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
const postEditHandle = async (id, params) => {
  ApiService.setHeader();
  return ApiService.patch(`hscodes/${id}`, params)
  .then(({ data }) => {
    return { data: data, status: true, message:"success" };
  })
  .catch(({ response }) => {
    return { data: {}, status: false, "message" : response.data.error.message };
  });
};
export default defineComponent({
  name: "hscodes-edit",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButtonEl = ref<HTMLElement | null>(null);
    const route = useRoute(); // Access route to get parameters
    const recordId = route.params.id; // Get 'id' from the route
    const record = ref<IHscode>({} as IHscode);
    const fetchUserData = async () => {
      const data = await getData(recordId);
      record.value = data;
      record.value.status = (data.status === 1) ? true : false;
      record.value.spiPermit = (data.spiPermit === 1) ? true : false;
      record.value.lartas = (data.lartas === 1) ? true : false;
      record.value.sni = (data.sni === 1) ? true : false;
    };
    const validationForm = Yup.object().shape({
      code: Yup.string().required().label("code"),
      name: Yup.string().required().label("name"),
      description: Yup.string().required().label("description"),
    });

    const saveSubmitHandle = async () => {
      if (submitButtonEl.value) {
        // Activate indicator
        submitButtonEl.value.setAttribute("data-kt-indicator", "on");
        submitButtonEl.value.setAttribute("disabled", "disabled");
        const data = {...record.value,
          status: (record.value.status ? 1 : 0),
          spiPermit: (record.value.spiPermit ? 1 : 0),
          lartas: (record.value.lartas ? 1 : 0),
          sni: (record.value.sni ? 1 : 0)
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
            router.push("/hscodes");
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
    });

    return {
      validationForm,
      submitButtonEl,
      saveSubmitHandle,
      dateTolocaleFormat,
      record,
    };
  },
});
</script>