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
    field: "title",
    label: "Title",
    as: "input",
    rule: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(100, "Maximum 100 characters")
      .required("Title is required"),
    props: {
      clearable: true,
      placeholder: "Enter title",
    },
  },
  {
    field: "description",
    label: "Description",
    as: "textarea",
    rule: Yup.string()
      .min(10, "Minimum 10 characters")
      .max(500, "Maximum 500 characters")
      .required("Description is required"),
    props: {
      clearable: true,
      placeholder: "Enter description",
      rows: 4,
    },
  },
  {
    field: "priority",
    label: "Priority",
    as: "radio-group",
    rule: Yup.string().required("Please select priority"),
    props: {
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
      ],
    },
  },
  {
    field: "tags",
    label: "Tags",
    as: "select",
    rule: Yup.array().min(1, "Select at least one tag").required("Please select tags"),
    props: {
      clearable: true,
      multiple: true,
      placeholder: "Select tags",
      options: [
        { label: "Important", value: "important" },
        { label: "Urgent", value: "urgent" },
        { label: "Review", value: "review" },
        { label: "Follow-up", value: "follow-up" },
        { label: "Completed", value: "completed" },
      ],
    },
  },
  {
    field: "dueDate",
    label: "Due Date",
    as: "date-picker",
    rule: Yup.string().required("Due date is required"),
    props: {
      clearable: true,
      placeholder: "Select due date",
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
        { label: "In-app", value: "in-app" },
      ],
    },
  },
  {
    as: "button",
    props: {
      text: "Submit",
      request: submit,
    },
  },
]);
</script>

<template>
  <lew-flex width="500px" x="start" y="start" gap="50px">
    <lew-form
      ref="formRef"
      direction="y"
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
  width: 400px;
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
