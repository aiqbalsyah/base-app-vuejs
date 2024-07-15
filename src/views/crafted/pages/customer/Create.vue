<template>
  <div>
    <!--begin::Basic info-->
    <div class="card mb-5 mb-xl-10">
      <!--begin::Card header-->
      <div class="card-header border-0 cursor-pointer">
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bold m-0">Create Customer</h3>
        </div>
        <div class="card-toolbar">
          <router-link class="btn btn-sm btn-primary me-3" :to="{ name: 'customers-list' }">
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
        <VForm id="kt_form_edit_form" class="form" novalidate :validation-schema="validationForm"
          @submit="saveSubmitHandle()">
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
              <div class="col-lg-2 col-md-4 fv-row">
                <Field type="text" name="code" class="form-control form-control-lg" placeholder="Code"
                  aria-readonly="readonly" v-model="record.code" />
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
              <div class="col-lg-5 col-md-10 fv-row  mb-lg-0 mb-md-6">
                <Field type="text" name="name" class="form-control form-control-lg" placeholder="Name"
                  aria-readonly="readonly" v-model="record.name" />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
              <!--begin::Label-->
              <label class="col-lg-1 col-md-2 col-form-label fw-semibold fs-6">
                <span class="required">PIC</span>
              </label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-4 col-md-10 fv-row">
                <Field type="text" name="pic" class="form-control form-control-lg" placeholder="PIC"
                  aria-readonly="readonly" v-model="record.pic" />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="pic" />
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
                <span class="required">Address</span>
              </label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-4 col-md-10 fv-row  mb-lg-0 mb-md-6">
                <Field
                  as="textarea"
                  name="address"
                  class="form-control form-control-lg"
                  placeholder="Address"
                  rows="4"
                  v-model="record.address"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="address" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
              <!--begin::Label-->
              <label class="col-lg-1 col-md-4 col-form-label fw-semibold fs-6"
                  >Image</label
                >
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-4 col-md-6">
                  <!--begin::Image input-->
                  <div class="image-input image-input-empty image-input-placeholder" data-kt-image-input="true"  >
                      <!--begin::Image preview wrapper-->
                      <div class="image-input-wrapper w-125px h-125px"></div>
                      <!--end::Image preview wrapper-->

                      <!--begin::Edit button-->
                      <label class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="change"
                      data-bs-toggle="tooltip"
                      data-bs-dismiss="click"
                      title="Change avatar">
                          <i class="ki-duotone ki-pencil fs-6"><span class="path1"></span><span class="path2"></span></i>

                          <!--begin::Inputs-->
                          <Field
                            type="file"
                            @change="changeFileHandle"
                            accept="image/png, image/jpg, image/jpeg, image/webp"
                            name="image"
                            placeholder="Image"
                            aria-readonly="readonly"
                          />
                          <input type="hidden" name="avatar_remove" />
                          <!--end::Inputs-->
                      </label>
                      <!--end::Edit button-->

                      <!--begin::Cancel button-->
                      <span class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="cancel"
                      data-bs-toggle="tooltip"
                      data-bs-dismiss="click"
                      title="Cancel avatar">
                          <i class="ki-outline ki-cross fs-3"></i>
                      </span>
                      <!--end::Cancel button-->

                      <!--begin::Remove button-->
                      <span class="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="remove"
                      data-bs-toggle="tooltip"
                      data-bs-dismiss="click"
                      title="Remove avatar">
                          <i class="ki-outline ki-cross fs-3"></i>
                      </span>
                      <!--end::Remove button-->
                  </div>
                  <!--end::Image input-->
                  <!--begin::Hint-->
                  <div class="form-text">
                    Allowed file types: png, jpg, jpeg.
                  </div>
                  <!--end::Hint-->
                </div>
                <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-2 col-md-2 col-form-label fw-semibold fs-6">
                <span class="required">Phone Number</span>
              </label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-4 col-md-10 fv-row  mb-lg-0 mb-md-6">
                <Field type="text" name="phoneNumber" class="form-control form-control-lg" placeholder="Phone Number"
                    aria-readonly="readonly" v-model="record.phoneNumber" />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="address" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
              <!--begin::Label-->
              <label class="col-lg-1 col-md-2 col-form-label fw-semibold fs-6">
                <span>Email</span>
              </label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-4 col-md-10 fv-row">
                <Field type="text" name="email" class="form-control form-control-lg" placeholder="Email"
                  aria-readonly="readonly" v-model="record.email" />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="email" />
                  </div>
                </div>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-2 col-md-2 col-form-label fw-semibold fs-6">
                  <span>TAX ID</span>
                </label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-4 col-md-10 fv-row">
                  <Field type="text" name="taxNumber" class="form-control form-control-lg" placeholder="Tax Number"
                    aria-readonly="readonly" v-model="record.taxNumber" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="taxNumber" />
                    </div>
                  </div>
                </div>
            </div>
            <!--begin::Input group-->
            <div class="row mb-0">
              <!--begin::Label-->
              <label class="col-lg-2 col-md-2 col-form-label fw-semibold fs-6">Status</label>
              <!--begin::Label-->
              <!--begin::Label-->
              <div class="col-lg-4 col-md-5 d-flex align-items-center">
                <div class="form-check form-check-solid form-switch fv-row">
                  <input class="form-check-input w-45px h-30px" type="checkbox" value="0" :checked="record.status"
                    v-model="record.status" id="status" />
                </div>
              </div>
              <!--begin::Label-->
            </div>
            <!--end::Input group-->
          </div>
          <!--end::Card body-->
          <!--begin::Actions-->
          <div class="card-footer d-flex justify-content-end py-6 px-9">
            <button type="submit" id="kt_form_edit_submit" ref="submitButtonEl" class="btn btn-primary">
              <span class="indicator-label"> Save</span>
              <span class="indicator-progress">
                Please wait...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import router from "@/router";
