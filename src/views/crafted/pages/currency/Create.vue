<template>
  <div>
      <!--begin::Basic info-->
      <div class="card mb-5 mb-xl-10">
        <!--begin::Card header-->
        <div class="card-header border-0 cursor-pointer">
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">Create Currency</h3>
          </div>
          <div class="card-toolbar">
            <router-link
              class="btn btn-sm btn-primary me-3"
              :to="{ name: 'currencies-list' }"
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
                  <span class="required">Symbol</span>
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-4 col-md-5 fv-row">
                  <Field
                    type="text"
                    name="initial"
                    class="form-control form-control-lg"
                    placeholder="Initial"
                    aria-readonly="readonly"
                    v-model="record.initial"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="initial" />
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
</template>

<script lang="ts">
import ApiService from "@/core/services/ApiService";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { ICurrency } from "@/core/model/Currency";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import router from "@/router";
import * as Yup from "yup";

const postHandle = async (dataSave) => {
  ApiService.setHeader();
  return ApiService.post("currencies", dataSave)
    .then(({ data }) => {
      return { data: data, status: true, message:"success" };
    })
    .catch(({ response }) => {
      return { data: {}, status: false, "message" : response.data.error.message };
    });
};
export default defineComponent({
  name: "currencies-create",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButtonEl = ref<HTMLElement | null>(null);
    const route = useRoute(); // Access route to get parameters
    const record = ref<ICurrency>({} as ICurrency);

    const validationForm = Yup.object().shape({
      code: Yup.string().required().label("code"),
      initial: Yup.string().required().label("initial"),
      name: Yup.string().required().label("name"),
    });


    const saveSubmitHandle = async () => {
      if (submitButtonEl.value) {
        // Activate indicator
        submitButtonEl.value.setAttribute("data-kt-indicator", "on");
        submitButtonEl.value.setAttribute("disabled", "disabled");
        const postData = await postHandle({...record.value,
          status: (record.value.status ? 1 : 0),
          
        });
        submitButtonEl.value?.removeAttribute("data-kt-indicator");
        submitButtonEl.value?.removeAttribute("disabled");
        if (postData.status) {
          Swal.fire({
            text: "You have successfully create a record!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "OK",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-primary",
            },
          }).then(() => {
            // Go to page after successfully login
            router.push("/currencies");
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

    onMounted(() => {
    });

    return {
      validationForm,
      submitButtonEl,
      saveSubmitHandle,
      record,
    };
  },
});
</script>