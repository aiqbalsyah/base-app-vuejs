<template>
  <div>
      <!--begin::Basic info-->
      <div class="card mb-5 mb-xl-10">
        <!--begin::Card header-->
        <div class="card-header border-0 cursor-pointer">
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">Create User</h3>
          </div>
          <div class="card-toolbar">
            <router-link
              class="btn btn-sm btn-primary me-3"
              :to="{ name: 'users-list' }"
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
                <label class="col-lg-2 col-md-4 col-form-label fw-semibold fs-6"
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
                <label class="col-lg-2 col-md-4 col-form-label fw-semibold fs-6">
                  <span class="required">Role</span>
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-4 col-md-6 fv-row">
                  <Field
                    as="select"
                    name="role"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Role"
                    aria-readonly="readonly"
                    v-model="record.role"
                    
                  >
                    <option value="" disabled>Select a role</option>
                      <option value="super-admin">SUPER ADMIN</option>
                      <option value="ae-indo">AE INDONESIA</option>
                      <option value="ae-china">AE CHINA</option>
                      <option value="ae-china">AE CHINA</option>
                  </Field>

                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="role" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-2 col-md-4 col-form-label fw-semibold fs-6">
                  <span class="required">Display Name</span>
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-4 col-md-6 fv-row">
                  <Field
                    type="text"
                    name="displayName"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Display name"
                    aria-readonly="readonly"
                    v-model="record.displayName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="displayName" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-2 col-md-4 col-form-label fw-semibold fs-6">
                  <span class="required">Email</span>
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-4 col-md-6 fv-row">
                  <Field
                    type="text"
                    name="email"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Email"
                    aria-readonly="readonly"
                    v-model="record.email"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-2 col-md-4 col-form-label fw-semibold fs-6">
                  <span class="required">Password</span>
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-4 col-md-6 fv-row">
                  <Field
                    type="password"
                    name="password"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Password"
                    aria-readonly="readonly"
                    v-model="record.password"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-0">
                <!--begin::Label-->
                <label class="col-lg-2 col-md-4 col-form-label fw-semibold fs-6"
                  >Status</label
                >
                <!--begin::Label-->

                <!--begin::Label-->
                <div class="col-lg-4 col-md-6 d-flex align-items-center">
                  <div class="form-check form-check-solid form-switch fv-row">
                    <input
                      class="form-check-input w-45px h-30px"
                      type="checkbox"
                      value="0"
                      :checked="record.status"
                      v-model="record.status"
                      id="status"
                    />
                    <label class="form-check-label" for="status"></label>
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
import { getAssetPath } from "@/core/helpers/assets";
import ApiService from "@/core/services/ApiService";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { dateTolocaleFormat } from "@/assets/ts/_utils/_TypesHelpers";
import type { User } from "@/core/model/User";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import router from "@/router";
import * as Yup from "yup";
import { ImageInputComponent } from "@/assets/ts/components";


const uploadFile = async (params) => {
  try {
    ApiService.setHeader();
    ApiService.setPostAsFile();
    const response = await ApiService.post(`files/upload`, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
const postHandle = async (dataSave) => {
  ApiService.setHeader();
  return ApiService.post("users", dataSave)
    .then(({ data }) => {
      return { data: data, status: true, message:"success" };
    })
    .catch(({ response }) => {
      return { data: {}, status: false, "message" : response.data.error.message };
    });
};
export default defineComponent({
  name: "users-create",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButtonEl = ref<HTMLElement | null>(null);
    const route = useRoute(); // Access route to get parameters
    const record = ref<User>({} as User);
    const fileSelected = ref([]);
    
    const changeFileHandle = (event) => {
      const file = event.target.files;
      fileSelected.value = file;
    };

    const validationForm = Yup.object().shape({
      displayName: Yup.string().required().label("Display Name"),
      role: Yup.string().required().label("Role"),
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).label("Password"),
    });


    const saveSubmitHandle = async () => {
      if (submitButtonEl.value) {
        // Activate indicator
        submitButtonEl.value.setAttribute("data-kt-indicator", "on");
        submitButtonEl.value.setAttribute("disabled", "disabled");
        // console.log("status : "+ record.value.status)
        if (fileSelected.value.length > 0) {
          const uploadFilePost = await uploadFile(fileSelected.value);
          if (uploadFilePost.files) {
            record.value.imageUrl = uploadFilePost.files[0];
          }
        }
        const postData = await postHandle({...record.value,status: (record.value.status ? 1 : 0)});
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
            router.push("/users");
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

    const removeImage = () => {
      // profileDetails.value.avatar = "/media/avatars/blank.png";
    };

    onMounted(() => {
      ImageInputComponent.bootstrap();
    });

    return {
      validationForm,
      changeFileHandle,
      submitButtonEl,
      removeImage,
      saveSubmitHandle,
      dateTolocaleFormat,
      getAssetPath,
      record,
    };
  },
});
</script>
<style scoped>
  .image-input-placeholder {
    background-image: url('/media/svg/avatars/blank.svg');
  }
</style>