import * as Yup from "yup";
import type { ICustomer } from "@/core/model/Customer";
import { ImageInputComponent } from "@/assets/ts/components/_ImageInputComponent";
import HelperService from "@/core/services/HelperService";

const postHandle = async (dataSave) => {
  ApiService.setHeader();
  return ApiService.post("customers", dataSave)
    .then(({ data }) => {
      return { data: data, status: true, message: "success" };
    })
    .catch(({ response }) => {
      return { data: {}, status: false, "message": response.data.error.message };
    });
};

export default defineComponent({
  name: "customers-create",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButtonEl = ref<HTMLElement | null>(null);
    const record = ref<ICustomer>({} as ICustomer);
    const fileSelected = ref([]);
    
    const changeFileHandle = (event) => {
      const file = event.target.files;
      fileSelected.value = file;
    };
    const validationForm = Yup.object().shape({
      code: Yup.string().required().label("code"),
      name: Yup.string().required().label("name"),
      pic: Yup.string().required().label("pic"),
      address: Yup.string().required().label("address"),
    });

    const saveSubmitHandle = async () => {
      if (submitButtonEl.value) {
        // Activate indicator
        submitButtonEl.value.setAttribute("data-kt-indicator", "on");
        submitButtonEl.value.setAttribute("disabled", "disabled");
        if (fileSelected.value.length > 0) {
          const uploadFilePost = await HelperService.uploadFile(fileSelected.value);
          if (uploadFilePost.files) {
            record.value.imageUrl = uploadFilePost.files[0];
          }
        }
        const postData = await postHandle({
          ...record.value,
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
            router.push("/customers");
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
              title: "fw-semibold text-danger fs-3",
            },
          });
        }
      }
    };

    onMounted(async () => {
      ImageInputComponent.bootstrap();
      });
      setTimeout(() => {
          document.querySelectorAll('input').forEach(input => {
          input.setAttribute('autocomplete', 'off');
          input.setAttribute('autocorrect', 'off');
          input.setAttribute('autocapitalize', 'off');
          input.setAttribute('spellcheck', 'false');
        });
      }, 1000);

    return {
      validationForm,
      submitButtonEl,
      saveSubmitHandle,
      record,
      changeFileHandle,
    };
  },
});
</script>

<style scoped>
  .image-input-placeholder {
    background-image: url('/media/svg/avatars/blank.svg');
  }
</style>