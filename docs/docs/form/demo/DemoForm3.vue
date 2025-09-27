<script setup lang="ts">
import * as Yup from "yup";

const form = ref({} as any);
const formRef = ref();

function submit() {
  formRef.value.validate().then((res: any) => {
    console.log(res);
    LewMessage.success("Form submitted successfully!");
  });
}

onMounted(() => {
  // Set form
  formRef.value.setForm({});
});

const options = ref([
  {
    field: "username",
    label: "Username",
    as: "input",
    rule: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(20, "Maximum 20 characters")
      .required("Username is required"),
    props: {
      clearable: true,
      placeholder: "Enter username",
    },
  },
  {
    field: "password",
    label: "Password",
    as: "input",
    rule: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    props: {
      type: "password",
      placeholder: "Enter password",
    },
  },
  {
    field: "confirmPassword",
    label: "Confirm",
    as: "input",
    rule: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    props: {
      type: "password",
      placeholder: "Confirm password",
    },
  },
  {
    field: "email",
    label: "Email",
    as: "input",
    rule: Yup.string().email("Please enter a valid email").required("Email is required"),
    props: {
      clearable: true,
      placeholder: "Enter email address",
    },
  },
  {
    field: "phone",
    label: "Phone",
    as: "input",
    rule: Yup.string()
      .matches(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number")
      .required("Phone number is required"),
    props: {
      clearable: true,
      placeholder: "+1 (555) 123-4567",
    },
  },
  {
    field: "role",
    label: "Role",
    as: "select",
    rule: Yup.string().required("Please select a role"),
    props: {
      clearable: true,
      placeholder: "Select user role",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Moderator", value: "moderator" },
        { label: "Guest", value: "guest" },
      ],
    },
  },
  {
    field: "status",
    label: "Status",
    as: "radio-group",
    rule: Yup.string().required("Please select account status"),
    props: {
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Suspended", value: "suspended" },
      ],
    },
  },
  {
    field: "permissions",
    label: "Permissions",
    as: "select",
    rule: Yup.array()
      .min(1, "Select at least one permission")
      .required("Please select permissions"),
    props: {
      clearable: true,
      multiple: true,
      placeholder: "Select permissions",
      options: [
        { label: "Read", value: "read" },
        { label: "Write", value: "write" },
        { label: "Delete", value: "delete" },
        { label: "Admin", value: "admin" },
        { label: "User Management", value: "user_management" },
      ],
    },
  },
  {
    field: "notifications",
    label: "Notifications",
    as: "checkbox-group",
    rule: Yup.array()
      .min(1, "Select at least one notification")
      .required("Please select notifications"),
    props: {
      options: [
        { label: "Email", value: "email" },
        { label: "SMS", value: "sms" },
        { label: "Push", value: "push" },
        { label: "In-app", value: "in_app" },
      ],
    },
  },
  {
    field: "terms",
    label: "",
    as: "checkbox",
    rule: Yup.boolean()
      .oneOf([true], "You must agree to the terms")
      .required("You must agree to the terms"),
    props: {
      label: "I agree to the Terms of Service and Privacy Policy",
    },
  },
  {
    as: "button",
    props: {
      text: "Create User",
      request: submit,
    },
  },
]);
</script>

<template>
  <lew-flex width="500px" x="start" y="start" gap="50px">
    <lew-form
      ref="formRef"
      class="form-box"
      :options="options"
      @change="
        (e: any) => {
          form = e
        }
      "
    />
    <pre>{{ form }}</pre>
  </lew-flex>
</template>

<style scoped lang="scss">
.form-box {
  width: 450px;
}

pre {
  width: 350px;
  background-color: var(--lew-bgcolor-2);
  padding: 30px;
  flex-shrink: 0;
}

@media (max-width: 767px) {
  .form-box {
    width: 100%;
  }
}
</style>
