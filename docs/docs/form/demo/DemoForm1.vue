<script setup lang="ts">
import uploadHelper from "docs/docs/upload/uploadHelper";
import * as Yup from "yup";

const form = ref({} as any);
const formRef = ref();

function submit() {
  LewMessage.request({ loadingMessage: "Processing..." }, () => {
    return new Promise<any>((resolve, reject) => {
      formRef.value
        .validate()
        .then((vail: boolean) => {
          if (vail) {
            form.value = formRef.value.getForm();
            resolve({
              content: "Account created successfully!",
              duration: 1000,
              type: "success",
            });
          } else {
            resolve({
              content: "Please complete all required fields",
              duration: 1000,
              type: "warning",
            });
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  });
}

const options = ref([
  {
    label: "Account Type",
    as: "tabs",
    field: "accountType",
    props: {
      itemWidth: "auto",
      width: "100%",
      options: [
        {
          label: "Personal",
          value: "personal",
        },
        {
          label: "Business",
          value: "business",
        },
        {
          label: "Enterprise",
          value: "enterprise",
        },
      ],
    },
  },
  {
    field: "profilePhoto",
    label: "Profile Photo",
    as: "upload",
    rule: Yup.array()
      .of(
        Yup.object({
          status: Yup.string().oneOf(["success"], "Please wait for upload to complete"),
        })
      )
      .max(1, "Maximum 1 photo allowed")
      .required("Profile photo is required"),
    props: {
      uploadHelperId: "uploadHelper",
      multiple: false,
      viewMode: "card",
      limit: 1,
      accept: "image/jpeg,image/png",
      tips: "Upload a clear photo (JPG/PNG, max 2MB)",
    },
  },
  {
    field: "firstName",
    label: "First Name",
    as: "input",
    rule: Yup.string()
      .min(2, "Minimum 2 characters")
      .max(30, "Maximum 30 characters")
      .required("First name is required"),
    props: {
      showCount: true,
      maxLength: 30,
      placeholder: "Enter your first name",
    },
  },
  {
    field: "lastName",
    label: "Last Name",
    as: "input",
    rule: Yup.string()
      .min(2, "Minimum 2 characters")
      .max(30, "Maximum 30 characters")
      .required("Last name is required"),
    props: {
      showCount: true,
      maxLength: 30,
      placeholder: "Enter your last name",
    },
  },
  {
    field: "email",
    label: "Email Address",
    as: "input",
    rule: Yup.string().email("Please enter a valid email").required("Email is required"),
    props: {
      placeholder: "Enter your email address",
      clearable: true,
    },
  },
  {
    field: "phone",
    label: "Phone Number",
    as: "input",
    rule: Yup.string()
      .matches(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number")
      .required("Phone number is required"),
    props: {
      placeholder: "+1 (555) 123-4567",
      clearable: true,
    },
  },
  {
    field: "dateOfBirth",
    label: "Date of Birth",
    as: "date-picker",
    rule: Yup.string().required("Date of birth is required"),
    props: {
      clearable: true,
      placeholder: "Select your date of birth",
    },
  },
  {
    field: "country",
    label: "Country",
    as: "select",
    rule: Yup.string().required("Country is required"),
    props: {
      clearable: true,
      placeholder: "Select your country",
      options: [
        { label: "United States", value: "US" },
        { label: "Canada", value: "CA" },
        { label: "United Kingdom", value: "UK" },
        { label: "Germany", value: "DE" },
        { label: "France", value: "FR" },
        { label: "Japan", value: "JP" },
        { label: "Australia", value: "AU" },
        { label: "China", value: "CN" },
        { label: "India", value: "IN" },
        { label: "Brazil", value: "BR" },
      ],
    },
  },
  {
    field: "city",
    label: "City",
    as: "input",
    rule: Yup.string().required("City is required"),
    props: {
      placeholder: "Enter your city",
      clearable: true,
    },
  },
  {
    field: "zipCode",
    label: "ZIP/Postal Code",
    as: "input",
    rule: Yup.string().required("ZIP/Postal code is required"),
    props: {
      placeholder: "Enter ZIP/postal code",
      clearable: true,
    },
  },
  {
    field: "username",
    label: "Username",
    as: "input",
    rule: Yup.string()
      .min(4, "Minimum 4 characters")
      .max(20, "Maximum 20 characters")
      .matches(/^\w+$/, "Only letters, numbers, and underscores allowed")
      .required("Username is required"),
    props: {
      showCount: true,
      maxLength: 20,
      placeholder: "Choose a unique username",
    },
  },
  {
    field: "password",
    label: "Password",
    as: "input",
    rule: Yup.string().required("Password is required"),
    props: {
      type: "password",
      placeholder: "Create a strong password",
      showCount: true,
      maxLength: 50,
    },
  },
  {
    field: "confirmPassword",
    label: "Confirm Password",
    as: "input",
    rule: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),

    props: {
      type: "password",
      placeholder: "Confirm your password",
    },
  },
  {
    field: "interests",
    label: "Interests & Hobbies",
    as: "select",
    rule: Yup.array()
      .min(1, "Select at least one interest")
      .max(5, "Maximum 5 interests allowed")
      .required("Please select your interests"),
    props: {
      clearable: true,
      multiple: true,
      placeholder: "Select your interests",
      options: [
        { label: "Technology", value: "tech" },
        { label: "Sports", value: "sports" },
        { label: "Music", value: "music" },
        { label: "Travel", value: "travel" },
        { label: "Cooking", value: "cooking" },
        { label: "Reading", value: "reading" },
        { label: "Gaming", value: "gaming" },
        { label: "Photography", value: "photography" },
        { label: "Art", value: "art" },
        { label: "Fitness", value: "fitness" },
      ],
    },
  },
  {
    field: "gender",
    label: "Gender",
    as: "radio-group",
    rule: Yup.string().required("Please select your gender"),
    props: {
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Non-binary", value: "non-binary" },
        { label: "Prefer not to say", value: "prefer-not-to-say" },
      ],
    },
  },
  {
    field: "newsletter",
    label: "Newsletter Subscription",
    as: "checkbox",
    rule: Yup.boolean(),
    props: {
      label: "Subscribe to our newsletter for updates and offers",
    },
  },
  {
    field: "marketing",
    label: "Marketing Communications",
    as: "checkbox",
    rule: Yup.boolean(),
    props: {
      label: "Receive marketing communications from our partners",
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
      text: "Create Account",
      request: submit,
    },
  },
]);

function setForm() {
  // Set form
  formRef.value.setForm({
    accountType: "personal",
  });
}

function resetForm() {
  // Reset form
  formRef.value.setForm({ accountType: "personal" });
}

function change() {
  // Get form
  form.value = formRef.value.getForm();
}

onMounted(() => {
  setForm();
});
</script>

<template>
  <lew-flex x="start" y="start" gap="50px">
    <lew-form
      ref="formRef"
      :form-methods="{
        uploadHelper,
      }"
      class="form-box"
      :options="options"
      width="550px"
      @mounted="setForm"
      @change="change"
    />
    <lew-flex direction="y" x="start">
      <lew-flex x="start">
        <lew-button type="light" round @click="submit"> Submit </lew-button>
        <lew-button type="light" round @click="setForm"> Set Form </lew-button>
        <lew-button type="light" round @click="resetForm"> Reset </lew-button>
      </lew-flex>
      <pre>{{ form }}</pre>
    </lew-flex>
  </lew-flex>
</template>

<style scoped lang="scss">
.form-box {
  width: 450px;
  flex-shrink: 0;
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
